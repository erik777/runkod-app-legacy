import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form, Row, Col} from 'react-bootstrap';

import to from 'await-to-js';

import {Project} from '../../../model';

import {_t} from '../../../i18n';

import message from '../../helper/message'

import {PROJECT_STATUS_ON, PROJECT_STATUS_MAINTENANCE, PROJECT_STATUS_OFF} from '../../../constants';

const defaultProps = {};
const propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
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

  statusChanged = (e) => {
    this.setState({status: parseInt(e.target.value, 10)});
  };

  saveStatus = async () => {
    const {project, setProjectStatus} = this.props;
    const {status} = this.state;

    this.setState({saving: true});

    const [err1, pRecs] = await to(Project.fetchList({_id: project._id}));

    if (err1) {
      message.error(_t('g.server-error'));
      this.setState({saving: false});
      return;
    }

    const [pRec,] = pRecs;

    pRec.update({status});

    const [err2,] = await to(pRec.save());

    this.setState({saving: false});

    if (err2) {
      message.error(_t('g.server-error'));
      return;
    }

    setProjectStatus(status);

    message.success(_t('project-settings-dialog.success'));
  };

  render() {
    const {project} = this.props;
    const {status, saving} = this.state;

    const showSave = project.status !== status;

    return (
      <>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="4">
              {_t('project-settings-dialog.status')}
            </Form.Label>
            <Col sm={showSave ? '6' : '8'}>
              <Form.Control as="select" onChange={this.statusChanged} value={status}>
                <option value={PROJECT_STATUS_ON}>{_t('project-settings-dialog.status-on')}</option>
                <option value={PROJECT_STATUS_MAINTENANCE}>{_t('project-settings-dialog.status-maintenance')}</option>
                <option value={PROJECT_STATUS_OFF}>{_t('project-settings-dialog.status-off')}</option>
              </Form.Control>
            </Col>
            {showSave &&
            <Col sm="2">
              <Button disabled={saving} onClick={this.saveStatus}>{_t('g.save')}</Button>
            </Col>
            }
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="4">
              {_t('project-settings-dialog.auth')}
            </Form.Label>
            <Col sm="8" className="d-flex align-items-center">
              <span className="text-primary font-weight-light">{_t('project-settings-dialog.coming-soon')}</span>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="4">
              {_t('project-settings-dialog.dir-list')}
            </Form.Label>
            <Col sm="8" className="d-flex align-items-center">
              <span className="text-primary font-weight-light">{_t('project-settings-dialog.coming-soon')}</span>
            </Col>
          </Form.Group>
        </Form>
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
          <Modal.Title>{project.name}</Modal.Title>
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