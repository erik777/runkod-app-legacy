import React from 'react';
import NotifyBar from './notifybar';
import TestRenderer from 'react-test-renderer';

test('1- should render null', () => {
  const props = {};

  const renderer = TestRenderer.create(
    <NotifyBar {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});
