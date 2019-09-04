import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';

import {uploadSvg} from '../../../svg';

import Browser from './browser';

import fs from '../../../fs';

import {BASE_PATH, PATH_SEPARATOR} from '../../../constants';


class Project extends Component {

  pathClicked = (path) => {
    const {selectPath} = this.props;
    selectPath(path);
  };

  render() {
    const {project, path} = this.props;

    const pathArr = fs.pathToArr(path);

    return (
      <div className="project">
        <div className="toolbar">
          <div className="select-input">
            <input type="checkbox"/>
          </div>
          <div className="full-path">
            <span onClick={() => {
              this.pathClicked(BASE_PATH)
            }} className="path">{project.name}</span>
            <span className="separator">{BASE_PATH}</span>
            {pathArr.map((p, i) => {
                const path = fs.arrToPath(pathArr.slice(0, i + 1));

                return <Fragment key={p}>
                  <span onClick={() => {
                    this.pathClicked(path)
                  }} className="path">{p}</span>
                  <span className="separator">{PATH_SEPARATOR}</span>
                </Fragment>
              }
            )}
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
  path: PropTypes.string.isRequired,
  selectPath: PropTypes.func.isRequired,
};

export default Project;
