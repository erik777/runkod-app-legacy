import reducer, {selectAct} from './file'
import {logOutAct} from './user';

let state = undefined;

it('1- default state', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});

it('2- select', () => {
  const act = selectAct({_id: 'project1', name: 'x.png', status: 1});
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('3- user logout', () => {
  const act = logOutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});
