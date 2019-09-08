import React, {Component} from 'react';

import PropTypes from 'prop-types';

import fs from '../../../../fs';

import {FileEntry, FolderEntry, ParentFolderEntry} from './entry';

import UploadZone from './upload-zone';

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
      <div className={`browser ${noFile ? 'no-file' : ''}`}>

        {!noFile &&
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
        }

        <div className="file-upload">
          <UploadZone onDrop={this.onDrop}/>
        </div>
      </div>

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
