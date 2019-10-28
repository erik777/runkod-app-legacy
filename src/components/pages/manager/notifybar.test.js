import React from 'react';
import NotifyBar from './notifybar';
import TestRenderer from 'react-test-renderer';


const fnProps = {
  invalidateUiFlag: () => {

  }
};

test('1- show example project notification', () => {
  const props = Object.assign({}, {
    ui: {
      epFlag: true
    }
  }, fnProps);

  const renderer = TestRenderer.create(
    <NotifyBar {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('2- should render null', () => {
  const props = Object.assign({}, {
    ui: {
      epFlag: false
    }
  }, fnProps);

  const renderer = TestRenderer.create(
    <NotifyBar {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});