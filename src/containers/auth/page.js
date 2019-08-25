import {Component} from 'react';

import PropTypes from 'prop-types';

import {userSession} from '../../blockstack-config';

class AuthPage extends Component {
  componentDidMount() {
    const {user, history} = this.props;

    if (user) {
      history.push('/manager');
      return;
    }

    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn()
        .then(userData => {
          const {login} = this.props;
          const {username} = userData;

          login(username);
          history.push('/manager');
        });
    }
  }

  render() {
    return null;
  }
}


AuthPage.defaultProps = {
  user: null,
};

AuthPage.propTypes = {
  user: PropTypes.string,
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};


export default AuthPage;
