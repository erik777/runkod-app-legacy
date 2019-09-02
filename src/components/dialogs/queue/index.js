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


class QueueDialog extends Component {
  setQueueConflictFlag = (flag) => {
    const {setQueueConflictFlag, startQueue} = this.props;
    setQueueConflictFlag(flag);
    startQueue();
  };

  cancel = () => {
    const {resetQueue} = this.props;
    resetQueue();
  };

  render() {
    const {queue} = this.props;
    const {conflict, current, files, completed, failed, skipped} = queue;
    const [file,] = files;

    const all = files.length + completed.length + failed.length + skipped.length;
    const done = completed.length + failed.length + skipped.length;

    return (
      <>
        <Modal show onHide={this.hide} className="queue-dialog">
          <Modal.Body>
            {(() => {

              // Completed
              if (!file) {
                return (<div className="upload-done">
                  <div className="title">{_t('queue-dialog.done-title')}</div>
                  <div className="summary">
                    {completed.length > 0 &&
                    <span
                      className="summary-item completed">{_t('queue-dialog.summary-completed', {n: completed.length})}</span>
                    }
                    {failed.length > 0 &&
                    <span
                      className="summary-item failed">{_t('queue-dialog.summary-failed', {n: failed.length})}</span>
                    }
                    {skipped.length > 0 &&
                    <span
                      className="summary-item skipped">{_t('queue-dialog.summary-skipped', {n: skipped.length})}</span>
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
                  <div className="title">{_t('queue-dialog.progress-title')}</div>
                  <div className="description">{current}</div>
                  <div className="controls">
                    <ProgressBar animated max={all} now={done}/>
                  </div>
                </div>
              }

              if (conflict) {
                return (<div className="upload-conflict">
                  <div className="message">{_t('queue-dialog.conflict-message', {name: current})}</div>
                  <div className="question">{_t('queue-dialog.conflict-question')}</div>
                  <div className="controls">
                    <Button size="sm" variant="primary" onClick={() => {
                      this.setQueueConflictFlag(CONFLICT_FLAG_YES)
                    }}>{_t('g.yes')}</Button>

                    {all > 1 &&
                    <Button size="sm" variant="outline-primary" onClick={() => {
                      this.setQueueConflictFlag(CONFLICT_FLAG_YES_ALL)
                    }}>{_t('queue-dialog.conflict-option-yes-all')}</Button>
                    }

                    <span className="separator"/>
                    <Button size="sm" variant="secondary" onClick={() => {
                      this.setQueueConflictFlag(CONFLICT_FLAG_NO)
                    }}>{_t('g.no')}</Button>

                    {all > 1 &&
                    <Button size="sm" variant="outline-secondary" onClick={() => {
                      this.setQueueConflictFlag(CONFLICT_FLAG_NO_ALL)
                    }}>{_t('queue-dialog.conflict-option-no-all')}</Button>
                    }
                    <span className="separator"/>
                    <Button size="sm" variant="outline-info" onClick={this.cancel}>{_t('g.cancel')}</Button>
                  </div>
                </div>)
              }
            })()}
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

QueueDialog.defaultProps = {};

QueueDialog.propTypes = {
  queue: PropTypes.shape({
    files: PropTypes.arrayOf(Object).isRequired,
    completed: PropTypes.arrayOf(Object).isRequired,
    failed: PropTypes.arrayOf(Object).isRequired,
    skipped: PropTypes.arrayOf(Object).isRequired,
    conflict: PropTypes.bool.isRequired,
    conflictFlag: PropTypes.number.isRequired,
  }),
  setQueueConflictFlag: PropTypes.func.isRequired,
  startQueue: PropTypes.func.isRequired,
  resetQueue: PropTypes.func.isRequired
};

export default QueueDialog;