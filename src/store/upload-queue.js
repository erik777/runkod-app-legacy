import to from 'await-to-js';

import md5 from 'blueimp-md5';

import {userSession, getUsername} from '../blockstack-config';

import {File} from '../model';

import {USER_LOGOUT} from './user';

import {
  CONFLICT_FLAG_NONE,
  CONFLICT_FLAG_YES,
  CONFLICT_FLAG_NO,
  CONFLICT_FLAG_NO_ALL
} from '../constants';


// Helper to switch conflict flag on FILE_OK, FILE_ERROR, FILE_SKIP
const switchCF = (state) => {
  return [CONFLICT_FLAG_YES, CONFLICT_FLAG_NO].includes(state.conflictFlag) ? CONFLICT_FLAG_NONE : state.conflictFlag;
};


const initialState = {
  files: [],
  completed: [],
  failed: [],
  skipped: [],
  log: [],
  current: '',
  conflict: false,
  conflictFlag: CONFLICT_FLAG_NONE,
  show: false
};

/* Action types */
export const SET = '@upload-queue/SET';
export const FINISH = '@upload-queue/FINISH';
export const FILE_START = '@upload-queue/FILE_START';
export const FILE_OK = '@upload-queue/FILE_OK';
export const FILE_ERROR = '@upload-queue/FILE_ERROR';
export const FILE_SKIP = '@upload-queue/FILE_SKIP';
export const FILE_CONFLICT = '@upload-queue/FILE_CONFLICT';
export const CONFLICT_FLAG_SET = '@upload-queue/CONFLICT_FLAG_SET';
export const RESET = '@upload-queue/RESET';


/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET: {
      const {files} = action.payload;
      return Object.assign({}, state, {files, show: true});
    }
    case FILE_START: {
      const {path} = action.payload;
      return Object.assign({}, state, {current: path});
    }
    case FILE_OK: {
      const [file, ...files] = state.files;
      const completed = [...state.completed, file];
      const path = `${file.path}${file.name}`;
      const log = [...state.log, {type: 'success', msg: `${path} uploaded`}];
      return Object.assign({}, state, {files, completed, current: '', conflictFlag: switchCF(state), log});
    }
    case FILE_ERROR: {
      const [file, ...files] = state.files;
      const failed = [...state.failed, file];
      const path = `${file.path}${file.name}`;
      const log = [...state.log, {type: 'error', msg: `${path} could not uploaded`}];
      return Object.assign({}, state, {files, failed, current: '', conflictFlag: switchCF(state), log});
    }
    case FILE_SKIP: {
      const [file, ...files] = state.files;
      const skipped = [...state.skipped, file];
      const path = `${file.path}${file.name}`;
      const log = [...state.log, {type: 'info', msg: `${path} skipped`}];
      return Object.assign({}, state, {files, skipped, current: '', conflictFlag: switchCF(state), log});
    }
    case FILE_CONFLICT: {
      return Object.assign({}, state, {conflict: true});
    }
    case CONFLICT_FLAG_SET: {
      const {flag} = action.payload;
      return Object.assign({}, state, {conflict: false, current: '', conflictFlag: flag});
    }
    case RESET:
      return initialState;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}


/* Actions */
export const setUploadQueue = (files) => (dispatch) => {
  dispatch(setAct(files));
};

export const startUploadQueue = () => async (dispatch, getState) => {

  while (true) {

    const {uploadQueue: queue} = getState();
    const {files} = queue;

    if (files.length === 0) {
      dispatch(finishAct());
      break;
    }

    const {path, project} = getState();
    const {conflictFlag} = queue;

    const [file,] = files;

    const parent = `${path}${file.path}`;
    const fullPath = `${parent}${file.name}`;

    dispatch(fileStartAct(fullPath));

    const fileS = file.name.split('.');
    const fileExt = fileS.length > 1 ? `.${fileS[fileS.length - 1]}`.toLowerCase() : '';
    const gaiaFileName = md5(`${project._id}-${Date.now()}`) + fileExt;

    // Check if file exists
    const [err1, fileRecs] = await to(File.fetchOwnList({
      project: project._id,
      tag: project.tag,
      fullPath,
      deleted: false,
      sort: '-createdAt'
    }));

    if (err1) {
      dispatch(fileErrorAct());
      continue;
    }

    // Stop loop if conflicted
    if (fileRecs.length > 0) {
      if (conflictFlag === CONFLICT_FLAG_NONE) {
        dispatch(fileConflictAct());
        break;
      }

      if ([CONFLICT_FLAG_NO, CONFLICT_FLAG_NO_ALL].includes(conflictFlag)) {
        dispatch(fileSkipAct());
        continue;
      }
    }

    // Upload file to gaia
    const [err2, address] = await to(userSession.putFile(gaiaFileName, file.buffer, {
      encrypt: false,
      contentType: file.type
    }));

    if (err2) {
      dispatch(fileErrorAct());
      continue;
    }

    if (fileRecs.length > 0) {
      // Handle rewrite

      const fileRec = fileRecs[0];
      const {name: oldName} = fileRec.attrs;

      // Update record
      fileRec.update({name: gaiaFileName, address});

      const [err1,] = await to(fileRec.save());
      if (err1) {
        dispatch(fileErrorAct());
        continue;
      }

      // Delete old file on gaia. No need to handle error.
      await to(userSession.putFile(oldName, new ArrayBuffer(1), {
        encrypt: false,
        contentType: file.type
      }));

      dispatch(fileOkAct());
      continue;
    }

    // Create file record
    const props = {
      project: project._id,
      username: getUsername(),
      tag: project.tag,
      parent,
      fullPath,
      name: gaiaFileName,
      label: file.name,
      address,
      size: file.size,
      type: file.type,
      deleted: false
    };
    const f = new File(props);

    const [err3,] = await to(f.save());
    if (err3) {
      dispatch(fileErrorAct());
      continue;
    }

    dispatch(fileOkAct());
  }
};

export const resetUploadQueue = () => (dispatch) => {
  dispatch(resetQueueAct());
};

export const setUploadQueueConflictFlag = (flag) => (dispatch) => {
  dispatch(conflictFlagAct(flag));
};


/* Action creators */

export const setAct = (files) => ({
  type: SET,
  payload: {
    files
  }
});


export const finishAct = () => ({
  type: FINISH
});

export const fileStartAct = (path) => ({
  type: FILE_START,
  payload: {
    path
  }
});

export const fileOkAct = () => ({
  type: FILE_OK
});

export const fileErrorAct = () => ({
  type: FILE_ERROR
});


export const fileSkipAct = () => ({
  type: FILE_SKIP
});

export const fileConflictAct = () => ({
  type: FILE_CONFLICT
});

export const conflictFlagAct = (flag) => ({
  type: CONFLICT_FLAG_SET,
  payload: {
    flag
  }
});

export const resetQueueAct = () => ({
  type: RESET
});
