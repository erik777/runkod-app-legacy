import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {uploadSvg} from '../../../svg';

import Ddu from '../../helper/ddu';

class Browser extends Component {

  onDrop = (files) => {
    const {setQueue, startQueue} = this.props;
    setQueue(files);
    startQueue()
  };

  render() {

    const {files} = this.props;
    const {list, loading} = files;
    const noFile = !loading && list.length === 0;


    return (
      <Ddu onDrop={this.onDrop}>
        <div className={`browser ${noFile ? 'no-file' : ''}`}>
          {noFile ? 'Drag & Drop files or folders here to upload' : ''}
        </div>
      </Ddu>
    );
  }
}

Browser.defaultProps = {};

Browser.propTypes = {
  files: PropTypes.instanceOf(Object).isRequired,
  setQueue: PropTypes.func.isRequired,
  startQueue: PropTypes.func.isRequired
};

class Project extends Component {
  render() {
    const {project, path} = this.props;

    return (
      <div className="project">
        <div className="toolbar">

          <div className="select-input">
            <input type="checkbox"/>
          </div>
          <div className="project-path">
            {project.name} {path}
          </div>

          <div className="upload-btn">
            {uploadSvg}

            <input type="file" multiple webkitdirectory="" mozdirectory=""/>
          </div>
        </div>
        <Browser {...this.props} />
      </div>
    )
  }
}

Project.defaultProps = {};

Project.propTypes = {
  project: PropTypes.instanceOf(Object),
  path: PropTypes.string.isRequired
};

export default Project;
