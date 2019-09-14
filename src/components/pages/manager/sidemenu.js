/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {_t} from '../../../i18n';

import _c from '../../../utils/fix-class-names'

import {chevronBottomSvg, chevronRightSvg, plusSvg} from '../../../svg';

class SideMenu extends Component {
  headerClicked = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('sideProjectsVisible');
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
    const {projects, project, ui} = this.props;
    const {list} = projects;
    const collapsed = !ui.sideProjectsVisible;

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
            {collapsed ? chevronRightSvg : chevronBottomSvg} {_t('manager.side-menu.projects')}
          </div>
          {!collapsed &&
          <div className="menu-items">
            {
              list.map((i) => {
                const cls = _c(`menu-item ${project && project._id === i._id ? 'active' : ''}`);
                return <div className={cls} key={i._id} onClick={() => {
                  this.clicked(i);
                }}>{i.name}</div>
              })
            }
          </div>
          }
        </div>
      </div>
    </div>
  }
}

SideMenu.defaultProps = {};

SideMenu.propTypes = {
  projects: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired
  }).isRequired,
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }),
  ui: PropTypes.shape({
    sideProjectsVisible: PropTypes.bool.isRequired
  }).isRequired,
  selectProject: PropTypes.func.isRequired,
  fetchFiles: PropTypes.func.isRequired,
  toggleUiProp: PropTypes.func.isRequired
};

export default SideMenu;
