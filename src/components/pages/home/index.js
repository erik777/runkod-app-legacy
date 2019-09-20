import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import {userSession} from '../../../blockstack-config';

class HomePage extends Component {
  signIn = (e) => {
    e.preventDefault();

    const {user} = this.props;

    if (userSession.isUserSignedIn() && user !== null) {
      const {history} = this.props;
      history.push('/manager');
      return;
    }

    userSession.redirectToSignIn();
  };

  render() {
    return (
      <p className="text-center" style={{padding: '20px'}}><Button onClick={this.signIn}>Sign In</Button></p>
    )
  }
}

HomePage.defaultProps = {};

HomePage.propTypes = {
  user: PropTypes.shape({}),
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};


export default HomePage;