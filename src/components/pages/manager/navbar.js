/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import ContactDialog from '../../dialogs/contact';

import {_t} from '../../../i18n';

import logo from '../../../images/logo-white.png';

import {emailSvg, logOutSvg} from '../../../svg';

import {userSession} from '../../../blockstack-config';

import _c from '../../../utils/fix-class-names'

class NavBar extends Component {
  logoClicked = () => {
    const {selectProject, history} = this.props;
    selectProject(null);
    history.push('/');
  };

  helpClicked = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('contact');
  };

  logout = () => {
    const {logout, history} = this.props;
    userSession.signUserOut();
    logout();
    history.push('/');
  };

  render() {
    const {user, files, projects, ui} = this.props;
    const fLetter = user.username.split('')[0].toUpperCase();

    const {loading: projectsLoading} = projects;
    const {loading: filesLoading} = files;

    const loading = projectsLoading || filesLoading;

    return (
      <div className={_c(`nav-bar ${loading ? 'loading' : ''}`)}>
        <div className="brand" onClick={this.logoClicked}>
          <img src={logo} alt="Logo" className="logo"/> beta
        </div>
        <div className="user-menu">
          <div className="user-image"
               style={user.image ? {backgroundImage: `url('${user.image}')`} : {}}>{!user.image ? fLetter : ''}</div>
          <div className="menu-list">
            <span className="username">{'@'}{user.username}</span>
            <a className="menu-list-item" onClick={this.helpClicked}>
              {_t('manager.nav-bar.contact')} {emailSvg}
            </a>
            <a className="menu-list-item" onClick={this.logout}>
              {_t('manager.nav-bar.sign-out')} {logOutSvg}
            </a>
          </div>
        </div>
        {ui.contact && <ContactDialog {...this.props} />}
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
  projects: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  files: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired,
  ui: PropTypes.shape({
    contact: PropTypes.bool.isRequired
  }),
  toggleUiProp: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default NavBar;
