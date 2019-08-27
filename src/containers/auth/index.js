import React, {Component} from 'react';

import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import AuthPage from '../../components/pages/auth';

import {login} from '../../store/user';

class AuthContainer extends Component {
  render() {
    return <AuthPage {...this.props} />;
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer);