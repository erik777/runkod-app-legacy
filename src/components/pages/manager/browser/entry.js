import React, {Component} from 'react';

import PropTypes from 'prop-types';


import fileSize from 'filesize';

import {pathLabel} from '../../../../fs';

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
        typeContent = 'img';
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

export {Icon} ;


class ParentFolderEntry extends Component {
  clicked = (path) => {
    const {selectPath} = this.props;
    selectPath(path);
  };

  render() {
    const {path} = this.props;

    return (
      <div onClick={() => {
        this.clicked(path)
      }} key={path} className="browser-entry entry-parent-folder">

        <div className="entry-header">
          <Icon type="folder"/>
        </div>

        <div className="entry-name">..</div>
      </div>
    )
  }
}

ParentFolderEntry.defaultProps = {};

ParentFolderEntry.propTypes = {
  path: PropTypes.string.isRequired,
  selectPath: PropTypes.func.isRequired
};

export {ParentFolderEntry};


class FolderEntry extends Component {

  checked = (e) => {
    const {path, checkListAdd, checkListDelete} = this.props;
    const {checked} = e.target;

    if (checked) {
      checkListAdd(path);
    } else {
      checkListDelete(path);
    }
  };

  clicked = (e, path) => {

    const {checkList} = this.props;
    if (checkList.includes(path)) {
      return false;
    }

    if (!(e.target.tagName.toLowerCase() === 'input')) {
      const {selectPath} = this.props;
      selectPath(path);
    }
  };

  render() {
    const {path, checkList} = this.props;
    const checked = checkList.includes(path);

    return (
      <div onClick={(e) => {
        this.clicked(e, path)
      }} className={`browser-entry entry-folder ${checked ? 'checked' : ''}`}>
        <div className="entry-header">
          <div className="select-input">
            <input checked={checked} type="checkbox" onChange={this.checked}/>
          </div>
          <Icon type="folder"/>
        </div>
        <div className="entry-label">
          {pathLabel(path)}
        </div>
      </div>
    )
  }
}

FolderEntry.defaultProps = {};

FolderEntry.propTypes = {
  path: PropTypes.string.isRequired,
  selectPath: PropTypes.func.isRequired,
  checkList: PropTypes.array.isRequired,
  checkListAdd: PropTypes.func.isRequired,
  checkListDelete: PropTypes.func.isRequired
};

export {FolderEntry}


class FileEntry extends Component {

  checked = (e) => {
    const {file, checkListAdd, checkListDelete} = this.props;
    const {checked} = e.target;

    if (checked) {
      checkListAdd(file._id);
    } else {
      checkListDelete(file._id);
    }
  };

  render() {
    const {file, checkList} = this.props;
    const checked = checkList.includes(file._id);

    return (<div className={`browser-entry entry-file ${checked ? 'checked' : ''}`}>

        <div className="entry-header">
          <div className="select-input">
            <input checked={checked} type="checkbox" onChange={this.checked}/>
          </div>
          <Icon type={file.type}/>
        </div>


        <div className="entry-label">
          {file.name}
        </div>
        <div className="entry-size">
          {fileSize(file.size)}
        </div>
      </div>
    )
  }
}

FileEntry.defaultProps = {
  file: {
    type: null
  }
};

FileEntry.propTypes = {
  file: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }),
  checkList: PropTypes.array.isRequired,
  checkListAdd: PropTypes.func.isRequired,
  checkListDelete: PropTypes.func.isRequired
};

export {FileEntry}
