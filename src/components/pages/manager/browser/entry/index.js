import React, {Component} from 'react';

import PropTypes from 'prop-types';

import fileSize from 'filesize';

import FileInfoDialog from '../../../../dialogs/file-info';

import CheckBox from '../../../../helper/checkbox';

import fs from '../../../../../core-utils/fs';

import _c from '../../../../../utils/fix-class-names';

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

    if (type.indexOf('image') === 0) {
      typeContent = 'img';
      typeCls = 'icon-image';
    } else {
      switch (type) {
        case 'text/html':
          typeContent = '</>';
          typeCls = 'icon-html';
          break;
        case 'application/json':
          typeContent = '{ }';
          typeCls = 'icon-json';
          break;
        case 'text/javascript':
        case 'application/javascript':
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
    }


    return <div className={_c(`entry-icon entry-icon-file ${typeCls}`)}>
      <div className="shape">
        {typeContent && <div className="type-name">{typeContent}</div>}
      </div>
    </div>;
  }
}

Icon.defaultProps = {
  type: null
};

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
      }} className="browser-entry entry-parent-folder">
        <div className="entry-header">
          <Icon type="folder"/>
        </div>
        <div className="entry-name">{'..'}</div>
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
  checked = (checked) => {
    const {path, checkListAdd, checkListDelete} = this.props;

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
      }} className={_c(`browser-entry entry-folder ${checked ? 'checked' : ''}`)}>
        <div className="entry-header">
          <div className="select-input">
            <CheckBox checked={checked} onChange={this.checked}/>
          </div>
          <Icon type="folder"/>
        </div>
        <div className="entry-label">
          {fs.pathLabel(path)}
        </div>
      </div>
    )
  }
}

FolderEntry.defaultProps = {};

FolderEntry.propTypes = {
  path: PropTypes.string.isRequired,
  checkList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectPath: PropTypes.func.isRequired,
  checkListAdd: PropTypes.func.isRequired,
  checkListDelete: PropTypes.func.isRequired
};

export {FolderEntry}


class FileEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: false
    }
  }

  checked = (checked) => {
    const {file, checkListAdd, checkListDelete} = this.props;

    if (checked) {
      checkListAdd(file._id);
    } else {
      checkListDelete(file._id);
    }
  };

  toggleInfo = () => {
    const {info} = this.state;
    this.setState({info: !info});
  };

  render() {
    const {info} = this.state;
    const {file, checkList} = this.props;
    const checked = checkList.includes(file._id);

    return (
      <>
        <div className={_c(`browser-entry entry-file ${checked ? 'checked' : ''}`)} onClick={this.toggleInfo}>
          <div className="entry-header">
            <div className="select-input">
              <CheckBox checked={checked} onChange={this.checked}/>
            </div>
            <Icon type={file.type}/>
          </div>
          <div className="entry-label">
            {file.label}
          </div>
          <div className="h-space"/>
          <div className="entry-size">
            {fileSize(file.size)}
          </div>
        </div>
        {info && <FileInfoDialog {...this.props} file={file} onHide={this.toggleInfo}/>}
      </>
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
    label: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }),
  checkList: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkListAdd: PropTypes.func.isRequired,
  checkListDelete: PropTypes.func.isRequired
};

export {FileEntry}
