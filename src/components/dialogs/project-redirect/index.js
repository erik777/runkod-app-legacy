import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import isEqual from 'react-fast-compare';

import to from 'await-to-js';

import {Project} from '../../../model';

import {_t} from '../../../i18n';

import message from '../../helper/message';

const defaultProps = {};
const propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    redirectTo: PropTypes.string.isRequired
  }).isRequired,
  projects: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired
  }).isRequired,
  setProjectRedirect: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  toggleUiProp: PropTypes.func.isRequired
};

class DialogContent extends Component {

  constructor(props) {
    super(props);

    const {project} = this.props;

    this.state = {
      selected: project.redirectTo,
      inProgress: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState);
  }

  changed = (e) => {
    this.setState({selected: e.target.value});
  };

  save = async () => {
    const {project, setProjectRedirect, fetchProjects} = this.props;
    const {selected} = this.state;

    this.setState({inProgress: true});

    // Make sure selected project doesn't redirect to another project
    if (selected) {
      const [err0, rRecs] = await to(Project.fetchOwnList({_id: selected}));
      if (err0) {
        this.setState({inProgress: false});
        message.error(_t('g.server-error'));
      }

      const [rRec,] = rRecs;
      if (rRec.attrs.redirectTo) {
        message.error(_t('project-redirect-dialog.error-selected-redirects'));
        this.setState({inProgress: false});
        return;
      }
    }

    // Find
    const [err1, pRecs] = await to(Project.fetchOwnList({_id: project._id}));
    if (err1) {
      this.setState({inProgress: false});
      message.error(_t('g.server-error'));
    }

    // Update
    const [pRec,] = pRecs;
    pRec.update({redirectTo: selected});

    // Save
    const [err2,] = await to(pRec.save());

    this.setState({saving: false});

    if (err2) {
      message.error(_t('g.server-error'));
      return;
    }

    // Propagate
    setProjectRedirect(selected);
    fetchProjects();

    // Feedback
    message.success(_t('project-redirect-dialog.success'));

    this.back();
  };


  back = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('projectRedirect');
    toggleUiProp('projectSettings');
  };

  render() {
    const {project, projects} = this.props;
    const {list} = projects;

    const {selected, inProgress} = this.state;
    const changed = project.redirectTo !== selected;

    const projectList = list.filter(x => x._id !== project._id);

    if (projectList.length === 0) {
      return 'There is no project to redirect'
    }

    return (
      <>
        <Form.Control as="select" onChange={this.changed} value={selected}>
          <option value="">{_t('project-redirect-dialog.empty-item')}</option>
          {projectList.map(x => {
            return <option key={x._id} value={x._id}>{x.name}</option>
          })}
        </Form.Control>
        <div className="dialog-controls">
          <Button variant="primary" disabled={!changed || inProgress} onClick={this.save}>
            {_t('g.save')} {inProgress && '..'}
          </Button>
        </div>
      </>
    )
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class ProjectRedirectDialog extends Component {

  hide = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('projectRedirect');
    toggleUiProp('projectSettings');
  };

  render() {
    return (
      <Modal show className="project-redirect-dialog" onHide={this.hide} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{_t('project-redirect-dialog.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DialogContent {...this.props} />
        </Modal.Body>
      </Modal>
    )
  }
}

ProjectRedirectDialog.defaultProps = defaultProps;

ProjectRedirectDialog.propTypes = propTypes;

export default ProjectRedirectDialog;
