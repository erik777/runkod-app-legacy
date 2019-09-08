import React from 'react';
import Checkbox from './index';
import TestRenderer from 'react-test-renderer';


test('1- default', () => {
  const props = {};

  const renderer = TestRenderer.create(
    <Checkbox {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('2- checked', () => {
  const props = {
    checked: true
  };

  const renderer = TestRenderer.create(
    <Checkbox {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('3- disabled', () => {
  const props = {
    disabled: true
  };

  const renderer = TestRenderer.create(
    <Checkbox {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('4- checked + disabled', () => {
  const props = {
    checked: true,
    disabled: true
  };

  const renderer = TestRenderer.create(
    <Checkbox {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

