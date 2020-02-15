import React from 'react';
import ProjectForm from './form';
import TestRenderer from 'react-test-renderer';


test('1- default', () => {
  const props = {
    switchFn: () => {
    },
    onDone: () => {
    }
  };

  const renderer = TestRenderer.create(
    <ProjectForm {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});
