import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, ProgressBar} from 'react-bootstrap';

import {_t} from '../../../i18n';


const defaultProps = {};

const propTypes = {
  deleteQueue: PropTypes.shape({
    inProgress: PropTypes.bool.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
      parent: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired,
    completed: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired
    })).isRequired,
    failed: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired
    })).isRequired,
    log: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired
    })).isRequired,
  }),
  ui: PropTypes.shape({
    deleteDetail: PropTypes.bool.isRequired,
    deleteSummaryDetail: PropTypes.bool.isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  startDeleteQueue: PropTypes.func.isRequired,
  resetDeleteQueue: PropTypes.func.isRequired,
  fetchFiles: PropTypes.func.isRequired
};

class DialogContent extends Component {

  componentDidUpdate(prevProps) {
    const {deleteQueue: queue, fetchFiles} = this.props;
    const {files, failed} = queue;

    // everything went smooth. reset queue.
    if (files.length === 0 && failed.length === 0) {
      fetchFiles();
      this.hide();
    }
  }

  confirm = () => {
    const {startDeleteQueue} = this.props;
    startDeleteQueue();
  };

  cancel = () => {
    this.hide();
  };

  close = () => {
    const {fetchFiles} = this.props;
    fetchFiles();
    this.hide();
  };

  hide = () => {
    const {resetDeleteQueue, toggleUiProp, ui} = this.props;
    resetDeleteQueue();

    if (ui.deleteDetail) toggleUiProp('deleteDetail');
    if (ui.deleteSummaryDetail) toggleUiProp('deleteSummaryDetail');
  };

  toggleDetails = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('deleteDetail');
  };

  toggleSummaryDetails = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('deleteSummaryDetail');
  };

  render() {
    const {deleteQueue: queue, ui} = this.props;
    const {files, completed, failed, inProgress, log} = queue;
    const [file,] = files;

    const all = files.length + completed.length + failed.length;
    const done = completed.length + failed.length;

    return (
      <>

        {(() => {

          // Completed
          if (!file) {
            return (<div className="delete-done">
              <div className="title">{_t('delete-queue-dialog.done-title')}</div>
              <div className="summary">
                {completed.length > 0 &&
                <span
                  className="summary-item completed">
                      {completed.length === 1 ? _t('delete-queue-dialog.summary-completed') : _t('delete-queue-dialog.n-summary-completed', {n: completed.length})}
                    </span>
                }
                {failed.length > 0 &&
                <span className="summary-item failed">
                       {failed.length === 1 ? _t('delete-queue-dialog.summary-failed') : _t('delete-queue-dialog.n-summary-failed', {n: failed.length})}
                    </span>
                }
              </div>
              <div className="details">
                    <span className="show-details"
                          onClick={this.toggleSummaryDetails}>{_t('delete-queue-dialog.show-details')}</span>
                {ui.deleteSummaryDetail &&
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
                <Button size="sm" variant="secondary" onClick={this.close}>{_t('g.close')}</Button>
              </div>
            </div>)
          }

          // Deleting
          if (inProgress) {
            return <div className="delete-progress">
              <div className="title">{_t('delete-queue-dialog.progress-title')}</div>
              <div className="description">{done} / {all}</div>
              <div className="controls">
                <ProgressBar animated max={all} now={done}/>
              </div>
            </div>
          }

          // Confirmation
          return <div className="delete-confirm">
            <div className="title">
              {files.length === 1 ? _t('delete-queue-dialog.confirm') : _t('delete-queue-dialog.n-confirm', {n: files.length})}
            </div>

            <div className="details">
                    <span className="show-details"
                          onClick={this.toggleDetails}>{_t('delete-queue-dialog.show-details')}</span>
              {ui.deleteDetail &&
              <div className="detail-list">
                {files.map((f, i) => {
                  return <div key={i} className="detail-list-item">
                    <div className="index">{i + 1}</div>
                    <div className="path">{`${f.parent}${f.label}`}</div>
                  </div>;
                })}
              </div>
              }
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

