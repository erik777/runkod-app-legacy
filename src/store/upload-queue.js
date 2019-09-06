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

// Blockstack functions

const putFile = (name, type, buffer) => userSession.putFile(name, buffer, {
  encrypt: false,
  contentType: type
});

const getFileRecordsByFilters = (filter) => File.fetchOwnList(filter);

const createFileRecord = (props) => {
  const f = new File(props);
  return f.save();
};

// Helper to switch conflict flag on FILE_OK, FILE_ERROR, FILE_SKIPPED
const switchCF = (state) => {
  return [CONFLICT_FLAG_YES, CONFLICT_FLAG_NO].includes(state.conflictFlag) ? CONFLICT_FLAG_NONE : state.conflictFlag;
};


const initialState = {
  files: [],
  completed: [],
  failed: [],
  skipped: [],
  current: null,
  conflict: false,
  conflictFlag: CONFLICT_FLAG_NONE,
  started: false
};

/* Action types */

export const SET = '@upload-queue/SET';
export const FINISHED = '@upload-queue/FINISHED';
export const FILE_STARTED = '@upload-queue/FILE_STARTED';
export const FILE_OK = '@upload-queue/FILE_OK';
export const FILE_ERROR = '@upload-queue/FILE_ERROR';
export const FILE_SKIPPED = '@upload-queue/FILE_SKIPPED';
export const FILE_CONFLICTED = '@upload-queue/FILE_CONFLICTED';
export const CONFLICT_FLAG_SET = '@upload-queue/CONFLICT_FLAG_SET';
export const RESET = '@upload-queue/RESET';


/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case SET: {
      const {files} = action.payload;
      return Object.assign({}, state, {files, started: true});
    }
    case FILE_STARTED: {
      const {path} = action.payload;
      return Object.assign({}, state, {current: path});
    }
    case FILE_OK: {
      const [first, ...files] = state.files;
      const completed = [...state.completed, first];
      return Object.assign({}, state, {files, completed, current: null, conflictFlag: switchCF(state)});
    }
    case FILE_ERROR: {
      const [first, ...files] = state.files;
      const failed = [...state.failed, first];
      return Object.assign({}, state, {files, failed, current: null, conflictFlag: switchCF(state)});
    }
    case FILE_SKIPPED: {
      const [first, ...files] = state.files;
      const skipped = [...state.skipped, first];
      return Object.assign({}, state, {files, skipped, current: null, conflictFlag: switchCF(state)});
    }
    case FILE_CONFLICTED: {
      return Object.assign({}, state, {conflict: true});
    }
    case CONFLICT_FLAG_SET: {
      const {flag} = action.payload;
      return Object.assign({}, state, {conflict: false, current: null, conflictFlag: flag});
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
  dispatch(setQueueAct(files));
};

export const startUploadQueue = () => async (dispatch, getState) => {

  while (true) {

    const {uploadQueue: queue} = getState();
    const {files} = queue;

    if (files.length === 0) {
      dispatch(finishedAct());
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
    const [err1, rFiles] = await to(getFileRecordsByFilters({project: project._id, tag: project.tag, fullPath, deleted: false}));

    if (err1) {
      dispatch(fileErrorAct());
      continue;
    }

    // Stop loop if conflicted
    if (rFiles.length > 0) {
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
    const [err2, address] = await to(putFile(gaiaFileName, file.type, file.buffer));

    if (err2) {
      dispatch(fileErrorAct());
      continue;
    }

    if (rFiles.length > 0) {
      // File overwritten on gaia. No need to create record.
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

    const [err3,] = await to(createFileRecord(props));
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

export const setQueueAct = (files) => ({
  type: SET,
  payload: {
    files
  }
});

export const conflictFlagAct = (flag) => ({
  type: CONFLICT_FLAG_SET,
  payload: {
    flag
  }
});

export const fileStartAct = (path) => ({
  type: FILE_STARTED,
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

export const fileConflictAct = () => ({
  type: FILE_CONFLICTED
});

export const fileSkipAct = () => ({
  type: FILE_SKIPPED
});

export const finishedAct = () => ({
  type: FINISHED
});

export const resetQueueAct = () => ({
  type: RESET
});
