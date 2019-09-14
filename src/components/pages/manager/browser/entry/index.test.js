import React from "react";
import TestRenderer from "react-test-renderer";


import {Icon} from './index';

describe('Browser Entry - Icon', () => {

  test('1- jpeg icon', () => {
    const props = {
      type: 'image/jpeg'
    };

    const renderer = TestRenderer.create(
      <Icon {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  test('2- png icon', () => {
    const props = {
      type: 'image/png'
    };

    const renderer = TestRenderer.create(
      <Icon {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  test('3- html icon', () => {
    const props = {
      type: 'text/html'
    };

    const renderer = TestRenderer.create(
      <Icon {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  test('4- json icon', () => {
    const props = {
      type: 'application/json'
    };

    const renderer = TestRenderer.create(
      <Icon {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });


  test('5- javascript icon', () => {
    const props = {
      type: 'text/javascript'
    };

    const renderer = TestRenderer.create(
      <Icon {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  test('6- css icon', () => {
    const props = {
      type: 'text/css'
    };

    const renderer = TestRenderer.create(
      <Icon {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });


  test('7- unknown type icon', () => {
    const props = {
      type: 'text/php'
    };

    const renderer = TestRenderer.create(
      <Icon {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});