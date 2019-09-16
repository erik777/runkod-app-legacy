import reducer, {
  fetchAct,
  fetchedAct,
  fetchErrorAct
} from './files';

import {
  logOutAct
} from './user';

import {
  selectAct as projectSelectAct
} from "./project";

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
  const files = [
    {attrs: {parent: '/', label: 'index.html'}},
    {attrs: {parent: '/css/', label: 'style.css'}},
    {attrs: {parent: '/css/', label: 'vendor.css'}},
    {attrs: {parent: '/js/', label: 'main.js'}},
    {attrs: {parent: '/mobile/css/', label: 'mobile.css'}}
  ];
  const act = fetchedAct(files);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('5- user logout', () => {
  const act = logOutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('6- project select', () => {
  const files = [
    {attrs: {parent: '/', label: 'index.html'}},
  ];

  state = reducer(state, fetchedAct(files));

  const act = projectSelectAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});
