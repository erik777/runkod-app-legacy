import React, {Component} from 'react';

import {Route} from 'react-router-dom';

import PropTypes from 'prop-types';

import {HomePageContainer} from './home';
import AuthContainer from './auth';
import ManagerContainer from './manager'

import {userSession} from '../blockstack-config';

import {login} from '../store/user';

class App extends Component {
  constructor(props) {
    super(props);

    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const {store} = this.props;

      if (userData.username) {

        let image;
        try {
          image = userData.profile.image[0].contentUrl
        } catch (e) {
          image = '';
        }

        store.dispatch(login(userData.username, image));
      }
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