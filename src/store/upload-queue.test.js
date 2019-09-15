import reducer, {
  setAct,
  fileOkAct,
  fileErrorAct,
  fileConflictAct,
  conflictFlagAct,
  fileSkipAct,
  resetQueueAct
} from "./upload-queue"

let state = undefined;

it('1- default state', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});

it('2- add files to queue. 12 items in "files".', () => {
  const files = [
    {path: '', name: 'style.css'}, {path: '', name: 'main.js'}, {path: '', name: 'vendor.js'},
    {path: '', name: 'index.html'}, {path: '', name: 'manifest.json'}, {path: '', name: 'favicon.ico'},
    {path: '', name: 'bg.jpg'}, {path: '', name: 'logo.png'}, {path: '', name: 'foo.gif'},
    {path: '', name: 'bar.png'}, {path: '', name: 'baz.js'}, {path: '', name: 'lorem.css'}
  ];
  const act = setAct(files);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('3- file ok action. 11 items in "files", 1 item in "completed".', () => {
  const act = fileOkAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('4- file ok action. 10 item in "files", 2 items in "completed".', () => {
  const act = fileOkAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('5- file ok action. 9 item in "files", 3 items in "completed".', () => {
  const act = fileOkAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('6- file error action. 8 item in "files", 3 items in "completed", 1 item in "failed". ', () => {
  const act = fileErrorAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('7- file conflict action.', () => {
  const act = fileConflictAct('/path/file');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('8- conflict flag action.', () => {
  const act = conflictFlagAct(2);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('9- file ok action. Conflict flag should change to 0.', () => {
  const act = fileOkAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('10- file conflict action.', () => {
  const act = fileConflictAct('/path/file2');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('11- conflict flag action.', () => {
  const act = conflictFlagAct(5);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('12- file skip action. Should add an item under "skipped".conflictFlag should be still 5', () => {
  const act = fileSkipAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('13- file skip action. Should add an item under "skipped".conflictFlag should be still 5', () => {
  const act = fileSkipAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('14- reset queue', () => {
  const act = resetQueueAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});