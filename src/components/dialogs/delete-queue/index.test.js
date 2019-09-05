import React from 'react';
import {DialogContent} from './index';
import TestRenderer from 'react-test-renderer'; // ES6


test('1- default', () => {
  const props = {
    deleteQueue: {
      current: '',
      inProgress: false,
      files: [
        {
          parent: '/',
          label: 'file1.json'
        },
        {
          parent: '/',
          label: 'file2.json'
        }
      ],
      completed: [],
      failed: [],
      log: []
    },
    ui: {
      deleteDetail: false,
      deleteSummaryDetail: false
    },
    toggleUiProp: () => {
    },
    startDeleteQueue: () => {
    },
    resetDeleteQueue: () => {
    },
    fetchFiles: () => {
    }
  };

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('2- show details', () => {
  const props = {
    deleteQueue: {
      current: '',
      inProgress: false,
      files: [
        {
          parent: '/',
          label: 'file1.json'
        },
        {
          parent: '/',
          label: 'file2.json'
        }
      ],
      completed: [],
      failed: [],
      log: []
    },
    ui: {
      deleteDetail: true,
      deleteSummaryDetail: false
    },
    toggleUiProp: () => {
    },
    startDeleteQueue: () => {
    },
    resetDeleteQueue: () => {
    },
    fetchFiles: () => {
    }
  };

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('3- in progress', () => {
  const props = {
    deleteQueue: {
      current: '/file1.json',
      inProgress: true,
      files: [
        {
          parent: '/',
          label: 'file1.json'
        },
        {
          parent: '/',
          label: 'file2.json'
        }
      ],
      completed: [],
      failed: [],
      log: []
    },
    ui: {
      deleteDetail: false,
      deleteSummaryDetail: false
    },
    toggleUiProp: () => {
    },
    startDeleteQueue: () => {
    },
    resetDeleteQueue: () => {
    },
    fetchFiles: () => {
    }
  };

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('4- completed', () => {
  const props = {
    deleteQueue: {
      current: '/file1.json',
      inProgress: false,
      files: [],
      completed: [{
        parent: '/',
        label: 'file1.json'
      }, {
        parent: '/',
        label: 'file2.json'
      }],
      failed: [],
      log: []
    },
    ui: {
      deleteDetail: false,
      deleteSummaryDetail: false
    },
    toggleUiProp: () => {
    },
    startDeleteQueue: () => {
    },
    resetDeleteQueue: () => {
    },
    fetchFiles: () => {
    }
  };

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('5- completed. show detail', () => {
  const props = {
    deleteQueue: {
      current: '/file1.json',
      inProgress: false,
      files: [],
      completed: [{
        parent: '/',
        label: 'file1.json'
      }, {
        parent: '/',
        label: 'file2.json'
      }],
      failed: [],
      log: [{
        type: 'success',
        msg: '/file1.json deleted'
      }, {
        type: 'success',
        msg: '/file2.json deleted'
      }]
    },
    ui: {
      deleteDetail: false,
      deleteSummaryDetail: true
    },
    toggleUiProp: () => {
    },
    startDeleteQueue: () => {
    },
    resetDeleteQueue: () => {
    },
    fetchFiles: () => {
    }
  };

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('6- show details with error', () => {
  const props = {
    deleteQueue: {
      current: '/file1.json',
      inProgress: false,
      files: [],
      completed: [{
        parent: '/',
        label: 'file1.json'
      }],
      failed: [ {
        parent: '/',
        label: 'file2.json'
      }],
      log: [{
        type: 'success',
        msg: '/file1.json deleted'
      }, {
        type: 'error',
        msg: '/file2.json could not delete'
      }]
    },
    ui: {
      deleteDetail: false,
      deleteSummaryDetail: true
    },
    toggleUiProp: () => {
    },
    startDeleteQueue: () => {
    },
    resetDeleteQueue: () => {
    },
    fetchFiles: () => {
    }
  };

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});