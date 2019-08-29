import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import ManagerPage from '../../components/pages/manager';

import {login} from '../../store/user';
import {fetchProjects} from '../../store/projects';

class ManagerContainer extends Component {
  render() {
    return <ManagerPage {...this.props} />;
  }
}

const mapStateToProps = ({user, projects}) => ({
  user,
  projects
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      fetchProjects
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerContainer)