import reducer, {
  selectAct,
  setStatusAct
} from './project';

import {
  logOutAct
} from './user';

let state = undefined;

it('1- default', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});

it('2- select', () => {
  const act = selectAct({_id: 'project1', status: 1});
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('3- set status', () => {
  const act = setStatusAct(2);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('4- user logout', () => {
  const act = logOutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});
