import React from "react";
import TestRenderer from "react-test-renderer";


import {Icon, ParentFolderEntry, FolderEntry, FileEntry} from './index';

describe('1- Browser Entry - Icon', () => {

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

describe('2- Browser Entry - Parent Folder', () => {
  test('1- render', () => {
    const props = {
      path: '/foo/bar',
      selectPath: () => {
      }
    };

    const renderer = TestRenderer.create(
      <ParentFolderEntry {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});

describe('3- Browser Entry - Folder', () => {
  test('1- default render', () => {
    const props = {
      path: '/foo/bar/',
      checkList: [],
      selectPath: () => {
      },
      checkListAdd: () => {
      },
      checkListDelete: () => {
      }
    };

    const renderer = TestRenderer.create(
      <FolderEntry {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  test('2- checked', () => {
    const props = {
      path: '/foo/bar/',
      checkList: ['/foo/bar/', '/foo/baz/'],
      selectPath: () => {
      },
      checkListAdd: () => {
      },
      checkListDelete: () => {
      }
    };

    const renderer = TestRenderer.create(
      <FolderEntry {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});

describe('4- Browser Entry - File', () => {
  test('1- default render', () => {
    const props = {
      file: {
        _id: 'uniquefileid',
        type: 'text/html',
        label: 'index.html',
        size: 12321
      },
      checkList: [],
      checkListAdd: () => {
      },
      checkListDelete: () => {
      }
    };

    const renderer = TestRenderer.create(
      <FileEntry {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  test('2- checked', () => {
    const props = {
      file: {
        _id: 'uniquefileid',
        type: 'text/html',
        label: 'index.html',
        size: 12321
      },
      checkList: ['uniquefileid'],
      checkListAdd: () => {
      },
      checkListDelete: () => {
      }
    };

    const renderer = TestRenderer.create(
      <FileEntry {...props}/>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });


});