import reducer, {
  setAct,
  startAct,
  finishAct,
  fileStartAct,
  fileOkAct,
  fileErrorAct,
  resetAct
} from "./delete-queue"

let state = undefined;

it('1- default state', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});

it('2- set. 2 items in "files".', () => {
  const files = [
    {parent: '/', label: 'style.css'}, {parent: '/', label: 'main.js'}
  ];
  const act = setAct(files);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('3- start', () => {
  const act = startAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('4- file start ', () => {
  const act = fileStartAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('5- file ok. 1 item in "files", 1 items in "completed".', () => {
  const act = fileOkAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('6- file start.', () => {
  const act = fileStartAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('7- file error. 0 item in "files", 1 items in "completed", 1 item in "failed". ', () => {
  const act = fileErrorAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('8- finish', () => {
  const act = finishAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('9- reset', () => {
  const act = resetAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});