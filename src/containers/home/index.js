import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import {HomePage, FaqPage} from '../../components/pages/home';

import {login, logout} from '../../store/user';
import {toggleUiProp} from '../../store/ui';

class HomeContainer extends Component {
  render() {
    return <HomePage {...this.props} />;
  }
}

const mapStateToProps = ({user, ui}) => ({
  user,
  ui
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      logout,
      toggleUiProp
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