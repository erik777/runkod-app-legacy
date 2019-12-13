import React, {Component} from 'react';

import {Route} from 'react-router-dom';

import PropTypes from 'prop-types';

import {HomePageContainer} from './home';

import AuthContainer from './auth';

import ManagerContainer from './manager';

import {userSession, getUsername} from '../blockstack-config';

import {login} from '../store/user';

class App extends Component {
  constructor(props) {
    super(props);

    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const {store} = this.props;

      let image;
      try {
        image = userData.profile.image[0].contentUrl
      } catch (e) {
        image = '';
      }

      store.dispatch(login(getUsername(), image));
    }
  }

  render() {
    return (
      <>
        <Route exact path="/" component={HomePageContainer}/>
        <Route exact path="/auth" component={AuthContainer}/>
        <Route exact path="/manager" component={ManagerContainer}/>
      </>
    );
  }
}

App.defaultProps = {};

App.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired
};


export default App;
