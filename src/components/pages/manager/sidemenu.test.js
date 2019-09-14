import React from 'react';
import TestRenderer from 'react-test-renderer';

import SideMenu from './sidemenu';

test('1- 2 projects, no project selected, not collapsed', () => {
  const props = {
    projects: {
      list: [
        {_id: 'uniqueid1', name: 'project 1'},
        {_id: 'uniqueid2', name: 'project 2'}
      ]
    },
    project: null,
    ui: {
      sideProjectsVisible: true
    },
    selectProject: () => {
    },
    fetchFiles: () => {
    },
    toggleUiProp: () => {
    }
  };

  const renderer = TestRenderer.create(
    <SideMenu {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('2- 2 projects, second project selected, not collapsed', () => {
  const props = {
    projects: {
      list: [
        {_id: 'uniqueid1', name: 'project 1'},
        {_id: 'uniqueid2', name: 'project 2'}
      ]
    },
    project: {_id: 'uniqueid2'},
    ui: {
      sideProjectsVisible: true
    },
    selectProject: () => {
    },
    fetchFiles: () => {
    },
    toggleUiProp: () => {
    }
  };

  const renderer = TestRenderer.create(
    <SideMenu {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

test('3- 2 projects, collapsed', () => {
  const props = {
    projects: {
      list: [
        {_id: 'uniqueid1', name: 'project 1'},
        {_id: 'uniqueid2', name: 'project 2'}
      ]
    },
    project: {_id: 'uniqueid1'},
    ui: {
      sideProjectsVisible: false
    },
    selectProject: () => {
    },
    fetchFiles: () => {
    },
    toggleUiProp: () => {
    }
  };

  const renderer = TestRenderer.create(
    <SideMenu {...props}/>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});

