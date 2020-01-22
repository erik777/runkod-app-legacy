import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import ManagerPage from '../../components/pages/manager';

import {login, logout} from '../../store/user';
import {toggleUiProp, invalidateUiFlag} from '../../store/ui';
import {fetchProjects} from '../../store/projects';
import {selectProject, setProjectStatus, setProjectRedirect} from '../../store/project';
import {fetchFiles} from '../../store/files';
import {selectPath} from '../../store/path';
import {setUploadQueue, startUploadQueue, setUploadQueueConflictFlag, resetUploadQueue} from '../../store/upload-queue';
import {checkListAdd, checkListDelete, checkListReset} from '../../store/check-list';
import {setDeleteQueue, startDeleteQueue, resetDeleteQueue} from '../../store/delete-queue';


class ManagerContainer extends Component {
  render() {
    return <ManagerPage {...this.props} />;
  }
}

const mapStateToProps = ({user, ui, projects, project, path, files, uploadQueue, deleteQueue, checkList}) => ({
  user,
  ui,
  projects,
  project,
  path,
  files,
  uploadQueue,
  deleteQueue,
  checkList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      logout,
      toggleUiProp,
      invalidateUiFlag,
      fetchProjects,
      selectProject,
      setProjectStatus,
      setProjectRedirect,
      fetchFiles,
      selectPath,
      setUploadQueue,
      startUploadQueue,
      setUploadQueueConflictFlag,
      resetUploadQueue,
      checkListAdd,
      checkListDelete,
      setDeleteQueue,
      startDeleteQueue,
      resetDeleteQueue,
      checkListReset
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerContainer)
