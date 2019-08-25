// @flow

import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import {userSession} from '../../blockstack-config';

type Props = {
  history: {
    push(path: string): void,
  }
};
type State = {};

class HomePage extends Component <Props, State> {

  signIn = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (userSession.isUserSignedIn()) {
      const {history} = this.props;
      console.log(history.push('/manager'));
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

export default HomePage;