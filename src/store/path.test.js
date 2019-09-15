import reducer, {
  selectAct
} from './path';

import {
  selectAct as projectSelect
} from './project';

import {
  logOutAct
} from './user';

let state = undefined;

it('1- default', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});


it('2- select', () => {
  const act = selectAct('/foo/bar/');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('3- project select', () => {
  const act = projectSelect({_id: 'projectId'});
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('3- user logout', () => {
  state = reducer(state, selectAct('/foo/bar/'));

  const act = logOutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});