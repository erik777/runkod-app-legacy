import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

import {fileDownloadSvg, fileArchiveSvg, fileUploadSvg} from '../../../svg';

import {_t} from '../../../i18n';

const defaultProps = {};
const propTypes = {
  onHide: PropTypes.func.isRequired
};

class DialogContent extends Component {
  render() {
    return <div className="user-select">
      <p className="description">{_t('example-project-dialog.description')}</p>
      <div className="steps">
        <div className="step">
          <div className="num">1</div>
          <div className="icon">{fileDownloadSvg}</div>
          <div className="text-content">
            <div className="content-title">{_t('example-project-dialog.step1-title')}</div>
            <a href="https://runkod.com/files/runkod-starter-dist.zip" target="_blank" rel="noopener noreferrer">{_t('example-project-dialog.step1-content')}</a>
          </div>
        </div>
        <div className="step">
          <div className="num">2</div>
          <div className="icon">{fileArchiveSvg}</div>
          <div className="text-content">
            <div className="content-title">{_t('example-project-dialog.step2-title')}</div>
            <span>{_t('example-project-dialog.step2-content')}</span>
          </div>
        </div>
        <div className="step">
          <div className="num">3</div>
          <div className="icon">{fileUploadSvg}</div>
          <div className="text-content">
            <div className="content-title">{_t('example-project-dialog.step3-title')}</div>
            <span>{_t('example-project-dialog.step3-content')}</span>
          </div>
        </div>
      </div>
    </div>
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class ExampleProjectDialog extends Component {
  hide = () => {
    const {onHide} = this.props;
    onHide();
  };

  render() {

    return (
      <Modal show className="example-project-dialog" onHide={this.hide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{_t('example-project-dialog.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DialogContent {...this.props} />
        </Modal.Body>
      </Modal>
    )
  }
}

ExampleProjectDialog.defaultProps = defaultProps;

ExampleProjectDialog.propTypes = propTypes;

export default ExampleProjectDialog;
