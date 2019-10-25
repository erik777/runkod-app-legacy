import React, {Component} from 'react';

import PropTypes from 'prop-types';

import fileSize from 'filesize';

import {Modal} from 'react-bootstrap';

import {openSvg} from '../../../svg';

const defaultProps = {};
const propTypes = {
  file: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    fullPath: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }),
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onHide: PropTypes.func.isRequired
};

class DialogContent extends Component {
  render() {
    const {file, project} = this.props;
    const fileUrl = `https://${project.name}${file.fullPath}`;

    return <div className="user-select">
      <a href={fileUrl} title={fileUrl} target="_blank" className="file-url" rel="noopener noreferrer">{file.fullPath} {openSvg}</a>
      <div className="file-extra-info">
        {file.type && <>{file.type} - </>}{fileSize(file.size)}
      </div>
      {(file.type && file.type.indexOf('image') >= -1) &&
      <img alt="file" className="file-image" src={file.address}/>
      }
    </div>
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class FileInfoDialog extends Component {
  hide = () => {
    const {onHide} = this.props;
    onHide();
  };

  render() {
    const {file} = this.props;

    return (
      <Modal show className="file-info-dialog" onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>{file.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DialogContent {...this.props} />
        </Modal.Body>
      </Modal>
    )
  }
}

FileInfoDialog.defaultProps = defaultProps;

FileInfoDialog.propTypes = propTypes;

export default FileInfoDialog;