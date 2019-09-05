import reducer, {
  checkListAddAct,
  checkListDeleteAct,
  checkListResetAct
} from "./check-list"


let state = undefined;

it('1- default state', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});

it('2- add ', () => {
  const act = checkListAddAct("foo");
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('3- add ', () => {
  const act = checkListAddAct("bar");
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('4- add ', () => {
  const act = checkListAddAct("baz");
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('4- remove ', () => {
  const act = checkListDeleteAct("bar");
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('5- remove ', () => {
  const act = checkListDeleteAct("foo");
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('6- remove ', () => {
  const act = checkListDeleteAct("baz");
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('7 add ', () => {
  const act = checkListAddAct(["bar", "baz"]);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('8 reset ', () => {
  const act = checkListResetAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('9 add ', () => {
  const act = checkListAddAct(["bar", "baz"]);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('10 add ', () => {
  const act = checkListAddAct(["baz"]);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});