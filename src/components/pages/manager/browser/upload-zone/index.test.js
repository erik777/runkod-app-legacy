import React from 'react';
import TestRenderer from 'react-test-renderer';

import UploadZone from './index';

test('1- render', () => {
  const props = {
    onDrop: () => {
    }
  };

  const renderer = TestRenderer.create(
    <UploadZone {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});