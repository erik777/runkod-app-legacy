import React from 'react';
import TestRenderer from 'react-test-renderer';

import Project from './project';

test('1- files loading', () => {
  const props = {
    project: {
      name: 'test.com'
    },
    files: {
      loading: true,
      list: [],
      map: null
    },
    ui: {
      projectSettings: false,
    },
    path: '/',
    checkList: [],
    fetchFiles: () => {

    },
    selectPath: () => {

    },
    checkListAdd: () => {

    },
    checkListReset: () => {

    },
    setDeleteQueue: () => {

    },
    toggleUiProp: () => {

    },
    // props for sub components
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    }
  };

  const renderer = TestRenderer.create(
    <Project {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('2- loaded. no file', () => {
  const props = {
    project: {
      name: 'test.com'
    },
    files: {
      loading: false,
      list: [],
      map: {'/': {folders: [], files: []}}
    },
    ui: {
      projectSettings: false,
    },
    path: '/',
    checkList: [],
    fetchFiles: () => {

    },
    selectPath: () => {

    },
    checkListAdd: () => {

    },
    checkListReset: () => {

    },
    setDeleteQueue: () => {

    },
    toggleUiProp: () => {

    },
    // props for sub components
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    }
  };

  const renderer = TestRenderer.create(
    <Project {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('3- loaded. with files and folders', () => {
  const props = {
    project: {
      name: 'test.com'
    },
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
    ui: {
      projectSettings: false,
    },
    path: '/',
    checkList: [],
    fetchFiles: () => {

    },
    selectPath: () => {

    },
    checkListAdd: () => {

    },
    checkListReset: () => {

    },
    setDeleteQueue: () => {

    },
    toggleUiProp: () => {

    },
    // props for sub components
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    },
    checkListDelete: () => {
    }
  };

  const renderer = TestRenderer.create(
    <Project {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

/*
test('4- in sub folder', () => {
  const props = {
    project: {
      name: 'test.com'
    },
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
    ui: {
      projectSettings: false,
    },
    path: '/foo/',
    checkList: [],
    fetchFiles: () => {

    },
    selectPath: () => {

    },
    checkListAdd: () => {

    },
    checkListReset: () => {

    },
    setDeleteQueue: () => {

    },
    toggleUiProp: () => {

    },
    // props for sub components
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    },
    checkListDelete: () => {
    }
  };

  const renderer = TestRenderer.create(
    <Project {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});
*/

test('5- 1 item in checklist', () => {
  const props = {
    project: {
      name: 'test.com'
    },
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
    ui: {
      projectSettings: false,
    },
    path: '/',
    checkList: ['fileid1'],
    fetchFiles: () => {

    },
    selectPath: () => {

    },
    checkListAdd: () => {

    },
    checkListReset: () => {

    },
    setDeleteQueue: () => {

    },
    toggleUiProp: () => {

    },
    // props for sub components
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    },
    checkListDelete: () => {
    }
  };

  const renderer = TestRenderer.create(
    <Project {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('6- 2 items in checklist', () => {
  const props = {
    project: {
      name: 'test.com'
    },
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
    ui: {
      projectSettings: false,
    },
    path: '/',
    checkList: ['fileid1', 'fileid3'],
    fetchFiles: () => {

    },
    selectPath: () => {

    },
    checkListAdd: () => {

    },
    checkListReset: () => {

    },
    setDeleteQueue: () => {

    },
    toggleUiProp: () => {

    },
    // props for sub components
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    },
    checkListDelete: () => {
    }
  };

  const renderer = TestRenderer.create(
    <Project {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('7- all items in checklist', () => {
  const props = {
    project: {
      name: 'test.com'
    },
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
    ui: {
      projectSettings: false,
    },
    path: '/',
    checkList: ['fileid1', 'fileid3', '/foo/'],
    fetchFiles: () => {

    },
    selectPath: () => {

    },
    checkListAdd: () => {

    },
    checkListReset: () => {

    },
    setDeleteQueue: () => {

    },
    toggleUiProp: () => {

    },
    // props for sub components
    setUploadQueue: () => {

    },
    startUploadQueue: () => {

    },
    checkListDelete: () => {
    }
  };

  const renderer = TestRenderer.create(
    <Project {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});
