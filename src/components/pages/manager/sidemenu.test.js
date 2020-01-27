import React from 'react';
import TestRenderer from 'react-test-renderer';

import SideMenu from './sidemenu';

test('1- 2 projects, no project selected, not collapsed', () => {
  const props = {
    projects: {
      list: [
        {_id: 'uniqueid1', name: 'project 1', redirectTo: ''},
        {_id: 'uniqueid2', name: 'project 2', redirectTo: ''}
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
        {_id: 'uniqueid1', name: 'project 1', redirectTo: ''},
        {_id: 'uniqueid2', name: 'project 2', redirectTo: ''}
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
        {_id: 'uniqueid1', name: 'project 1', redirectTo: ''},
        {_id: 'uniqueid2', name: 'project 2', redirectTo: ''}
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



test('4 redirected projects', () => {
  const props = {
    projects: {
      list: [
        {_id: 'uniqueid1', name: 'project 1', redirectTo: ''},
        {_id: 'uniqueid2', name: 'project 2', redirectTo: ''},
        {_id: 'uniqueid3', name: 'project 3', redirectTo: 'uniqueid1'},
        {_id: 'uniqueid4', name: 'project 4', redirectTo: 'uniqueid1'},
        {_id: 'uniqueid5', name: 'project 5', redirectTo: 'uniqueid2'},
        {_id: 'uniqueid6', name: 'project 6', redirectTo: ''},
      ]
    },
    project: {_id: 'uniqueid3'},
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




