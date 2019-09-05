import React, {Component} from 'react';

import PropTypes from 'prop-types';

import fs from '../../../../fs';

import Ddu from '../../../helper/ddu';

import {FileEntry, FolderEntry, ParentFolderEntry} from './entry';


class Browser extends Component {

  onDrop = (files) => {
    const {setUploadQueue, startUploadQueue} = this.props;
    setUploadQueue(files);
    startUploadQueue()
  };

  render() {
    const {files, path} = this.props;
    const {list, map, loading} = files;
    const noFile = !loading && list.length === 0;

    let contents = {folders: [], files: []};
    if (map) {
      contents = map[path];
      // needs improvements
    }

    return (
      <Ddu onDrop={this.onDrop}>
        <div className={`browser ${noFile ? 'no-file' : ''}`}>
          {noFile ? 'Drag & Drop files or folders here to upload' : ''}
          {(() => {
            const parent = fs.parentPath(path);
            if (parent) {
              return <ParentFolderEntry {...this.props} path={parent}/>;
            }
          })()}
          {contents.folders.map((path) => <FolderEntry {...this.props} key={path} path={path}/>)}
          {contents.files.map((file) => <FileEntry {...this.props} key={file._id} file={file}/>)}
        </div>
      </Ddu>
    );
  }
}

Browser.defaultProps = {};

Browser.propTypes = {
  files: PropTypes.instanceOf(Object).isRequired,
  selectPath: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  setUploadQueue: PropTypes.func.isRequired,
  startUploadQueue: PropTypes.func.isRequired
};

export default Browser;
