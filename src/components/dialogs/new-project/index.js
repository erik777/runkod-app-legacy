import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

import ProjectForm from './form';

import CustomProjectForm from './form-custom';

import {_t} from '../../../i18n';

class NewProjectDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      custom: false
    }
  }

  form = React.createRef();

  focusInput = () => {
    const e = document.querySelector('#txt-name');
    if (e) e.focus();
  };

  switchToCustomDomain = () => {
    this.setState({custom: true});
  };

  switchToSubDomain = () => {
    this.setState({custom: false});
  };

  hide = () => {
    const {inProgress, isNew, done} = this.form.current.state;

    if (inProgress) {
      return;
    }

    if (done) {
      this.onDone(isNew);
      return;
    }

    const {onHide, toggleUiProp} = this.props;
    toggleUiProp('newProject');
    onHide();
  };

  onDone = (isNew) => {
    const {invalidateUiFlag, onSave, onHide, toggleUiProp} = this.props;
    invalidateUiFlag('fr');

    onSave(isNew);
    toggleUiProp('newProject');
    onHide();
  };

  render() {
    const {custom} = this.state;

    return (
      <>
        <Modal show onHide={this.hide} className="new-project-dialog" backdrop="static" onEntered={this.focusInput}>
          <Modal.Header closeButton>
            <Modal.Title>{_t('new-project-dialog.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(() => {
              if (custom) {
                return <CustomProjectForm
                  {...this.props}
                  switchFn={this.switchToSubDomain}
                  onDone={this.onDone}
                  ref={this.form}
                />;
              }

              return <ProjectForm
                {...this.props}
                switchFn={this.switchToCustomDomain}
                onDone={this.onDone}
                ref={this.form}
              />;
            })()}
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

NewProjectDialog.defaultProps = {
  onSave: () => {
  },
  onHide: () => {
  }
};

NewProjectDialog.propTypes = {
  toggleUiProp: PropTypes.func.isRequired,
  invalidateUiFlag: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onHide: PropTypes.func
};

export default NewProjectDialog;
