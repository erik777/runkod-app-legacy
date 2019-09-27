import React from 'react';
import NavBar from './navbar';
import TestRenderer from 'react-test-renderer';


const fnProps = {
  logout: () => {
  },
  selectProject: () => {
  },
  history: {
    push: () => {
    }
  },
  toggleUiProp: () => {

  }
};


test('1- default render', () => {
  const props = Object.assign({}, {
    user: {
      username: 'runkod.id.blockstack',
      image: 'https://foo.bar/image.png'
    },
    ui: {
      contact: false
    }
  }, fnProps);

  const renderer = TestRenderer.create(
    <NavBar {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('2- no user image', () => {
  const props = Object.assign({}, {
    user: {
      username: 'runkod.id.blockstack',
      image: ''
    },
    ui: {
      contact: false
    }

  }, fnProps);

  const renderer = TestRenderer.create(
    <NavBar {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});
