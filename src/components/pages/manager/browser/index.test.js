import React from 'react';
import TestRenderer from 'react-test-renderer';

import Browser from './index';

test('1- loading', () => {
  const props = {
    files: {
      list: [],
      loading: true,
      map: null
    },
    path: '/',
    selectPath: () => {

    },
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    }
  };

  const renderer = TestRenderer.create(
    <Browser {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('2- no file', () => {
  const props = {
    files: {
      list: [],
      loading: false,
      map: {'/': {folders: [], files: []}}
    },
    path: '/',
    selectPath: () => {

    },
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    }
  };

  const renderer = TestRenderer.create(
    <Browser {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('3- with files and folders', () => {
  const props = {
    files: {
      list: [{
        _id: 'fileid1',
        label: 'file1.txt',
        parent: '/',
        size: 2891,
        type: null
      }, {
        _id: 'fileid2',
        label: 'file1.css',
        parent: '/foo/',
        size: 3121,
        type: 'text/css'
      }, {
        _id: 'fileid3',
        label: 'index.html',
        parent: '/',
        size: 12342,
        type: 'text/html'
      }],
      loading: false,
      map: {
        '/': {
          folders: ['/foo/'], files: [
            {
              _id: 'fileid1',
              label: 'file1.txt',
              parent: '/',
              size: 2891
            }, {
              _id: 'fileid3',
              label: 'index.html',
              parent: '/',
              size: 12342,
              type: 'text/html'
            }
          ]
        },
        '/foo/': {
          folders: [], files: [
            {
              _id: 'fileid2',
              label: 'file1.css',
              parent: '/foo/',
              size: 3121,
              type: 'text/css'
            }
          ]
        }
      }
    },
    path: '/',
    selectPath: () => {

    },
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    },
    // props for sub components
    checkList: [],
    checkListAdd: () => {
    },
    checkListDelete: () => {
    }
  };

  const renderer = TestRenderer.create(
    <Browser {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('4- in sub folder', () => {
  const props = {
    files: {
      list: [{
        _id: 'fileid1',
        label: 'file1.txt',
        parent: '/',
        size: 2891,
        type: null
      }, {
        _id: 'fileid2',
        label: 'file1.css',
        parent: '/foo/',
        size: 3121,
        type: 'text/css'
      }, {
        _id: 'fileid3',
        label: 'index.html',
        parent: '/',
        size: 12342,
        type: 'text/html'
      }],
      loading: false,
      map: {
        '/': {
          folders: ['/foo/'], files: [
            {
              _id: 'fileid1',
              label: 'file1.txt',
              parent: '/',
              size: 2891
            }, {
              _id: 'fileid3',
              label: 'index.html',
              parent: '/',
              size: 12342,
              type: 'text/html'
            }
          ]
        },
        '/foo/': {
          folders: [], files: [
            {
              _id: 'fileid2',
              label: 'file1.css',
              parent: '/foo/',
              size: 3121,
              type: 'text/css'
            }
          ]
        }
      }
    },
    path: '/foo/',
    selectPath: () => {

    },
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    },
    // props for sub components
    checkList: [],
    checkListAdd: () => {
    },
    checkListDelete: () => {
    }
  };

  const renderer = TestRenderer.create(
    <Browser {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});