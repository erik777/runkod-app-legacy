import React from 'react';
import {DialogContent} from './index';
import TestRenderer from 'react-test-renderer';

const fnProps = {
  toggleUiProp: () => {
  },
};


test('1- default', () => {
  const props = Object.assign({}, {
    project: {
      _id: 'unique_id',
      name: 'test.com',
      status: 1,
      redirectTo: ''
    },
    projects: {list: []}
  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

