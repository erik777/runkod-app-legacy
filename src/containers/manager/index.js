import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import ManagerPage from '../../components/pages/manager';

import {login} from '../../store/user';
import {toggleUiProp} from '../../store/ui';
import {fetchProjects} from '../../store/projects';
import {selectProject} from '../../store/project';
import {fetchFiles} from '../../store/files';
import {selectPath} from '../../store/path';
import {setUploadQueue, startUploadQueue, setUploadQueueConflictFlag, resetUploadQueue} from '../../store/upload-queue';

class ManagerContainer extends Component {
  render() {
    return <ManagerPage {...this.props} />;
  }
}

const mapStateToProps = ({user, ui, projects, project, path, files, uploadQueue}) => ({
  user,
  ui,
  projects,
  project,
  path,
  files,
  uploadQueue
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      toggleUiProp,
      fetchProjects,
      selectProject,
      fetchFiles,
      selectPath,
      setUploadQueue,
      startUploadQueue,
      setUploadQueueConflictFlag,
      resetUploadQueue
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerContainer)