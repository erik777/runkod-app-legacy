import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import {userSession} from '../../blockstack-config';

class HomePage extends Component {

  signIn = (e) => {
    e.preventDefault();

    if (userSession.isUserSignedIn()) {
      const {history} = this.props;
      history.push('/app/editor');
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