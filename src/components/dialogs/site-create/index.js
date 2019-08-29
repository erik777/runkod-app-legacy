import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, InputGroup, FormControl, FormText} from 'react-bootstrap';

import to from 'await-to-js';

import {Website} from '../../../model';

import {_t} from '../../../i18n';

import message from '../../helper/message';

import {testName, testCustomName} from '../../../helper';

import {
  NAME_SUFFIX,
  NAME_MAX_LENGTH,
  CUSTOM_NAME_MAX_LENGTH,
  WEBSITE_STATUS_ON,
  DEFAULT_BUCKET_NAME
} from '../../../constants';


class SiteCreateDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      custom: false,
      error: '',
      inProgress: false
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
    const {onHide} = this.props;
    onHide();
  };

  submit = async () => {
    this.setState({error: ''});

    const {name, custom} = this.state;
    const sName = name.trim();

    if (custom) {
      if (!testCustomName(sName)) {
        this.setState({error: _t('site-create-dialog.error-not-valid-name-custom')});
        return;
      }
    } else {
      if (!testName(sName)) {
        this.setState({error: _t('site-create-dialog.error-not-valid-name')});
        return;
      }
    }

    const fullName = custom ? sName : `${sName}${NAME_SUFFIX}`;

    this.setState({inProgress: true});

    const [, checkList] = await to(Website.fetchList({name: fullName}));

    if (!checkList) {
      this.setState({error: _t('g.server-error')});
      return;
    }

    if (checkList.length > 0) {
      this.setState({error: _t('site-create-dialog.error-not-available'), inProgress: false});
      return;
    }

    const site = new Website({name: fullName, custom, bucket: DEFAULT_BUCKET_NAME, status: WEBSITE_STATUS_ON});
    const [err,] = await to(site.save());

    if (err) {
      this.setState({error: _t('g.server-error'), inProgress: false});
      return;
    }

    this.setState({inProgress: false});

    const {onSave} = this.props;
    onSave();

    message.success(_t('site-create-dialog.success'));
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

    this.setState({custom: false, name: '', error: ''});
  };

  render() {
    const {custom, name, error, inProgress} = this.state;

    return (
      <>
        <Modal show onHide={this.hide} className="site-create-dialog">
          <Modal.Header closeButton>
            <Modal.Title>{_t('site-create-dialog.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="d-flex justify-content-end">
              {!custom &&
              <Button variant="link" size="sm" onClick={this.switchToCustomDomain}>
                {_t('site-create-dialog.custom-name-btn-label')}
              </Button>
              }
              {custom &&
              <Button variant="link" size="sm" onClick={this.switchToSubDomain}>
                {_t('site-create-dialog.name-btn-label')}
              </Button>
              }
            </div>

            <div className="domain-input">
              {!custom &&
              <InputGroup>
                <FormControl autoFocus id="txt-name" maxLength={NAME_MAX_LENGTH}
                             placeholder={_t('site-create-dialog.name-placeholder')}
                             value={name} onChange={this.nameChanged} className={error ? 'is-invalid' : ''}/>
                <InputGroup.Append>
                  <InputGroup.Text>{NAME_SUFFIX}</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              }

              {custom &&
              <InputGroup>
                <FormControl autoFocus id="txt-name" maxLength={CUSTOM_NAME_MAX_LENGTH}
                             placeholder={_t('site-create-dialog.custom-name-placeholder')}
                             value={name} onChange={this.nameChanged} className={error ? 'is-invalid' : ''}/>
              </InputGroup>
              }

              <div className="form-feedback">
                {error && <FormText className="text-danger">{error}</FormText>}
              </div>

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

SiteCreateDialog.defaultProps = {
  onSave: () => {
  },
  onHide: () => {
  }
};

SiteCreateDialog.propTypes = {
  user: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  onHide: PropTypes.func
};

export default SiteCreateDialog;