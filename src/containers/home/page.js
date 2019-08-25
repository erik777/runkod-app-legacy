import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import {userSession} from '../../blockstack-config';


class HomePage extends Component {
  signIn = (e) => {
    e.preventDefault();

    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const {login, history} = this.props;

      if (userData.username) {
        login(userData.username);
        history.push('/manager');
        return;
      }
    }

    userSession.redirectToSignIn();
  };

  render() {
    const {login} = this.props;
    return (
      <p className="text-center" style={{padding: '20px'}}><Button onClick={this.signIn}>Sign In</Button></p>
    )
  }
}

HomePage.defaultProps = {};

HomePage.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};


export default HomePage;