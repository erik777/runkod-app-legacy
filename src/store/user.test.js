import reducer, {
  loginAct,
  logOutAct
} from './user';

let state = undefined;

it('1- default', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});


it('2- login', () => {
  const act = loginAct('username');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('3- logout', () => {
  const act = logOutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});
