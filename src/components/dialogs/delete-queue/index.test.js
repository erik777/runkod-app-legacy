import React from 'react';
import {DialogContent} from './index';
import TestRenderer from 'react-test-renderer';


it('1- default', () => {
  const props = {
    deleteQueue: {
      inProgress: false,
      pending: [{}, {}],
      completed: [],
      failed: [],
      log: []
    },
    processDeleteQueue: () => {
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

it('2- deleting', () => {
  const props = {
    deleteQueue: {
      inProgress: true,
      pending: [{}],
      completed: [{}],
      failed: [],
      log: [{
        type: 'info',
        msg: 'Deleting...'
      },
        {
          type: 'success',
          msg: '/foo.png deleted'
        }]
    },
    processDeleteQueue: () => {
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

it('2- done', () => {
  const props = {
    deleteQueue: {
      inProgress: false,
      pending: [],
      completed: [{}, {}],
      failed: [],
      log: [{
        type: 'info',
        msg: 'Deleting...'
      },
        {
          type: 'success',
          msg: '/foo.png deleted'
        }]
    },
    processDeleteQueue: () => {
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


it('3- failed', () => {
  const props = {
    deleteQueue: {
      inProgress: false,
      pending: [],
      completed: [{}],
      failed: [{}],
      log: [
        {
          type: 'info',
          msg: 'Deleting...'
        },
        {
          type: 'success',
          msg: '/foo.png deleted'
        }
      ]
    },
    processDeleteQueue: () => {
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

