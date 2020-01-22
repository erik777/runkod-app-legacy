/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {_t} from '../../../i18n';

import _c from '../../../utils/fix-class-names'

import {chevronBottomSvg, chevronRightSvg, plusSvg} from '../../../svg';


class MenuItem extends Component {
  clicked = (p) => {
    const {project, selectProject, fetchFiles} = this.props;

    if (project && p._id === project._id) {
      return;
    }

    selectProject(p);
    fetchFiles();
  };

  render() {
    const {projects, project, item} = this.props;
    const active = project && project._id === item._id;
    const redirected = item.redirectTo && projects.list.find(x => x._id === item.redirectTo);

    const cls = _c(`menu-item ${redirected ? 'redirected' : ''} ${active ? 'active' : ''}`);
    return <div className={cls} key={item._id} onClick={() => {
      this.clicked(item);
    }}>{item.name}</div>;
  }
}

MenuItem.defaultProps = {};

MenuItem.propTypes = {
  projects: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }),
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    redirectTo: PropTypes.string.isRequired
  }),
  selectProject: PropTypes.func.isRequired,
  fetchFiles: PropTypes.func.isRequired
};


class SideMenu extends Component {
  headerClicked = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('sideProjectsVisible');
  };

  render() {
    const {projects, ui} = this.props;
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
                // don't render redirected projects
                if (i.redirectTo && list.find(x => x._id === i.redirectTo)) {
                  return null;
                }

                const items = [];
                items.push(<MenuItem key={i._id} item={i} {...this.props}/>);

                const redirected = list.filter(x => x.redirectTo === i._id);
                items.push(...redirected.map(s => <MenuItem key={s._id} item={s} {...this.props}/>));

                return items;
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
        redirectTo: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  ui: PropTypes.shape({
    sideProjectsVisible: PropTypes.bool.isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired
};

export default SideMenu;
