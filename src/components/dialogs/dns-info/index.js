import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

import {_t} from '../../../i18n';

import dnsImg from '../../../images/dns-settings.png';

const defaultProps = {};
const propTypes = {
  toggleUiProp: PropTypes.func.isRequired
};

class DialogContent extends Component {
  render() {
    return <>
      <p>{_t('dns-info-dialog.line1')}</p>
      <p>{_t('dns-info-dialog.line2')}</p>
      <img src={dnsImg} className="sc-img" alt="Dns Settings"/>
      <p>{_t('dns-info-dialog.line3')}</p>
      <p className="text-muted">{_t('dns-info-dialog.line4')}</p>
    </>
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class DnsInfoDialog extends Component {
  hide = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('dnsInfo');
  };

  render() {
    return (
      <Modal show className="dns-info-dialog" onHide={this.hide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{_t('dns-info-dialog.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DialogContent {...this.props} />
        </Modal.Body>
      </Modal>
    )
  }
}

DnsInfoDialog.defaultProps = defaultProps;

DnsInfoDialog.propTypes = propTypes;

export default DnsInfoDialog;