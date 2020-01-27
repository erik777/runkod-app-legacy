import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, ProgressBar} from 'react-bootstrap';

import QueueLog from '../shared/queue-log';

import {_t} from '../../../i18n';

const defaultProps = {};

const propTypes = {
  deleteQueue: PropTypes.shape({
    inProgress: PropTypes.bool.isRequired,
    pending: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    completed: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    failed: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    log: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }),
  processDeleteQueue: PropTypes.func.isRequired,
  resetDeleteQueue: PropTypes.func.isRequired,
  fetchFiles: PropTypes.func.isRequired
};

class DialogContent extends Component {

  componentDidUpdate(prevProps) {
    const {deleteQueue: queue} = this.props;
    const {pending, failed} = queue;

    // everything went smooth. reset queue.
    if (pending.length === 0 && failed.length === 0) {
      setTimeout(() => {
        this.done();
      }, 2000);
    }
  }

  confirm = () => {
    const {processDeleteQueue} = this.props;
    processDeleteQueue();
  };

  cancel = () => {
    const {resetDeleteQueue} = this.props;
    resetDeleteQueue();
  };

  done = () => {
    const {resetDeleteQueue, fetchFiles} = this.props;
    resetDeleteQueue();
    fetchFiles();
  };

  render() {
    const {deleteQueue: queue} = this.props;
    const {pending, completed, failed, inProgress, log} = queue;

    const all = pending.length + completed.length + failed.length;
    const done = completed.length + failed.length;

    return (
      <>
        {(() => {
          // Deleting
          // Deleting or Completed or 1 failed
          if (inProgress || (pending.length === 0 && failed.length === 0) || failed.length > 0) {
            return <div className="delete-progress">
              <div className="description">{done} / {all}</div>
              <div className="progress-percent">
                <ProgressBar animated max={all} now={done}/>
              </div>
              <QueueLog logs={log} {...this.props} />
              {(!inProgress && failed.length > 0) &&
              <div className="controls">
                <Button size="sm" variant="outline-info" onClick={this.done}>{_t('g.close')}</Button>
              </div>
              }
            </div>
          }

          // Confirmation
          return <div className="delete-confirm">
            <div className="title">
              {pending.length === 1 ? _t('delete-queue-dialog.confirm') : _t('delete-queue-dialog.n-confirm', {n: pending.length})}
            </div>
            <div className="controls">
              <Button size="sm" variant="primary" onClick={this.confirm}>{_t('g.delete')}</Button>
              <span className="separator"/>
              <Button size="sm" variant="outline-info" onClick={this.cancel}>{_t('g.cancel')}</Button>
            </div>
          </div>
        })()}
      </>
    )
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class DeleteQueueDialog extends Component {
  hide = () => {

  };

  render() {
    return (
      <Modal show className="delete-queue-dialog" onHide={this.hide}>
        <Modal.Body>
          <DialogContent {...this.props} />
        </Modal.Body>
      </Modal>
    )
  }
}

DeleteQueueDialog.defaultProps = defaultProps;
DeleteQueueDialog.propTypes = propTypes;

export default DeleteQueueDialog;

