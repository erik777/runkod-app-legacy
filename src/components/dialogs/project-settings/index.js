import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button} from 'react-bootstrap';

import {_t} from '../../../i18n';

import {PROJECT_STATUS_ON, PROJECT_STATUS_MAINTENANCE, PROJECT_STATUS_OFF} from '../../../constants';

class StatusLabel extends Component {
  render() {
    const {status} = this.props;

    switch (status) {
      case PROJECT_STATUS_ON:
        return <span className="project-status status-on">{_t('project-status.on')}</span>;
      case PROJECT_STATUS_MAINTENANCE:
        return <span className="project-status status-maintenance">{_t('project-status.maintenance')}</span>;
      case PROJECT_STATUS_OFF:
        return <span className="project-status status-off">{_t('project-status.off')}</span>;
      default:
        return null;
    }
  }
}

StatusLabel.propTypes = {
  status: PropTypes.number.isRequired
};

class RedirectLabel extends Component {
  render() {
    const {to, projects} = this.props;

    if (!to) {
      return null;
    }

    const {list} = projects;
    const project = list.find(x => x._id === to);

    if (project) {
      return <span className="redirect-to">{project.name}</span>;
    }

    return null;
  }
}

RedirectLabel.propTypes = {
  to: PropTypes.string.isRequired,
  projects: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired
  }).isRequired
};

const defaultProps = {};
const propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    redirectTo: PropTypes.string.isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired
};

class DialogContent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  show = (what) => {
    const {toggleUiProp} = this.props;
    toggleUiProp('projectSettings');
    toggleUiProp(what);
  };

  render() {
    const {project} = this.props;

    return (
      <>
        <div className="setting-sections">
          <div className="setting-section">
            <div className="title">
              {_t('project-settings-dialog.status-label')} <StatusLabel status={project.status}/>
            </div>
            <div className="description">
              {_t('project-settings-dialog.status-description')}
            </div>
            <Button variant="outline-primary" size="sm" onClick={() => {
              this.show('projectStatus')
            }}>
              {_t('project-settings-dialog.status-btn-label')}
            </Button>
          </div>
          {/*
            <div className="setting-section">
              <div className="title">
                Authentication
              </div>
              <div className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <Button variant="primary" size="sm">Set Credentials</Button>
            </div>
          */}
          <div className="setting-section">
            <div className="title">
              {_t('project-settings-dialog.redirect-label')} <RedirectLabel to={project.redirectTo} {...this.props}/>
            </div>
            <div className="description">
              {_t('project-settings-dialog.redirect-description')}
            </div>
            <Button variant="outline-primary" size="sm" onClick={() => {
              this.show('projectRedirect')
            }}>
              {_t('project-settings-dialog.redirect-btn-label')}
            </Button>
          </div>
          <div className="setting-section">
            <div className="title">
              {_t('project-settings-dialog.delete-label')}
            </div>
            <div className="description">
              {_t('project-settings-dialog.delete-description')}
            </div>
            <Button variant="outline-danger" size="sm" onClick={() => {
              this.show('projectDelete')
            }}>
              {_t('project-settings-dialog.delete-btn-label')}
            </Button>
          </div>
        </div>
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
    return (
      <Modal size="lg" show className="project-settings-dialog" onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>{_t('project-settings-dialog.title')}</Modal.Title>
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
