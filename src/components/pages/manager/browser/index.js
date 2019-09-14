import React, {Component} from 'react';

import PropTypes from 'prop-types';

import fs from '../../../../fs';

import {FileEntry, FolderEntry, ParentFolderEntry} from './entry';

import UploadZone from './upload-zone';

class Browser extends Component {
  onDrop = (files) => {
    const {setUploadQueue, startUploadQueue} = this.props;
    setUploadQueue(files);
    startUploadQueue();
  };

  render() {
    const {files, path} = this.props;
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
        {fileUpload}
      </div>
    );
  }
}

Browser.defaultProps = {};

Browser.propTypes = {
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
