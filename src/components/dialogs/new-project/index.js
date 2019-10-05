import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, InputGroup, FormControl, FormText} from 'react-bootstrap';

import to from 'await-to-js';

import {Project} from '../../../model';

import {getUsername} from '../../../blockstack-config';

import {_t} from '../../../i18n';

import message from '../../helper/message';

import testName from '../../../helper/test-name';

import testCustomName from '../../../helper/test-custom-name';

import {hostIp} from '../../../backend';

import {
  NAME_SUFFIX,
  NAME_MAX_LENGTH,
  CUSTOM_NAME_MAX_LENGTH,
  PROJECT_STATUS_ON,
  DEFAULT_TAG_NAME
} from '../../../constants';


class NewProjectDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      custom: false,
      error: '',
      inProgress: false,
      customDoc: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.focusElem();
    }, 400);
  }

  focusElem = () => {
    const e = document.querySelector('#txt-name');
    if (e) e.focus();
  };

  hide = () => {
    const {inProgress} = this.state;
    if (inProgress) {
      return;
    }

    const {onHide, toggleUiProp} = this.props;
    toggleUiProp('newProject');
    onHide();
  };

  submit = async () => {
    this.setState({error: ''});

    const {name, custom} = this.state;
    const sName = name.trim();

    if (custom) {
      if (!testCustomName(sName)) {
        this.setState({error: _t('new-project-dialog.error-not-valid-name-custom')});
        return;
      }
    } else {
      if (!testName(sName)) {
        this.setState({error: _t('new-project-dialog.error-not-valid-name')});
        return;
      }
    }

    const fullName = custom ? sName : `${sName}${NAME_SUFFIX}`;

    this.setState({inProgress: true});


    if (custom) {
      const [err, resp] = await to(hostIp(fullName));
      if (err) {
        this.setState({error: _t('g.server-error'), inProgress: false});
        return;
      }

      if (!resp.valid) {
        this.setState({error: _t('new-project-dialog.error-dns'), inProgress: false});
        return;
      }
    }

    const [, checkList] = await to(Project.fetchList({name: fullName}));

    if (!checkList) {
      this.setState({error: _t('g.server-error'), inProgress: false});
      return;
    }

    if (checkList.length > 0) {
      this.setState({error: _t('new-project-dialog.error-not-available'), inProgress: false});
      return;
    }

    const p = new Project({
      name: fullName,
      username: getUsername(),
      custom,
      tag: DEFAULT_TAG_NAME,
      status: PROJECT_STATUS_ON,
      deleted: false
    });
    const [err,] = await to(p.save());

    if (err) {
      this.setState({error: _t('g.server-error'), inProgress: false});
      return;
    }

    this.setState({inProgress: false});

    message.success(_t('new-project-dialog.success'));

    const {onSave} = this.props;
    onSave();

    this.hide();
  };

  nameChanged = (e) => {
    this.setState({name: e.target.value.toLowerCase()});
  };

  switchToCustomDomain = () => {
    if (this.state.inProgress) {
      return;
    }

    this.setState({custom: true, name: '', error: ''});
  };

  switchToSubDomain = () => {
    if (this.state.inProgress) {
      return;
    }

    this.setState({custom: false, name: '', error: '', customDoc: false});
  };

  toggleCustomDoc = (e) => {
    e.preventDefault();
    const {customDoc} = this.state;
    this.setState({customDoc: !customDoc});
  };

  render() {
    const {custom, name, error, inProgress, customDoc} = this.state;

    return (
      <>
        <Modal show onHide={this.hide} className="new-project-dialog">
          <Modal.Header closeButton>
            <Modal.Title>{_t('new-project-dialog.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="d-flex justify-content-end">
              {!custom &&
              <Button variant="link" size="sm" onClick={this.switchToCustomDomain}>
                {_t('new-project-dialog.custom-name-btn-label')}
              </Button>
              }
              {custom &&
              <Button variant="link" size="sm" onClick={this.switchToSubDomain}>
                {_t('new-project-dialog.name-btn-label')}
              </Button>
              }
            </div>

            <div className="domain-input">
              {!custom &&
              <InputGroup>
                <FormControl autoFocus id="txt-name" maxLength={NAME_MAX_LENGTH} autoComplete="off"
                             placeholder={_t('new-project-dialog.name-placeholder')}
                             value={name} onChange={this.nameChanged} className={error ? 'is-invalid' : ''}/>
                <InputGroup.Append>
                  <InputGroup.Text>{NAME_SUFFIX}</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              }

              {custom &&
              <>
                <InputGroup>
                  <FormControl autoFocus id="txt-name" maxLength={CUSTOM_NAME_MAX_LENGTH} autoComplete="off"
                               placeholder={_t('new-project-dialog.custom-name-placeholder')}
                               value={name} onChange={this.nameChanged} className={error ? 'is-invalid' : ''}/>
                </InputGroup>
              </>
              }

              <div className="form-feedback">
                {error && <FormText className="text-danger">{error}</FormText>}
              </div>

              {custom &&
              <div className="dns-info">
                <a href="#" onClick={this.toggleCustomDoc}>
                  {_t('new-project-dialog.dns-info')}
                </a>
              </div>
              }
            </div>

            <div className="d-flex justify-content-center">
              <Button variant="primary" onClick={this.submit} disabled={inProgress}>
                {inProgress ? '...' : _t('g.submit')}
              </Button>
            </div>

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
  ui: PropTypes.shape({
    newProject: PropTypes.bool.isRequired
  }),
  toggleUiProp: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onHide: PropTypes.func
};

export default NewProjectDialog;