import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form, Row, Col} from 'react-bootstrap';

import to from 'await-to-js';

import {Project} from '../../../model';

import ConfirmDialog from '../confirm';

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
  selectProject: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  setProjectStatus: PropTypes.func.isRequired,
  toggleUiProp: PropTypes.func.isRequired
};

class DialogContent extends Component {

  constructor(props) {
    super(props);

    const {project} = this.props;

    this.state = {
      status: project.status,
      saving: false,
      deleting: false
    }
  }

  statusChanged = (e) => {
    this.setState({status: parseInt(e.target.value, 10)});
  };

  updateProject = (data) => {
    return new Promise(async (resolve, reject) => {
      const {project} = this.props;
      const [err1, pRecs] = await to(Project.fetchList({_id: project._id}));

      if (err1) {
        reject();
      }

      const [pRec,] = pRecs;

      pRec.update(data);

      const [err2,] = await to(pRec.save());

      this.setState({saving: false});

      if (err2) {
        reject();
      }

      resolve();
    });
  };

  saveStatus = async () => {
    const {setProjectStatus} = this.props;
    const {status} = this.state;

    this.setState({saving: true});
    const [err,] = await to(this.updateProject({status}));
    this.setState({saving: false});

    if (err) {
      message.error(_t('g.server-error'));
    } else {
      setProjectStatus(status);
      message.success(_t('project-settings-dialog.success'));
    }
  };

  delete = async () => {
    const {toggleUiProp, selectProject, fetchProjects} = this.props;

    this.setState({deleting: true});
    const [err,] = await to(this.updateProject({deleted: true}));
    this.setState({deleting: false});

    if (err) {
      message.error(_t('g.server-error'));
    } else {
      toggleUiProp('projectSettings');
      selectProject(null);
      fetchProjects();
      message.success(_t('project-settings-dialog.deleted'));
    }
  };

  render() {
    const {project} = this.props;
    const {status, saving, deleting} = this.state;
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
          <Form.Group as={Row} style={{marginBottom: 0}}>
            <div className="form-label col-form-label col-sm-12">
              <ConfirmDialog onConfirm={this.delete} title={_t('project-settings-dialog.delete-message')}>
                <Button variant="danger" disabled={deleting}>{_t('project-settings-dialog.delete')}</Button>
              </ConfirmDialog>
            </div>
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