import to from 'await-to-js';

import md5 from 'blueimp-md5';

import {userSession} from '../blockstack-config';

import {File} from '../model';

import {USER_LOGOUT} from './user';


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


const CONFLICT_FLAG_NONE = 0;
const CONFLICT_FLAG_YES = 2;
const CONFLICT_FLAG_YES_ALL = 3;
const CONFLICT_FLAG_NO = 4;
const CONFLICT_FLAG_NO_ALL = 5;

const initialState = {
  files: [],
  completed: [],
  failed: [],
  skipped: [],
  conflict: false,
  conflictFlag: CONFLICT_FLAG_NONE
};

/* Action types */

export const SET = '@queue/SET';
export const FINISHED = '@queue/FINISHED';
export const FILE_OK = '@queue/FILE_OK';
export const FILE_ERROR = '@queue/FILE_ERROR';
export const FILE_SKIPPED = '@queue/FILE_SKIPPED';
export const FILE_CONFLICTED = '@queue/FILE_CONFLICTED';
export const RESET = '@queue/RESET';


/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case SET: {
      const {files} = action.payload;
      return Object.assign({}, state, {files});
    }
    case FILE_OK: {
      const [first, ...files] = state.files;
      const completed = [...state.completed, first];
      const conflictFlag = [CONFLICT_FLAG_YES, CONFLICT_FLAG_NO].includes(state.conflictFlag) ? CONFLICT_FLAG_NONE : state.conflictFlag;
      return Object.assign({}, state, {files, completed, conflictFlag});
    }
    case FILE_ERROR: {
      const [first, ...files] = state.files;
      const failed = [...state.failed, first];
      const conflictFlag = [CONFLICT_FLAG_YES, CONFLICT_FLAG_NO].includes(state.conflictFlag) ? CONFLICT_FLAG_NONE : state.conflictFlag;
      return Object.assign({}, state, {files, failed, conflictFlag});
    }
    case FILE_SKIPPED: {
      const [first, ...files] = state.files;
      const skipped = [...state.skipped, first];
      const conflictFlag = [CONFLICT_FLAG_YES, CONFLICT_FLAG_NO].includes(state.conflictFlag) ? CONFLICT_FLAG_NONE : state.conflictFlag;
      return Object.assign({}, state, {files, skipped, conflictFlag});
    }
    case FILE_CONFLICTED: {
      return Object.assign({}, state, {conflict: true});
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
export const setQueue = (files) => (dispatch) => {
  dispatch(setQueueAct(files));
};

export const startQueue = () => async (dispatch, getState) => {

  while (true) {

    const {queue} = getState();
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

    const fileS = file.name.split('.');
    const fileExt = fileS.length > 1 ? `.${fileS[fileS.length - 1]}`.toLowerCase() : '';
    const gaiaFileName = md5(`${project._id}-${project.bucket}-${file.name}`) + fileExt;

    // Check if file exists
    const [err1, rFiles] = await to(getFileRecordsByFilters({project: project._id, bucket: project.bucket, fullPath}));

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
      // File overwritten. No need to create record.
      dispatch(fileOkAct());
      continue;
    }

    // Create file record
    const props = {
      project: project._id,
      bucket: project.bucket,
      parent,
      fullPath,
      name: file.name,
      address,
      size: file.size,
      type: file.type
    };

    const [err3,] = await to(createFileRecord(props));
    if (err3) {
      dispatch(fileErrorAct());
      continue;
    }

    dispatch(fileOkAct());
  }
};

/* Action creators */

export const setQueueAct = (files) => ({
  type: SET,
  payload: {
    files
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
  type: FILE_CONFLICTED
});

export const finishedAct = () => ({
  type: FINISHED
});