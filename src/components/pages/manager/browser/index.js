import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {photoSvg} from '../../../../svg';

import Ddu from '../../../helper/ddu';


class Icon extends Component {
  render() {
    const {type} = this.props;

    if (type === 'folder') {
      return <div className="entry-icon entry-icon-folder">
        <div className="shapes">
          <div className="shape1"/>
          <div className="shape2"/>
        </div>
      </div>;
    }

    let typeContent;
    let typeCls;

    switch (type) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        typeContent = photoSvg;
        typeCls = 'icon-image';
        break;
      case 'text/html':
        typeContent = '</>';
        typeCls = 'icon-html';
        break;
      case 'application/json':
        typeContent = '{ }';
        typeCls = 'icon-json';
        break;
      case 'text/javascript':
        typeContent = 'js';
        typeCls = 'icon-js';
        break;
      case 'text/css':
        typeContent = 'css';
        typeCls = 'icon-css';
        break;
      default:
        typeContent = '';
        typeCls = '';

    }

    return <div className={`entry-icon entry-icon-file ${typeCls}`}>
      <div className="shape">
        {typeContent &&
        <div className="type-name">{typeContent}</div>
        }
      </div>
    </div>;
  }
}

Icon.defaultProps = {};

Icon.propTypes = {
  type: PropTypes.string
};

export {Icon};

class Browser extends Component {

  onDrop = (files) => {
    const {setQueue, startQueue} = this.props;
    setQueue(files);
    startQueue()
  };

  folderClicked = (path) => {
    const {selectPath} = this.props;
    selectPath(path);
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

          {contents.folders.map((folder) => {


            return (
              <div onClick={() => {
                this.folderClicked(folder)
              }} key={folder} className="browser-entry entry-folder">
                <Icon type="folder"/>

                {folder}
              </div>)
          })}

          {contents.files.map((file) => {
            return <div key={file._id} className="browser-entry entry-file">
              <Icon type={file.type}/>

              {file.name}
            </div>
          })}


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
  setQueue: PropTypes.func.isRequired,
  startQueue: PropTypes.func.isRequired
};

export default Browser;
