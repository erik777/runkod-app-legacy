/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {_t} from '../../../i18n';

import logo from '../../../images/logo-rect-white.png';

import {helpSvg, logOutSvg} from '../../../svg';

import {userSession} from '../../../blockstack-config';

class NavBar extends Component {
  logoClicked = () => {
    const {selectProject} = this.props;
    selectProject(null);
  };

  helpClicked = () => {
    console.log("Help")
  };

  logout = () => {
    const {logout, history} = this.props;
    userSession.signUserOut();
    logout();
    history.push('/');
  };

  render() {
    const {user} = this.props;
    const fLetter = user.username.split('')[0].toUpperCase();

    return (
      <div className="nav-bar">
        <div className="logo" onClick={this.logoClicked}>
          <img src={logo} alt="Logo"/>
        </div>
        <div className="user-menu">
          <div className="user-image"
               style={user.image ? {backgroundImage: `url('${user.image}')`} : {}}>{!user.image ? fLetter : ''}</div>
          <div className="menu-list">
            <span className="username">{'@'}{user.username}</span>
            <a className="menu-list-item" onClick={this.helpClicked}>
              {_t('manager.nav-bar.help')} {helpSvg}
            </a>
            <a className="menu-list-item" onClick={this.logout}>
              {_t('manager.nav-bar.sign-out')} {logOutSvg}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

NavBar.defaultProps = {};

NavBar.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }),
  logout: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default NavBar;