import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, ProgressBar} from 'react-bootstrap';

import {_t} from '../../../i18n';

import {
  CONFLICT_FLAG_YES,
  CONFLICT_FLAG_YES_ALL,
  CONFLICT_FLAG_NO,
  CONFLICT_FLAG_NO_ALL
} from '../../../constants';

const defaultProps = {};
const propTypes = {
  uploadQueue: PropTypes.shape({
    current: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    completed: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    failed: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    skipped: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    conflict: PropTypes.bool.isRequired,
    conflictFlag: PropTypes.number.isRequired,
    log: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired
    })).isRequired,
  }),
  ui: PropTypes.shape({
    uploadSummaryDetail: PropTypes.bool.isRequired
  }).isRequired,
  startUploadQueue: PropTypes.func.isRequired,
  setUploadQueueConflictFlag: PropTypes.func.isRequired,
  resetUploadQueue: PropTypes.func.isRequired,
  fetchFiles: PropTypes.func.isRequired
};

class DialogContent extends Component {

  componentDidUpdate(prevProps) {
    const {uploadQueue: queue} = this.props;
    const {files, failed, skipped} = queue;

    // everything went smooth. reset queue.
    if (files.length === 0 && failed.length === 0 && skipped.length === 0) {
      this.cancel();
    }
  }

  setQueueConflictFlag = (flag) => {
    const {setUploadQueueConflictFlag, startUploadQueue} = this.props;
    setUploadQueueConflictFlag(flag);
    startUploadQueue();
  };

  cancel = () => {
    const {resetUploadQueue, fetchFiles} = this.props;
    resetUploadQueue();
    fetchFiles();
  };

  toggleSummaryDetails = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('uploadSummaryDetail');
  };

  render() {
    const {uploadQueue: queue, ui} = this.props;
    const {conflict, current, files, completed, failed, skipped, log} = queue;
    const [file,] = files;

    const all = files.length + completed.length + failed.length + skipped.length;
    const done = completed.length + failed.length + skipped.length;

    return (
      <>
        {(() => {

          // Completed
          if (!file) {
            return (<div className="upload-done">
              <div className="title">{_t('upload-queue-dialog.done-title')}</div>
              <div className="summary">
                {completed.length > 0 &&
                <span className="summary-item completed">
                  {completed.length === 1 ? _t('upload-queue-dialog.summary-completed') : _t('upload-queue-dialog.n-summary-completed', {n: completed.length})}
                </span>
                }
                {failed.length > 0 &&
                <span className="summary-item failed">
                 {failed.length === 1 ? _t('upload-queue-dialog.summary-failed') : _t('upload-queue-dialog.n-summary-failed', {n: failed.length})}
                </span>
                }
                {skipped.length > 0 &&
                <span className="summary-item skipped">
                    {skipped.length === 1 ? _t('upload-queue-dialog.summary-skipped') : _t('upload-queue-dialog.n-summary-skipped', {n: skipped.length})}
                </span>
                }
              </div>
              <div className="details">
                    <span className="show-details"
                          onClick={this.toggleSummaryDetails}>{_t('upload-queue-dialog.show-details')}</span>
                {ui.uploadSummaryDetail &&
                <div className="detail-list user-select">
                  {log.map((l, i) => {
                    return <div key={i} className={`detail-list-item ${l.type}`}>
                      {l.msg}
                    </div>;
                  })}
                </div>
                }
              </div>
              <div className="controls">
                <Button size="sm" variant="secondary" onClick={this.cancel}>{_t('g.close')}</Button>
              </div>
            </div>)
          }

          // Uploading
          if (!conflict) {
            return <div className="upload-progress">
              <div className="title">{_t('upload-queue-dialog.progress-title')}</div>
              <div className="description">{current}</div>
              <div className="controls">
                <ProgressBar animated max={all} now={done}/>
              </div>
            </div>
          }

          if (conflict) {
            return (<div className="upload-conflict">
              <div className="message">{_t('upload-queue-dialog.conflict-message', {name: current})}</div>
              <div className="question">{_t('upload-queue-dialog.conflict-question')}</div>
              <div className="controls">
                <Button size="sm" variant="primary" onClick={() => {
                  this.setQueueConflictFlag(CONFLICT_FLAG_YES)
                }}>{_t('g.yes')}</Button>

                {all > 1 &&
                <Button size="sm" variant="outline-primary" onClick={() => {
                  this.setQueueConflictFlag(CONFLICT_FLAG_YES_ALL)
                }}>{_t('upload-queue-dialog.conflict-option-yes-all')}</Button>
                }

                <span className="separator"/>
                <Button size="sm" variant="secondary" onClick={() => {
                  this.setQueueConflictFlag(CONFLICT_FLAG_NO)
                }}>{_t('g.no')}</Button>

                {all > 1 &&
                <Button size="sm" variant="outline-secondary" onClick={() => {
                  this.setQueueConflictFlag(CONFLICT_FLAG_NO_ALL)
                }}>{_t('upload-queue-dialog.conflict-option-no-all')}</Button>
                }
                <span className="separator"/>
                <Button size="sm" variant="outline-info" onClick={this.cancel}>{_t('g.cancel')}</Button>
              </div>
            </div>)
          }
        })()}
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