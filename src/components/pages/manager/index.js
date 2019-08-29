import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import {_t} from '../../../i18n';

import NewProjectDialog from '../../dialogs/new-project';

class ProjectList extends Component {


  render() {
    const {projects} = this.props;
    const {list} = projects;

    return <div className="project-list">
      {
        list.map((i) => (
          <div className="project-list-item" key={i._id}>{i.name}</div>
        ))
      }
    </div>
  }
}

ProjectList.defaultProps = {};

ProjectList.propTypes = {
  projects: PropTypes.instanceOf(Object).isRequired
};


class ManagerPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newDialog: false
    };

    const {fetchProjects} = this.props;
    fetchProjects();
  }

  showNewProjectDialog = () => {
    this.setState({newDialog: true});
  };

  hideNewProjectDialog = () => {
    this.setState({newDialog: false});
  };

  render() {
    const {newDialog} = this.state;
    const {projects} = this.props;
    const {loading} = projects;
    const {list} = projects;

    return (
      <div className="manager-page">
        <div className="header"/>
        <div className="page-content">

          {(!loading && list.length === 0) &&
          <div className="no-project">
            <p className="message-header">
              {_t('manager.no-project.message')}
            </p>
            <Button onClick={this.showNewProjectDialog}>{_t('manager.no-project.button-label')}</Button>
          </div>
          }

          {(!loading && list.length > 0) &&
          <ProjectList projects={projects} {...this.props} />
          }

        </div>
        {newDialog &&
        <NewProjectDialog {...this.props} onHide={this.hideNewProjectDialog} onSave={this.hideNewProjectDialog}/>}
      </div>
    )
  }
}

ManagerPage.defaultProps = {};

ManagerPage.propTypes = {
  user: PropTypes.string.isRequired,
  projects: PropTypes.instanceOf(Object).isRequired,
  fetchProjects: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default ManagerPage;