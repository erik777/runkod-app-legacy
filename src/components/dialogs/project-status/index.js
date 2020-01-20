import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import isEqual from 'react-fast-compare';

import to from 'await-to-js';

import {Project} from '../../../model';

import {_t} from '../../../i18n';

import message from '../../helper/message';

import {PROJECT_STATUS_ON, PROJECT_STATUS_MAINTENANCE, PROJECT_STATUS_OFF} from '../../../constants';

const defaultProps = {};
const propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired
  }).isRequired,
  setProjectStatus: PropTypes.func.isRequired,
  toggleUiProp: PropTypes.func.isRequired
};

class DialogContent extends Component {

  constructor(props) {
    super(props);

    const {project} = this.props;

    this.state = {
      status: project.status,
      saving: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState);
  }

  changed = (e) => {
    this.setState({status: parseInt(e.target.value, 10)});
  };

  save = async () => {
    const {project, setProjectStatus} = this.props;
    const {status} = this.state;

    this.setState({saving: true});

    // Find
    const [err1, pRecs] = await to(Project.fetchOwnList({_id: project._id}));
    if (err1) {
      this.setState({saving: false});
      message.error(_t('g.server-error'));
    }

    // Update
    const [pRec,] = pRecs;
    pRec.update({status});

    // Save
    const [err2,] = await to(pRec.save());

    this.setState({saving: false});

    if (err2) {
      message.error(_t('g.server-error'));
      return;
    }

    // Propagate
    setProjectStatus(status);

    // Feedback
    message.success(_t('project-status-dialog.success'));

    this.back();
  };

  back = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('projectStatus');
    toggleUiProp('projectSettings');
  };

  render() {
    const {project} = this.props;
    const {status, saving} = this.state;
    const changed = project.status !== status;

    return (
      <>
        <Form.Control as="select" onChange={this.changed} value={status}>
          <option value={PROJECT_STATUS_ON}>{_t('project-status.on')}</option>
          <option value={PROJECT_STATUS_MAINTENANCE}>{_t('project-status.maintenance')}</option>
          <option value={PROJECT_STATUS_OFF}>{_t('project-status.off')}</option>
        </Form.Control>
        <div className="dialog-controls">
          <Button variant="primary" disabled={!changed || saving} onClick={this.save}>
            {_t('g.save')} {saving && '..'}
          </Button>
        </div>
      </>
    )
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class ProjectStatusDialog extends Component {

  hide = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('projectStatus');
    toggleUiProp('projectSettings');
  };

  render() {
    return (
      <Modal show className="project-status-dialog" onHide={this.hide} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{_t('project-status-dialog.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DialogContent {...this.props} />
        </Modal.Body>
      </Modal>
    )
  }
}

ProjectStatusDialog.defaultProps = defaultProps;

ProjectStatusDialog.propTypes = propTypes;

export default ProjectStatusDialog;
