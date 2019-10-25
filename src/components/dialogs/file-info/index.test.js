import React from 'react';
import {DialogContent} from './index';
import TestRenderer from 'react-test-renderer';


test('1- default', () => {
  const props = {
    file: {
      type: 'text/html',
      label: 'index.html',
      fullPath: '/index.html',
      address: 'https://somewhereongaia/234234324/rqwrq32.html',
      size: 2342
    },
    project: {
      name: 'fooo.com'
    },
    onHide: () => {
    }
  };

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('2- no type', () => {
  const props = {
    file: {
      type: null,
      label: 'index.html',
      fullPath: '/index.html',
      address: 'https://somewhereongaia/234234324/rqwrq32.html',
      size: 2342
    },
    project: {
      name: 'fooo.com'
    },
    onHide: () => {
    }
  };

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('3- image file', () => {
  const props = {
    file: {
      type: 'image/jpeg',
      label: 'logo.jpg',
      fullPath: '/logo.jpg',
      address: 'https://somewhereongaia/234234324/rqwrq32.jpg',
      size: 2342
    },
    project: {
      name: 'fooo.com'
    },
    onHide: () => {
    }
  };

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

