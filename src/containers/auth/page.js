// @flow

import {Component} from 'react';

import {userSession} from '../../blockstack-config';

type Props = {
  user: string,
  login(username: string): void,
  history: {
    push(path: string): void,
  }
};

class AuthPage extends Component<Props> {
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

export default AuthPage;
