import to from 'await-to-js';

import md5 from 'blueimp-md5';

import mime from 'mime-types';

import transformContent from '../core-utils/transform'

import {userSession, getUsername} from '../blockstack-config';

import arrayChunk from '../utils/array-chunk';

import uniqueId from '../utils/unique-id';

import {File} from '../model';

import {USER_LOGOUT} from './user';

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
export const SET = '@upload-queue/SET';
export const START = '@upload-queue/START';
export const FINISH = '@upload-queue/FINISH';
export const OK = '@upload-queue/OK';
export const ERROR = '@upload-queue/ERROR';
export const RESET = '@upload-queue/RESET';


/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET: {
      const {files} = action.payload;
      return Object.assign({}, state, {pending: files, show: true});
    }
    case START: {
      const log = [...state.log, {type: 'info', msg: `Upload started`}];
      return Object.assign({}, state, {inProgress: true, log});
    }
    case FINISH: {
      let msg = `${state.completed.length} file(s) uploaded 🎉`;

      if (state.failed.length > 0) {
        msg = `${state.completed.length} file(s) uploaded, ${state.failed.length} file(s) failed  👀`;
      }

      const log = [...state.log, {type: 'info', msg}];
      return Object.assign({}, state, {inProgress: false, log});
    }
    case OK: {
      const {file} = action.payload;
      const pending = state.pending.filter(x => x._id !== file._id);

      const completed = [...state.completed, file];
      const path = `${file.path}${file.name}`;
      const log = [...state.log, {type: 'success', msg: `/${path} uploaded`}];
      return Object.assign({}, state, {pending, completed, log});
    }
    case ERROR: {
      const {file} = action.payload;
      const pending = state.pending.filter(x => x._id !== file._id);

      const failed = [...state.failed, file];
      const path = `${file.path}${file.name}`;
      const log = [...state.log, {type: 'error', msg: `/${path} could not upload`}];
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
export const setUploadQueue = (files) => (dispatch) => {
  // Create a virtual unique id for each entry
  const files_ = files.map(x => Object.assign({}, x, {_id: uniqueId()}));

  dispatch(setAct(files_));
};

export const resetUploadQueue = () => (dispatch) => {
  dispatch(resetAct());
};

export const processUploadQueue = () => async (dispatch, getState) => {
  dispatch(startAct());

  const {path, project} = getState();

  const uploadFile = async (file) => {
    const parent = `${path}${file.path}`;
    const fullPath = `${parent}${file.name}`;

    const fileS = file.name.split('.');
    const fileExt = fileS.length > 1 ? `.${fileS[fileS.length - 1]}`.toLowerCase() : '';
    const gaiaFileName = md5(`${project._id}-${uniqueId()}`) + fileExt;
    const mimeType = mime.lookup(fileExt) || null;

    // Check if file exists
    const [err1, fileRecs] = await to(File.fetchOwnList({
      project: project._id,
      tag: project.tag,
      fullPath,
      deleted: false,
      sort: '-createdAt'
    }));

    if (err1) {
      dispatch(errorAct(file));
      throw new Error('Could not get file info');
    }

    const fileBuff = transformContent(file.buffer);

    // Upload file to gaia
    const [err2, address] = await to(userSession.putFile(gaiaFileName, fileBuff, {
      encrypt: false,
      contentType: mimeType
    }));

    if (err2) {
      dispatch(errorAct(file));
      throw new Error('Could not upload file to gaia');
    }

    if (fileRecs.length > 0) {
      // Overwrite

      const [fileRec,] = fileRecs;
      const {name: oldName} = fileRec.attrs;

      // Update record
      fileRec.update({name: gaiaFileName, address});

      const [err1,] = await to(fileRec.save());
      if (err1) {
        dispatch(errorAct(file));
        throw new Error('Could not update file record');
      }

      // Delete old file on gaia. No need to handle error.
      await to(userSession.putFile(oldName, new ArrayBuffer(1), {
        encrypt: false
      }));

      dispatch(okAct(file));
      return;
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
      type: mimeType,
      deleted: false
    };
    const f = new File(props);

    const [err3,] = await to(f.save());
    if (err3) {
      dispatch(errorAct(file));
      throw new Error('Could not create file record');
    }

    dispatch(okAct(file));
  };

  const {uploadQueue: queue} = getState();
  const {pending} = queue;

  const chunks = arrayChunk(pending, FILE_CONCURRENCY);

  for (let x = 0; x < chunks.length; x++) {
    const ps = chunks[x].map(x => uploadFile(x).catch(x => x));
    await Promise.all(ps);
  }

  dispatch(finishAct());
};


/* Action creators */

export const setAct = (files) => ({
  type: SET,
  payload: {
    files
  }
});

export const resetAct = () => ({
  type: RESET
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
