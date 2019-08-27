import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import {Website} from '../../../model';

import {_t} from '../../../i18n';

class ManagerPage extends Component {

  fetchWebsites = async () => {
    const websites = await Website.fetchOwnList({sort: 'createdAt'});
    console.log(websites);
  };

  componentDidMount() {
    // this.fetchWebsites();
  }

  render() {
    return (
      <div className="manager-page">
        <div className="header"/>
        <div className="page-content">
          <div className="no-sites">
            <p className="message-header">
              {_t('manager.no-site.message')}
            </p>
            <Button>{_t('manager.no-site.button-label')}</Button>
          </div>
        </div>
      </div>
    )
  }
}

ManagerPage.defaultProps = {};

ManagerPage.propTypes = {
  user: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default ManagerPage;