import React from 'react';
import {DialogContent} from './index';
import TestRenderer from 'react-test-renderer';

import ShallowRenderer from 'react-test-renderer/shallow'

const fnProps = {
  setProjectStatus: () => {
  },
  toggleUiProp: () => {
  },
};


test('1- default', () => {
  const props = Object.assign({}, {
    project: {
      _id: 'unique_id',
      name: 'test.com',
      status: 1,
    },
  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

