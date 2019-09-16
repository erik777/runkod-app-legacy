import reducer, {
  checkListAddAct,
  checkListDeleteAct,
  checkListResetAct
} from './check-list'

import {finishAct as deleteQueueFinishAct} from './delete-queue';
import {setAct as uploadQueueSetAct} from './upload-queue';
import {selectAct as pathSelectAct} from './path'
import {selectAct as projectSelectAct} from './project';
import {logOutAct} from './user';

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

it('7- add ', () => {
  const act = checkListAddAct(["bar", "baz"]);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('8- reset ', () => {
  const act = checkListResetAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('9- add ', () => {
  const act = checkListAddAct(["bar", "baz"]);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('10- add ', () => {
  const act = checkListAddAct(["baz"]);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('11- delete queue finish ', () => {
  const act = deleteQueueFinishAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('12- upload queue set  ', () => {
  state = reducer(state, checkListAddAct(["baz", "bar"]));

  const act = uploadQueueSetAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('13- path select', () => {
  state = reducer(state, checkListAddAct(["baz", "bar"]));

  const act = pathSelectAct('/foo/');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('14- project select', () => {
  state = reducer(state, checkListAddAct(["baz", "bar"]));

  const act = projectSelectAct({_id: 'projectid'});
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('15- log out', () => {
  state = reducer(state, checkListAddAct(["baz", "bar"]));

  const act = logOutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});