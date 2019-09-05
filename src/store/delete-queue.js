import to from 'await-to-js';

import {USER_LOGOUT} from './user';


const initialState = {
  files: [],
  completed: [],
  failed: [],
  log: [],
  current: null,
  show: false,
  inProgress: false
};

/* Action types */

export const SET = '@delete-queue/SET';
export const START = '@delete-queue/START';
export const FINISH = '@delete-queue/FINISHED';
export const FILE_START = '@delete-queue/FILE_STARTED';
export const FILE_OK = '@delete-queue/FILE_OK';
export const FILE_ERROR = '@delete-queue/FILE_ERROR';
export const RESET = '@delete-queue/RESET';


const wait = ms => new Promise((r, j) => setTimeout(r, ms));


/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case SET: {
      const {files} = action.payload;
      return Object.assign({}, state, {files, show: true});
    }
    case START: {
      return Object.assign({}, state, {inProgress: true});
    }
    case FINISH: {
      return Object.assign({}, state, {inProgress: false});
    }
    case FILE_START: {
      const [file,] = state.files;
      const path = `${file.parent}${file.label}`;
      return Object.assign({}, state, {current: path});
    }
    case FILE_OK: {
      const [file, ...files] = state.files;
      const completed = [...state.completed, file];
      const path = `${file.parent}${file.label}`;
      const log = [...state.log, {type: 'success', msg: `${path} deleted`}];
      return Object.assign({}, state, {files, completed, current: null, log});
    }
    case FILE_ERROR: {
      const [file, ...files] = state.files;
      const failed = [...state.failed, file];
      const path = `${file.parent}${file.label}`;
      const log = [...state.log, {type: 'error', msg: `${path} could not delete`}];
      return Object.assign({}, state, {files, failed, current: null, log});
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

export const startDeleteQueue = () => async (dispatch, getState) => {
  dispatch(startAct());

  while (true) {

    const {deleteQueue: queue} = getState();
    const {files} = queue;

    if (files.length === 0) {
      dispatch(finishAct());
      break;
    }

    const {path, project} = getState();

    const [file,] = files;


    const fullPath = `${file.parent}${file.label}`;
    dispatch(fileStartAct());


    await to(wait(1000));


    /*

    const parent = `${path}${file.path}`;
    const fullPath = `${parent}${file.name}`;

    dispatch(fileStartAct(fullPath));

    const fileS = file.name.split('.');
    const fileExt = fileS.length > 1 ? `.${fileS[fileS.length - 1]}`.toLowerCase() : '';
    const gaiaFileName = md5(`${project._id}-${project.tag}-${file.name}`) + fileExt;

    // Check if file exists
    const [err1, rFiles] = await to(getFileRecordsByFilters({project: project._id, tag: project.tag, fullPath}));

    if (err1) {
      dispatch(fileErrorAct());
      continue;
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
      type: file.type
    };

    const [err3,] = await to(createFileRecord(props));
    if (err3) {
      dispatch(fileErrorAct());
      continue;
    }
    */

    dispatch(fileErrorAct());
  }
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


export const fileStartAct = () => ({
  type: FILE_START
});

export const fileOkAct = () => ({
  type: FILE_OK
});

export const fileErrorAct = () => ({
  type: FILE_ERROR
});


export const resetAct = () => ({
  type: RESET
});
