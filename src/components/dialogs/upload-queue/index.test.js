import React from 'react';
import {DialogContent} from './index';
import TestRenderer from 'react-test-renderer';

const fnProps = {
  resetUploadQueue: () => {
  },
  fetchFiles: () => {
  }
};

it('1- dialog visible but upload not started.', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      pending: [
        {
          path: '/',
          name: 'file1.json'
        },
        {
          path: '/',
          name: 'file2.json'
        },
        {
          path: '/',
          name: 'file3.json'
        },
        {
          path: '/',
          name: 'file4.json'
        },
        {
          path: '/',
          name: 'file5.json'
        }
      ],
      completed: [],
      failed: [],
      log: [],
      inProgress: false,
    },

  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

it('2- upload started.', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      pending: [
        {
          path: '/',
          name: 'file1.json'
        },
        {
          path: '/',
          name: 'file2.json'
        },
        {
          path: '/',
          name: 'file3.json'
        },
        {
          path: '/',
          name: 'file4.json'
        },
        {
          path: '/',
          name: 'file5.json'
        }
      ],
      completed: [],
      failed: [],
      log: [],
      inProgress: true,
    },

  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

it('3- 2 files uploaded.', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      pending: [
        {
          path: '',
          name: 'file1.json'
        },
        {
          path: '',
          name: 'file3.json'
        },
        {
          path: '',
          name: 'file5.json'
        }
      ],
      completed: [
        {
          path: '',
          name: 'file2.json'
        },
        {
          path: '',
          name: 'file4.json'
        }
      ],
      failed: [],
      log: [
        {
          type: 'success',
          msg: 'file2.json uploaded',
        },
        {
          type: 'success',
          msg: 'file4.json uploaded',
        }
      ],
      inProgress: true,
    },

  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

it('4- all files uploaded.', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      pending: [],
      completed: [
        {
          path: '',
          name: 'file2.json'
        },
        {
          path: '',
          name: 'file4.json'
        },
        {
          path: '',
          name: 'file1.json'
        },
      ],
      failed: [],
      log: [
        {
          type: 'success',
          msg: 'file2.json uploaded',
        },
        {
          type: 'success',
          msg: 'file4.json uploaded',
        },
        {
          type: 'success',
          msg: 'file1.json uploaded',
        },
        {
          type: 'info',
          msg: '3 files uploaded 🎉',
        }
      ],
      inProgress: false,
    },

  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

it('5- finished with 1 fail.', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      pending: [],
      completed: [
        {
          path: '',
          name: 'file2.json'
        },
        {
          path: '',
          name: 'file4.json'
        }
      ],
      failed: [
        {
          path: '',
          name: 'file1.json'
        },
      ],
      log: [
        {
          type: 'success',
          msg: 'file2.json uploaded',
        },
        {
          type: 'success',
          msg: 'file4.json uploaded',
        },
        {
          type: 'success',
          msg: 'file1.json could not upload',
        },
        {
          type: 'info',
          msg: '2 files uploaded, 1 failed  👀',
        }
      ],
      inProgress: false,
    },

  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});
