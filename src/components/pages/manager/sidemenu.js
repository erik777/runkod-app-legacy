/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {_t} from '../../../i18n';

import {chevronBottomSvg, chevronRightSvg, plusSvg} from '../../../svg';

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

  clicked = (p) => {
    const {project, selectProject, fetchFiles} = this.props;

    if (project && p._id === project._id) {
      return;
    }

    selectProject(p);
    fetchFiles();
  };

  render() {
    const {collapsed} = this.state;
    const {projects, project} = this.props;
    const {list} = projects;

    return <div className="side-menu">

      <div className="menu-toolbar">
        <a className="btn-new-project" onClick={() => {
          const {toggleUiProp} = this.props;
          toggleUiProp('newProject');
        }}>
          {plusSvg} {_t('manager.side-menu.new-project')}
        </a>
      </div>

      <div className="menu-content">
        <div className="menu-list">
          <div className="menu-list-header" onClick={this.headerClicked}>
            {collapsed ? chevronRightSvg : chevronBottomSvg} Projects
          </div>

          <div className={`menu-items ${collapsed ? 'collapsed' : ''}`}>
            {
              list.map((i) => {
                const cls = `menu-item ${project && project._id === i._id ? 'active' : ''}`;

                return <div className={cls} key={i._id} onClick={() => {
                  this.clicked(i);
                }}>{i.name}</div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  }
}

SideMenu.defaultProps = {};

SideMenu.propTypes = {
  toggleUiProp: PropTypes.func.isRequired,
  projects: PropTypes.instanceOf(Object).isRequired,
  project: PropTypes.instanceOf(Object),
  selectProject: PropTypes.func.isRequired,
  fetchFiles: PropTypes.func.isRequired
};

export default SideMenu;
