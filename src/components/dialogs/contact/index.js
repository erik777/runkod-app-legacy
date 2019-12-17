import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

import {_t} from '../../../i18n';

import {
  discordSvg,
  telegramSvg,
  slackSvg,
  emailSvg,
} from '../../../svg';

const defaultProps = {};
const propTypes = {
  toggleUiProp: PropTypes.func.isRequired
};

class DialogContent extends Component {
  render() {
    return <>
      <div className="buttons">
        <div className="button">
          <a href="mailto:hello@runkod.com" title="Email">
            {emailSvg}
          </a>
          <span>email</span>
        </div>
        <div className="button">
          <a href="https://runkod.slack.com" title="Slack" target="_blank"
             rel="noopener noreferrer">
            {slackSvg}
          </a>
          <span>slack</span>
        </div>
        <div className="button">
          <a href="https://discord.gg/Qk57NDS" title="Discord" target="_blank"
             rel="noopener noreferrer">
            {discordSvg}
          </a>
          <span>discord</span>
        </div>
        <div className="button">
          <a href="https://t.me/joinchat/AYcx-xLSlNfCqUNFKEExsQ" title="Telegram" target="_blank"
             rel="noopener noreferrer">
            {telegramSvg}
          </a>
          <span>telegram</span>
        </div>
      </div>
    </>
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class ContactDialog extends Component {

  hide = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('contact');
  };

  render() {
    return (
      <Modal show className="contact-dialog" onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>{_t('contact-dialog.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DialogContent {...this.props} />
        </Modal.Body>
      </Modal>
    )
  }
}

ContactDialog.defaultProps = defaultProps;

ContactDialog.propTypes = propTypes;

export default ContactDialog;
