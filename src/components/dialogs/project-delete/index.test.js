import React from 'react';
import {DialogContent} from './index';
import TestRenderer from 'react-test-renderer';

const fnProps = {
  selectProject: () => {

  },
  fetchProjects: () => {

  },
  toggleUiProp: () => {
  },
};


test('1- default', () => {
  const props = Object.assign({}, {
    project: {
      _id: 'unique_id',
      name: 'test.com',
    },
  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

