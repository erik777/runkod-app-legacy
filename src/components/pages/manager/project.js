import React, {Component} from 'react';
import PropTypes from "prop-types";
import Ddu from "../../helper/ddu";

class Browser extends Component {
  render() {

    return (
      <Ddu>
        <div className="browser">

        </div>
      </Ddu>
    );
  }
}

Browser.defaultProps = {};

Browser.propTypes = {
  files: PropTypes.instanceOf(Object).isRequired,
};

class Project extends Component {
  render() {


    const {project, path} = this.props;

    return (
      <div className="project">
        <div className="toolbar">
              <span className="project-path">
                <span className="name">
                {project.name}
                </span>
                 <span className="path">
                   {path}
                </span>
              </span>
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
};

export default Project;
