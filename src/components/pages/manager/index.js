import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import {_t} from '../../../i18n';

import SiteCreateDialog from '../../dialogs/site-create';

class ManagerPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      createDialog: false
    }
  }

  showCreateDialog = () => {
    this.setState({createDialog: true});
  };

  hideCreateDialog = () => {
    this.setState({createDialog: false});
  };

  render() {

    const {createDialog} = this.state;

    return (
      <div className="manager-page">
        <div className="header"/>
        <div className="page-content">
          <div className="no-sites">
            <p className="message-header">
              {_t('manager.no-site.message')}
            </p>
            <Button onClick={this.showCreateDialog}>{_t('manager.no-site.button-label')}</Button>
          </div>
        </div>
        {createDialog && <SiteCreateDialog {...this.props} onHide={this.hideCreateDialog}/>}
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