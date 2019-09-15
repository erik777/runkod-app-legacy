import React from 'react';
import {DialogContent} from './index';
import TestRenderer from 'react-test-renderer';


const fnProps = {
  toggleUiProp: () => {
  },
  startUploadQueue: () => {
  },
  setUploadQueueConflictFlag: () => {
  },
  resetUploadQueue: () => {
  },
  fetchFiles: () => {
  }
};


test('1- uploading', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      current: '/file1.json',
      inProgress: false,
      files: [
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
      skipped: [],
      conflict: false,
      conflictFlag: 0,
      log: []
    },
    ui: {
      uploadSummaryDetail: false
    },

  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('2- uploading 2', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      current: '/file3.json',
      inProgress: false,
      files: [
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

      completed: [
        {
          path: '/',
          name: 'file1.json'
        },
        {
          path: '/',
          name: 'file2.json'
        }
      ],
      failed: [],
      skipped: [],
      conflict: false,
      conflictFlag: 0,
      log: []
    },
    ui: {
      uploadSummaryDetail: false
    }
  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('3- conflicted', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      current: '/file3.json',
      inProgress: false,
      files: [
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

      completed: [
        {
          path: '/',
          name: 'file1.json'
        },
        {
          path: '/',
          name: 'file2.json'
        }
      ],
      failed: [],
      skipped: [],
      conflict: true,
      conflictFlag: 0,
      log: []
    },
    ui: {
      uploadSummaryDetail: false
    }
  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('3- conflicted with single file', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      current: '/file3.json',
      inProgress: false,
      files: [
        {
          path: '/',
          name: 'file3.json'
        }
      ],
      completed: [],
      failed: [],
      skipped: [],
      conflict: true,
      conflictFlag: 0,
      log: []
    },
    ui: {
      uploadSummaryDetail: false
    }
  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('4- completed single file', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      current: '',
      inProgress: false,
      files: [],
      completed: [
        {
          path: '/',
          name: 'file2.json'
        }
      ],
      failed: [],
      skipped: [],
      conflict: false,
      conflictFlag: 0,
      log: []
    },
    ui: {
      uploadSummaryDetail: false
    }
  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('5- completed multi file', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      current: '',
      inProgress: false,
      files: [],
      completed: [
        {
          path: '/',
          name: 'file2.json'
        },
        {
          path: '/',
          name: 'file3.json'
        }
      ],
      failed: [],
      skipped: [],
      conflict: false,
      conflictFlag: 0,
      log: []
    },
    ui: {
      uploadSummaryDetail: false
    }
  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('6- completed mixed', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      current: '',
      inProgress: false,
      files: [],
      completed: [
        {
          path: '/',
          name: 'file2.json'
        },
        {
          path: '/',
          name: 'file3.json'
        }
      ],
      failed: [
        {
          path: '/',
          name: 'file4.json'
        },
        {
          path: '/',
          name: 'file5.json'
        }
      ],
      skipped: [
        {
          path: '/',
          name: 'file6.json'
        }
      ],
      conflict: false,
      conflictFlag: 0,
      log: []
    },
    ui: {
      uploadSummaryDetail: false
    }
  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});


test('7- show details', () => {
  const props = Object.assign({}, {
    uploadQueue: {
      current: '',
      inProgress: false,
      files: [],
      completed: [
        {
          path: '/',
          name: 'file2.json'
        },
        {
          path: '/',
          name: 'file3.json'
        }
      ],
      failed: [
        {
          path: '/',
          name: 'file4.json'
        },
        {
          path: '/',
          name: 'file5.json'
        }
      ],
      skipped: [
        {
          path: '/',
          name: 'file6.json'
        }
      ],
      conflict: false,
      conflictFlag: 0,
      log: [
        {
          type: 'success',
          msg: 'file2.json uploaded'
        },
        {
          type: 'success',
          msg: 'file3.json uploaded'
        },
        {
          type: 'error',
          msg: 'file4.json could not uploaded'
        },
        {
          type: 'error',
          msg: 'file5.json could not uploaded'
        },
        {
          type: 'info',
          msg: 'file6.json skipped'
        }
      ]
    },
    ui: {
      uploadSummaryDetail: true
    }
  }, fnProps);

  const renderer = TestRenderer.create(
    <DialogContent {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});