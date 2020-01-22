import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';

import fs from '../../../../core-utils/fs';

import {FileEntry, FolderEntry, ParentFolderEntry} from './entry';

import UploadZone from './upload-zone';

import {_t} from '../../../../i18n';

import {BASE_PATH, PATH_SEPARATOR} from '../../../../constants';

import {homeSvg} from '../../../../svg';

class Browser extends Component {
  onDrop = (files) => {
    const {setUploadQueue, startUploadQueue} = this.props;
    setUploadQueue(files);
    startUploadQueue();
  };

  pathClicked = (path) => {
    const {selectPath} = this.props;
    selectPath(path);
  };

  render() {
    const {project, files, path} = this.props;

    if (project.redirectTo) {
      const {projects} = this.props;
      const p = projects.list.find(x => x._id === project.redirectTo);
      return <div className="browser redirected">
        Redirected to {p.name}
      </div>
    }

    const {list, map, loading} = files;

    if (loading) {
      return null;
    }

    const fileUpload = <div className="file-upload">
      <UploadZone onDrop={this.onDrop}/>
    </div>;

    if (list.length === 0) {
      return <div className="browser no-file">
        {fileUpload}
      </div>
    }

    let contents = {folders: [], files: []};
    if (map) {
      contents = map[path];
    }

    const pathArr = fs.pathToArr(path);

    return (
      <div className="browser">
        <div className="browser-entries">
          {(() => {
            const parent = fs.parentPath(path);
            if (parent) {
              return <ParentFolderEntry {...this.props} path={parent}/>;
            }
          })()}
          {contents.folders.map((path) => <FolderEntry {...this.props} key={path} path={path}/>)}
          {contents.files.map((file) => <FileEntry {...this.props} key={file._id} file={file}/>)}
        </div>
        {path !== '/' &&
        <div className="full-path">
          <div className="home-btn" title={_t('manager.project.root-folder')}>
                        <span className="inner-btn" onClick={() => {
                          this.pathClicked(BASE_PATH)
                        }}>{homeSvg}</span>
          </div>
          <span className="separator">{PATH_SEPARATOR}</span>
          {pathArr.map((p, i) => {
              const path = fs.arrToPath(pathArr.slice(0, i + 1));
              return (
                <Fragment key={p}>
                            <span onClick={() => {
                              this.pathClicked(path)
                            }} className="path">{p}</span>
                  <span className="separator">{PATH_SEPARATOR}</span>
                </Fragment>
              )
            }
          )}
        </div>
        }
        {fileUpload}
      </div>
    );
  }
}

Browser.defaultProps = {};

Browser.propTypes = {
  project: PropTypes.shape({
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
  files: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired,
    map: PropTypes.shape({})
  }).isRequired,
  path: PropTypes.string.isRequired,
  selectPath: PropTypes.func.isRequired,
  setUploadQueue: PropTypes.func.isRequired,
  startUploadQueue: PropTypes.func.isRequired,
};

export default Browser;
