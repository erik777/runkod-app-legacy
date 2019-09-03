import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {uploadSvg} from '../../../svg';

import Browser from './browser';

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
