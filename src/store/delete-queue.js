import {File} from '../model';

import to from 'await-to-js';

import {USER_LOGOUT} from './user';

import {userSession} from '../blockstack-config';

import arrayChunk from '../utils/array-chunk';

import {FILE_CONCURRENCY} from '../constants';

const initialState = {
  pending: [],
  completed: [],
  failed: [],
  log: [],
  show: false,
  inProgress: false
};

/* Action types */
export const SET = '@delete-queue/SET';
export const START = '@delete-queue/START';
export const FINISH = '@delete-queue/FINISHED';
export const OK = '@delete-queue/OK';
export const ERROR = '@delete-queue/ERROR';
export const RESET = '@delete-queue/RESET';


/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET: {
      const {files} = action.payload;
      return Object.assign({}, state, {pending: files, show: true});
    }
    case START: {
      const log = [...state.log, {type: 'info', msg: `Deleting...`}];
      return Object.assign({}, state, {inProgress: true, log});
    }
    case FINISH: {
      let msg = `${state.completed.length} file(s) deleted 🆗`;

      if (state.failed.length > 0) {
        msg = `${state.completed.length} file(s) deleted, ${state.failed.length} file(s) failed  👀`;
      }

      const log = [...state.log, {type: 'info', msg}];
      return Object.assign({}, state, {inProgress: false, log});
    }
    case OK: {
      const {file} = action.payload;
      const pending = state.pending.filter(x => x._id !== file._id);

      const completed = [...state.completed, file];
      const path = `${file.parent}${file.label}`;
      const log = [...state.log, {type: 'success', msg: `${path} deleted`}];
      return Object.assign({}, state, {pending, completed, log});
    }
    case ERROR: {
      const {file} = action.payload;
      const pending = state.pending.filter(x => x._id !== file._id);

      const failed = [...state.failed, file];
      const path = `${file.parent}${file.label}`;
      const log = [...state.log, {type: 'error', msg: `${path} could not delete`}];
      return Object.assign({}, state, {pending, failed, log});
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
export const setDeleteQueue = (files) => (dispatch) => {
  dispatch(setAct(files));
};

export const processDeleteQueue = () => async (dispatch, getState) => {
  dispatch(startAct());

  const {project} = getState();

  const deleteFile = async (file) => {
    const [err1, fileRecs] = await to(File.fetchOwnList({project: project._id, name: file.name}));

    if (err1) {
      dispatch(errorAct(file));
      throw new Error('Error while fetching file record');
    }

    if (fileRecs.length === 0) {
      dispatch(errorAct(file));
      throw new Error('File not found');
    }

    const fileRec = fileRecs[0];

    // Overwrite file (on gaia) with 1 byte array
    const [err2,] = await to(userSession.putFile(file.name, new ArrayBuffer(1), {
      encrypt: false
    }));

    if (err2) {
      dispatch(errorAct(file));
      throw new Error('Could not update file');
    }

    // Save record
    fileRec.update({deleted: true});

    const [err3,] = await to(fileRec.save());
    if (err3) {
      dispatch(errorAct(file));
      throw new Error('Could not update file record');
    }

    dispatch(okAct(file));
  };

  const {deleteQueue: queue} = getState();
  const {pending} = queue;

  const chunks = arrayChunk(pending, FILE_CONCURRENCY);

  for (let x = 0; x < chunks.length; x++) {
    const ps = chunks[x].map(x => deleteFile(x).catch(x => x));
    await Promise.all(ps);
  }

  dispatch(finishAct());
};

export const resetDeleteQueue = () => (dispatch) => {
  dispatch(resetAct());
};


/* Action creators */

export const setAct = (files) => ({
  type: SET,
  payload: {
    files
  }
});

export const startAct = () => ({
  type: START
});

export const finishAct = () => ({
  type: FINISH
});


export const okAct = (file) => ({
  type: OK,
  payload: {
    file
  }
});

export const errorAct = (file) => ({
  type: ERROR,
  payload: {
    file
  }
});


export const resetAct = () => ({
  type: RESET
});
