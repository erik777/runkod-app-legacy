import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, FormControl} from 'react-bootstrap';

import isEqual from 'react-fast-compare';

import to from 'await-to-js';

import {Project} from '../../../model';

import {_t} from '../../../i18n';

import message from '../../helper/message';

const defaultProps = {};
const propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  selectProject: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  toggleUiProp: PropTypes.func.isRequired
};

class DialogContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmName: '',
      inProgress: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState);
  }

  changed = (e) => {
    this.setState({confirmName: e.target.value});
  };

  delete = async () => {
    const {project, toggleUiProp, selectProject, fetchProjects} = this.props;

    this.setState({inProgress: true});

    // Find
    const [err1, pRecs] = await to(Project.fetchOwnList({_id: project._id}));
    if (err1) {
      this.setState({inProgress: false});
      message.error(_t('g.server-error'));
    }

    // Update
    const [pRec,] = pRecs;
    pRec.update({deleted: true});

    // Save
    const [err2,] = await to(pRec.save());

    this.setState({inProgress: false});

    if (err2) {
      message.error(_t('g.server-error'));
      return;
    }

    // Propagate
    toggleUiProp('projectDelete');
    selectProject(null);
    fetchProjects();

    // Feedback
    message.success(_t('project-delete-dialog.success'));
  };

  render() {
    const {project} = this.props;
    const {confirmName, inProgress} = this.state;
    const {name} = project;
    const confirmed = name === confirmName;

    return (
      <>
        <div className="delete-confirmation user-select">
          <p dangerouslySetInnerHTML={{__html: _t('project-delete-dialog.confirmation', {n: name})}}/>
          <p><FormControl autoComplete="off" onChange={this.changed} value={confirmName}/></p>
          <Button variant="danger" block disabled={!confirmed || inProgress} onClick={this.delete}>
            {_t('project-delete-dialog.delete')} {inProgress ? '...' : ''}
          </Button>
        </div>
      </>
    )
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class ProjectDeleteDialog extends Component {

  hide = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('projectDelete');
    toggleUiProp('projectSettings');
  };

  render() {
    return (
      <Modal show className="project-delete-dialog" onHide={this.hide} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{_t('project-delete-dialog.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DialogContent {...this.props} />
        </Modal.Body>
      </Modal>
    )
  }
}

ProjectDeleteDialog.defaultProps = defaultProps;

ProjectDeleteDialog.propTypes = propTypes;

export default ProjectDeleteDialog;
