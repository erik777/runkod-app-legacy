/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import {_t} from '../../../i18n';

import NavBar from './navbar';

import NotifyBar from './notifybar';

import SideMenu from './sidemenu';

import Project from './project';

import NewProjectDialog from '../../dialogs/new-project';

import UploadQueueDialog from '../../dialogs/upload-queue';

import DeleteQueueDialog from '../../dialogs/delete-queue';

import placeholderFiles from '../../../helper/placeholder-files';

class ManagerPage extends Component {

  constructor(props) {
    super(props);

    const {fetchProjects} = this.props;
    fetchProjects();
  }

  componentDidMount() {
    const {user, history} = this.props;
    if (user === null) {
      history.push('/');
      return null;
    }

    // Manager page is not responsive. Remove viewport element.
    const v = document.querySelector('#viewport');
    if (v) {
      v.parentNode.removeChild(v);
    }
  }

  newProjectCreated = async (isNew) => {
    const {fetchProjects, selectProject} = this.props;
    await fetchProjects().then(() => {
      // Pick first (new) project after project list refreshed
      const {projects} = this.props;
      const [project,] = projects.list;
      selectProject(project);
    });

    if (isNew) {
      // Upload placeholder files for new projects
      const {setUploadQueue, startUploadQueue} = this.props;
      const files = await placeholderFiles();

      setUploadQueue(files);
      startUploadQueue();
    }
  };

  render() {
    const {ui, projects, project, uploadQueue, deleteQueue, user} = this.props;

    if (user === null) {
      return null;
    }

    const {loading: projectsLoading} = projects;
    const {list: projectsList} = projects;

    return (
      <div className="manager-page">
        <NavBar {...this.props} />

        {(() => {

          if (projectsLoading) {
            return null;
          }

          // No project
          if (projectsList.length === 0) {

            // Show welcome screen for 10 minutes to new users
            if (ui.frFlag && user.createdAt + (60000 * 10) >= Date.now()) {
              return (
                <div className="page-content">
                  <div className="no-project welcome">
                    <p className="message-header">
                      {_t('manager.welcome.message')}
                    </p>
                    <p className="sub-message-header">{_t('manager.welcome.sub-message')}</p>
                    <p dangerouslySetInnerHTML={{__html: _t('manager.welcome.text-content')}}/>
                    <Button onClick={() => {
                      const {toggleUiProp} = this.props;
                      toggleUiProp('newProject');
                    }}>{_t('manager.welcome.button-label')}</Button>
                  </div>
                </div>
              )
            }

            return (
              <div className="page-content">
                <div className="no-project">
                  <p className="message-header">
                    {_t('manager.no-project.message')}
                  </p>
                  <Button onClick={() => {
                    const {toggleUiProp} = this.props;
                    toggleUiProp('newProject');
                  }}>{_t('manager.no-project.button-label')}</Button>
                </div>
              </div>
            )
          }

          // No selected project
          if (project === null) {
            return (
              <>
                <NotifyBar {...this.props} />
                <div className="page-content">
                  <SideMenu projects={projects} {...this.props} />
                  <div className="no-selected-project">
                    <p className="message-header">
                      {_t('manager.no-selected-project.message')}
                    </p>
                  </div>
                </div>
              </>
            )
          }

          return (<>
              <NotifyBar {...this.props} />
              <div className="page-content">
                <SideMenu projects={projects} {...this.props} />
                <Project {...this.props} />
              </div>
            </>
          )
        })()}

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
  ui: PropTypes.shape({
    newProject: PropTypes.bool.isRequired,
    frFlag: PropTypes.bool.isRequired,
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
  user: PropTypes.shape({
    createdAt: PropTypes.number.isRequired
  }),
  project: PropTypes.instanceOf(Object),
  toggleUiProp: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  setUploadQueue: PropTypes.func.isRequired,
  startUploadQueue: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default ManagerPage;
