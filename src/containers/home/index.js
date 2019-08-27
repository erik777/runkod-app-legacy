import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import HomePage from '../../components/pages/home';

import {login} from '../../store/user';

class HomeContainer extends Component {
  render() {
    return <HomePage {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user
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
)(HomeContainer)