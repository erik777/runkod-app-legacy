import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import {HomePage, FaqPage} from '../../components/pages/home';

import {login, logout} from '../../store/user';

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
      login,
      logout
    },
    dispatch
  );

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);

const FaqPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FaqPage);

export {HomePageContainer, FaqPageContainer}