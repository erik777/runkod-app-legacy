import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import ManagerPage from '../../components/pages/manager';

import {login} from '../../store/user';
import {fetchProjects} from '../../store/projects';
import {selectProject} from '../../store/project';
import {fetchFiles} from '../../store/files';
import {setQueue, startQueue} from '../../store/queue';

class ManagerContainer extends Component {
  render() {
    return <ManagerPage {...this.props} />;
  }
}

const mapStateToProps = ({user, projects, project, path, files, queue}) => ({
  user,
  projects,
  project,
  path,
  files,
  queue
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      fetchProjects,
      selectProject,
      fetchFiles,
      setQueue,
      startQueue
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerContainer)