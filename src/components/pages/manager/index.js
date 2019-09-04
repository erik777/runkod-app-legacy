/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import {_t} from '../../../i18n';

import SideMenu from './sidemenu';

import Project from './project';

import NewProjectDialog from '../../dialogs/new-project';

import UploadQueueDialog from '../../dialogs/upload-queue';

class ManagerPage extends Component {

  constructor(props) {
    super(props);

    const {fetchProjects} = this.props;
    fetchProjects();
  }

  newProjectCreated = () => {
    const {fetchProjects} = this.props;
    fetchProjects();
  };

  render() {
    const {ui, projects, project, uploadQueue} = this.props;

    const {loading} = projects;
    const {list} = projects;

    return (
      <div className="manager-page">
        <div className="header">
          <span/>
        </div>

        <div className="page-content">

          { /* Projects loaded. But empty. */}
          {(!loading && list.length === 0) &&
          <div className="no-project">
            <p className="message-header">
              {_t('manager.no-project.message')}
            </p>
            <Button onClick={() => {
              const {toggleUiProp} = this.props;
              toggleUiProp('newProject');
            }}>{_t('manager.no-project.button-label')}</Button>
          </div>
          }

          { /* Projects loaded. Not empty. But not selected. */}
          {(!loading && list.length > 0 && project === null) &&
          <div className="no-selected-project">
            <p className="message-header">
              {_t('manager.no-selected-project.message')}
            </p>
          </div>
          }

          {/* Projects loaded. List not empty. Show side project bar. */}
          {(!loading && list.length > 0) &&
          <SideMenu projects={projects} {...this.props} />
          }


          {project && <Project {...this.props} />}

        </div>


        {ui.newProject &&
        <NewProjectDialog {...this.props} onSave={this.newProjectCreated}/>}

        {(uploadQueue.started) &&
        <UploadQueueDialog  {...this.props} />
        }
      </div>
    )
  }
}

ManagerPage.defaultProps = {};

ManagerPage.propTypes = {
  user: PropTypes.string.isRequired,
  ui: PropTypes.shape({
    newProject: PropTypes.bool.isRequired
  }),
  uploadQueue: PropTypes.shape({
    files: PropTypes.arrayOf(Object).isRequired,
    completed: PropTypes.arrayOf(Object).isRequired,
    failed: PropTypes.arrayOf(Object).isRequired,
    skipped: PropTypes.arrayOf(Object).isRequired,
    started: PropTypes.bool.isRequired
  }),
  toggleUiProp: PropTypes.func.isRequired,
  projects: PropTypes.instanceOf(Object).isRequired,
  project: PropTypes.instanceOf(Object),
  path: PropTypes.string.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchFiles: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default ManagerPage;