import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {_t} from '../../../i18n';

import CheckBox from '../../helper/checkbox';

import Browser from './browser';

import ProjectSettingsDialog from '../../dialogs/project-settings';
import ProjectStatusDialog from '../../dialogs/project-status';
import ProjectDeleteDialog from '../../dialogs/project-delete';

import fs from '../../../core-utils/fs';

import _c from '../../../utils/fix-class-names';

import {refreshSvg, deleteSvg, settingsSvg, openSvg} from '../../../svg';

class Project extends Component {

  checked = (checked) => {
    const {files, path, checkListAdd, checkListReset} = this.props;
    const {map} = files;

    if (!checked || !map) {
      checkListReset();
      return;
    }

    const itemsToAdd = [...map[path]['folders'], ...map[path]['files'].map(x => x._id)];
    checkListAdd(itemsToAdd);
  };

  refresh = () => {
    const {fetchFiles} = this.props;
    fetchFiles();
  };

  delete = () => {
    const {files, checkList, setDeleteQueue} = this.props;
    const {map, list} = files;
    let delList = [];

    checkList.forEach((i) => {
      if (fs.isPath(i)) {
        delList = [...delList, ...fs.getFilesUnderPath(map, i)];
      } else {
        delList = [...delList, list.find(x => x._id === i)];
      }
    });

    setDeleteQueue(delList);
  };

  showSettings = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('projectSettings');
  };

  render() {
    const {project, files, path, checkList, ui} = this.props;
    const {map, loading} = files;

    let allChecked = false;
    let disabled = false;
    if (map) {
      const all = map[path]['folders'].length + map[path]['files'].length;
      allChecked = all > 0 && all === checkList.length;
      disabled = all === 0
    }

    const projectUrl = `${project.name}`;

    return (
      <div className="project">
        <div className="toolbar">
          <div className="select-input" title={_t('manager.project.select-all')}>
            <CheckBox checked={allChecked} disabled={disabled || loading} onChange={this.checked}/>
          </div>
          {(() => {
            if (checkList.length === 0) {
              return (
                <>
                  <div className={_c(`refresh-btn ${loading ? 'disabled' : ''}`)} title={_t('manager.project.refresh')}>
                    <span className="inner-btn" onClick={this.refresh}>{refreshSvg}</span>
                  </div>
                  <div className="settings-btn" title={_t('manager.project.settings')}>
                    <span className="inner-btn" onClick={this.showSettings}>{settingsSvg}</span>
                  </div>
                  <div className="h-space"/>
                  <a className="open-btn" href={`https://${projectUrl}`} target="_blank"
                     rel="noopener noreferrer">{projectUrl} {openSvg}</a>
                </>
              )
            }

            if (checkList.length > 0) {
              let label = '';

              if (allChecked) {
                label = _t('manager.project.all-items-selected');
              } else {
                if (checkList.length === 1) {
                  label = _t('manager.project.item-selected');
                } else {
                  label = _t('manager.project.items-selected', {n: checkList.length});
                }
              }

              return (
                <div className="items-selected">
                  {allChecked &&
                  <span className="selected-label">{label}</span>
                  }
                  {!allChecked &&
                  <span className="selected-label">{label}</span>
                  }

                  <div className="delete-btn" title={_t('manager.project.delete')}>
                    <span className="inner-btn" onClick={this.delete}>{deleteSvg}</span>
                  </div>
                </div>
              )
            }
          })()}
        </div>
        <Browser {...this.props} />
        {ui.projectSettings && <ProjectSettingsDialog {...this.props} />}
        {ui.projectStatus && <ProjectStatusDialog {...this.props} />}
        {ui.projectDelete && <ProjectDeleteDialog {...this.props} />}
      </div>
    )
  }
}

Project.defaultProps = {};

Project.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    map: PropTypes.shape({})
  }).isRequired,
  ui: PropTypes.shape({
    projectSettings: PropTypes.bool.isRequired,
    projectStatus: PropTypes.bool.isRequired,
    projectDelete: PropTypes.bool.isRequired
  }).isRequired,
  path: PropTypes.string.isRequired,
  checkList: PropTypes.array.isRequired,
  fetchFiles: PropTypes.func.isRequired,
  checkListAdd: PropTypes.func.isRequired,
  checkListReset: PropTypes.func.isRequired,
  setDeleteQueue: PropTypes.func.isRequired,
  toggleUiProp: PropTypes.func.isRequired,
};

export default Project;
