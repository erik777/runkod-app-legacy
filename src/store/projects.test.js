import reducer, {
  fetchAct,
  fetchedAct,
  fetchErrorAct
} from './projects';

import {
  logOutAct
} from './user';

let state = undefined;

it('1- default', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});

it('2- fetch', () => {
  const act = fetchAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('3- fetch error', () => {
  const act = fetchErrorAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('4- fetched', () => {
  const act = fetchedAct([{attrs: {_id: 'project1'}}, {attrs: {_id: 'project2'}}]);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('5- user logout', () => {
  const act = logOutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});
