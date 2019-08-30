import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import {_t} from '../../../i18n';

import {plusSvg, chevronBottomSvg, chevronRightSvg} from '../../../svg';

import NewProjectDialog from '../../dialogs/new-project';

class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    }
  }

  headerClicked = () => {
    const {collapsed} = this.state;
    this.setState({collapsed: !collapsed});
  };

  clicked = (project) => {
    const {selectProject} = this.props;
    selectProject(project);
  };

  render() {
    const {collapsed} = this.state;
    const {projects} = this.props;
    const {list, selected} = projects;


    return <div className="side-menu">

      <div className="menu-toolbar">
        <a className="btn-new-project" onClick={this.showNewProjectDialog}>
          {plusSvg} New Project
        </a>
      </div>

      <div className="menu-list">
        <div className="menu-list-header" onClick={this.headerClicked}>
          {collapsed ? chevronRightSvg : chevronBottomSvg} Projects
        </div>

        <div className={`menu-items ${collapsed ? 'collapsed' : ''}`}>
          {
            list.map((i) => {
              const cls = `menu-item ${selected && selected._id === i._id ? 'active' : ''}`;

              return <div className={cls} key={i._id} onClick={() => {
                this.clicked(i);
              }}>{i.name}</div>
            })
          }
        </div>
      </div>
    </div>
  }
}

SideMenu.defaultProps = {};

SideMenu.propTypes = {
  projects: PropTypes.instanceOf(Object).isRequired,
  selectProject: PropTypes.func.isRequired
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

  newProjectCreated = () => {
    const {fetchProjects} = this.props;
    fetchProjects();
  };

  render() {
    const {newDialog} = this.state;
    const {projects} = this.props;
    const {loading} = projects;
    const {list, selected} = projects;

    return (
      <div className="manager-page">
        <div className="header">
          <span/>

        </div>
        <div className="page-content">


          { /* Projects loaded. But empty. */}
          {(!loading && list.length === 0) &&
          <div className="no-project">
            <p className="message-header">
              {_t('manager.no-project.message')}
            </p>
            <Button onClick={this.showNewProjectDialog}>{_t('manager.no-project.button-label')}</Button>
          </div>
          }

          { /* Projects loaded. Not empty. But not selected. */}
          {(!loading && list.length > 0 && selected === null) &&
          <div className="no-selected-project">
            <p className="message-header">
              {_t('manager.no-selected-project.message')}
            </p>
          </div>
          }

          {/* Projects loaded. List not empty. Show side project bar. */}
          {(!loading && list.length > 0) &&
          <SideMenu projects={projects} {...this.props} />
          }

        </div>
        {newDialog &&
        <NewProjectDialog {...this.props} onHide={this.hideNewProjectDialog} onSave={this.newProjectCreated}/>}
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