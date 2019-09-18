import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, ProgressBar} from 'react-bootstrap';

import {_t} from '../../../i18n';


const defaultProps = {};
const propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired
};

class DialogContent extends Component {
  render() {
    return (
      <>
        Hello
      </>
    )
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class ProjectSettingsDialog extends Component {

  hide = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('projectSettings');
  };

  render() {

    const {project} = this.props;

    return (
      <Modal show className="project-settings-dialog" onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>{_t('project-settings-dialog.title', {n: project.name})}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DialogContent {...this.props} />
        </Modal.Body>
      </Modal>
    )
  }
}

ProjectSettingsDialog.defaultProps = defaultProps;

ProjectSettingsDialog.propTypes = propTypes;

export default ProjectSettingsDialog;