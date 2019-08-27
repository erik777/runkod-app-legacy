/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import {User} from 'radiks';

import PropTypes from 'prop-types';

import {userSession} from '../../../blockstack-config';

class AuthPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  doAuth = async () => {
    const {history} = this.props;

    if (userSession.isSignInPending()) {
      let userData;
      try {
        userData = await userSession.handlePendingSignIn();
        await User.createWithCurrentUser();
      } catch (e) {
        this.setState(({error: true}));
        return;
      }

      if (userData && userData.username) {
        const {login} = this.props;
        login(userData.username);
        history.push('/manager');
        return;
      }

      this.setState(({error: true}));
    }
  };

  componentDidMount() {
    this.doAuth().then();
  }

  signIn = (e) => {
    e.preventDefault();
    userSession.redirectToSignIn();
  };

  render() {
    const {error} = this.state;

    if (error) {
      return <div className="auth-error">
        <p>Sorry :(</p>
        <p>An error has occurred while signing in.</p>
        <p>Please <a href="#" onClick={this.signIn}><strong>click here</strong></a> to try again.</p>
      </div>;
    }

    return null;
  }
}


AuthPage.defaultProps = {};

AuthPage.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};


export default AuthPage;
