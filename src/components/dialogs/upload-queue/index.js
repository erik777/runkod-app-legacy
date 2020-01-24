import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, ProgressBar} from 'react-bootstrap';

import {_t} from '../../../i18n';

class UploadLog extends Component {
  list = React.createRef();

  componentDidUpdate() {
    const el = this.list.current;
    el.scrollTop = el.scrollHeight;
  }

  render() {
    const {uploadQueue: queue} = this.props;
    const {log} = queue;

    return <div className="upload-log-list" ref={this.list}>
      {log.map((x, i) => <div key={i} className={`list-item list-item-${x.type}`}>{x.msg}</div>)}
    </div>
  }
}

UploadLog.propTypes = {
  uploadQueue: PropTypes.shape({
    log: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired
    })).isRequired
  }),
};

const defaultProps = {};
const propTypes = {
  uploadQueue: PropTypes.shape({
    pending: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    completed: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    failed: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    inProgress: PropTypes.bool.isRequired
  }),
  resetUploadQueue: PropTypes.func.isRequired,
  fetchFiles: PropTypes.func.isRequired
};

class DialogContent extends Component {

  componentDidUpdate(prevProps) {
    const {uploadQueue: queue} = this.props;
    const {pending, failed} = queue;

    // everything went smooth. reset queue.
    if (pending.length === 0 && failed.length === 0) {
      setTimeout(() => {
        this.hide();
      }, 2000);
    }
  }

  hide = () => {
    const {resetUploadQueue, fetchFiles} = this.props;
    resetUploadQueue();
    fetchFiles();
  };

  render() {
    const {uploadQueue: queue} = this.props;
    const {pending, completed, failed, inProgress} = queue;

    const all = pending.length + completed.length + failed.length;
    const done = completed.length + failed.length;

    return (
      <>
        <div className="title">{_t('upload-queue-dialog.progress-title')}</div>
        <div className="progress-num">
          {done} / {all}
        </div>
        <div className="progress-percent">
          <ProgressBar animated max={all} now={done}/>
        </div>
        <UploadLog {...this.props} />
        {(!inProgress && failed.length > 0) &&
        <div className="controls">
          <Button size="sm" variant="outline-info" onClick={this.hide}>{_t('g.close')}</Button>
        </div>
        }
      </>
    )
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class UploadQueueDialog extends Component {
  render() {
    return (
      <Modal show className="upload-queue-dialog" onHide={() => {
      }}>
        <Modal.Body>
          <DialogContent {...this.props} />
        </Modal.Body>
      </Modal>
    )
  }
}

UploadQueueDialog.defaultProps = defaultProps;

UploadQueueDialog.propTypes = propTypes;

export default UploadQueueDialog;
