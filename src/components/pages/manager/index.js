/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import logo from '../../../images/logo-rect-white.png';

import {_t} from '../../../i18n';

import SideMenu from './sidemenu';

import Project from './project';

import NewProjectDialog from '../../dialogs/new-project';

import UploadQueueDialog from '../../dialogs/upload-queue';

import DeleteQueueDialog from '../../dialogs/delete-queue';

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
    const {ui, projects, files, project, uploadQueue, deleteQueue} = this.props;

    const {loading: projectsLoading} = projects;
    const {list: projectsList} = projects;
    const {loading: filesLoading} = files;

    const loading = projectsLoading || filesLoading;

    return (
      <div className="manager-page">
        <div className={`progress ${loading ? 'in-progress' : ''}`}>
          {loading &&
          <>
            <div className="bar bar1"/>
            <div className="bar bar2"/>
          </>
          }
        </div>
        <div className="header">
          <div className="logo">
            <img src={logo} alt="Logo"/>
          </div>
        </div>
        <div className="page-content">
          {(() => {

            if (projectsLoading) {
              return null;
            }

            // No projects
            if (projectsList.length === 0) {
              return (
                <div className="no-project">
                  <p className="message-header">
                    {_t('manager.no-project.message')}
                  </p>
                  <Button onClick={() => {
                    const {toggleUiProp} = this.props;
                    toggleUiProp('newProject');
                  }}>{_t('manager.no-project.button-label')}</Button>
                </div>
              )
            }

            // No selected project
            if (project === null) {
              return (
                <>
                  <SideMenu projects={projects} {...this.props} />
                  <div className="no-selected-project">
                    <p className="message-header">
                      {_t('manager.no-selected-project.message')}
                    </p>
                  </div>
                </>
              )
            }

            return <>
              <SideMenu projects={projects} {...this.props} />
              <Project {...this.props} />
            </>
          })()}
        </div>

        {ui.newProject && <NewProjectDialog {...this.props} onSave={this.newProjectCreated}/>}
        {uploadQueue.show && <UploadQueueDialog  {...this.props} />}
        {deleteQueue.show && <DeleteQueueDialog  {...this.props} />}
      </div>
    )
  }
}

ManagerPage.defaultProps = {
  project: null
};

ManagerPage.propTypes = {
  user: PropTypes.string.isRequired,
  ui: PropTypes.shape({
    newProject: PropTypes.bool.isRequired
  }).isRequired,
  uploadQueue: PropTypes.shape({
    show: PropTypes.bool.isRequired
  }).isRequired,
  deleteQueue: PropTypes.shape({
    show: PropTypes.bool.isRequired
  }).isRequired,
  projects: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(Object).isRequired
  }).isRequired,
  files: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired,
  project: PropTypes.instanceOf(Object),
  path: PropTypes.string.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  toggleUiProp: PropTypes.func.isRequired,
};

export default ManagerPage;