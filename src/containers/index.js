import React, {Component} from 'react';

import {Route} from 'react-router-dom';

import HomeContainer from './home';
import AuthContainer from './auth';

export default class App extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={HomeContainer}/>
        <Route exact path="/auth" component={AuthContainer}/>
      </>
    );
  }
}