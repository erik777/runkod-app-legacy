import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, InputGroup, FormControl, FormText} from 'react-bootstrap';

import to from 'await-to-js';

import isEqual from 'react-fast-compare';

import DnsRecord from '../../helper/dns-record';

import {Project, Msg} from '../../../model';

import {getUsername} from '../../../blockstack-config';

import {_t} from '../../../i18n';

import testCustomName from '../../../helper/test-custom-name';

import {extractDomain, verifyDomain} from '../../../backend';

import {getUserPublicKey} from "../../../blockstack-config";

import md5 from 'blueimp-md5';

import {
  CUSTOM_NAME_MAX_LENGTH,
  PROJECT_STATUS_ON,
  DEFAULT_TAG_NAME
} from '../../../constants';
import {checkedSvg, infoSvg} from "../../../svg";

class CustomProjectForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      rootName: '',
      subName: '',
      isNew: false,
      error: '',
      inProgress: false,
      msgId: '',
      verification: '',
      canVerify: false,
      done: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState);
  };

  switch = () => {
    const {switchFn} = this.props;
    switchFn();
  };

  nameChanged = (e) => {
    this.setState({name: e.target.value.toLowerCase()});
  };

  error = (msg) => {
    this.setState({error: msg, inProgress: false});
  };

  getBusy = () => {
    this.setState({error: '', inProgress: true});
  };

  beIdle = (error = '') => {
    this.setState({error, inProgress: false});
  };

  next = async () => {
    this.getBusy();

    const {name} = this.state;
    const sName = name.trim();

    if (!testCustomName(sName)) {
      this.error(_t('new-project-dialog.error-not-valid-name-custom'));
      return;
    }

    // Get root domain name from user input
    let [err, resp] = await to(extractDomain(sName));
    if (err) {
      this.beIdle(_t('g.server-error'));
      return;
    }
    const {domain, subDomain} = resp;

    this.setState({subName: subDomain, rootName: domain});

    // User identifier from public key
    const uid = md5(getUserPublicKey());

    // Communication message
    const msg = new Msg({
      payload: {name: domain, uid}
    });

    [err, resp] = await to(msg.save());
    if (err) {
      this.beIdle(_t('g.server-error'));
      return;
    }

    // Add msg id to state. Will be used on next screen
    this.setState({msgId: resp._id});

    [err, resp] = await to(verifyDomain(resp._id));
    if (err) {
      this.beIdle(_t('g.server-error'));
      return;
    }

    if (resp.error) {
      this.beIdle(resp.msg);
      return;
    }

    this.beIdle();

    if (resp.verified) {
      this.submit();
    } else {
      this.setState({verification: resp.txt});
    }
  };

  verify = async () => {
    this.getBusy();

    const {msgId} = this.state;

    let [err, resp] = await to(verifyDomain(msgId));
    if (err) {
      this.beIdle(_t('g.server-error'));
      return;
    }

    if (resp.verified === 1) {
      this.submit();
      return;
    }

    if (resp.verified === 0) {
      this.beIdle(_t('1'));
      return;
    }

    this.beIdle();
  };

  submit = async () => {
    this.getBusy();

    const {name} = this.state;
    const sName = name.trim();

    const [, checkList] = await to(Project.fetchList({name: sName}));

    if (!checkList) {
      this.beIdle(_t('g.server-error'));
      return;
    }

    let p;

    if (checkList.length > 0) {
      p = checkList[0];
      const {attrs: pAttrs} = p;

      if (!(pAttrs.deleted && p.isOwnedByUser())) {
        this.beIdle(_t('new-project-dialog.error-not-available'));
        return;
      }
    }

    // User identifier from public key
    const uid = md5(getUserPublicKey());

    let isNew = true;

    if (p) {
      p.update({deleted: false});
      isNew = false;
    } else {
      p = new Project({
        name: sName,
        username: getUsername(),
        custom: true,
        tag: DEFAULT_TAG_NAME,
        status: PROJECT_STATUS_ON,
        deleted: false,
        uid
      });
    }

    const [err,] = await to(p.save());

    if (err) {
      this.beIdle(_t('g.server-error'));
      return;
    }

    this.beIdle();
    this.setState({isNew, done: true});
  };

  done = () => {
    const {isNew} = this.state;
    const {onDone} = this.props;

    onDone(isNew);
  };

  render() {
    const {name, subName, rootName, error, inProgress, verification, canVerify, done} = this.state;

    if (done) {
      return <div className="new-project-form done-custom">
        <div className="title">{checkedSvg} {_t('new-project-dialog.success')}</div>
        <div className="sub-title">{infoSvg} {_t('new-project-dialog.custom-done-title')}</div>
        <div className="description"
             dangerouslySetInnerHTML={{__html: _t('new-project-dialog.custom-done-description', {n: name})}}/>
        <DnsRecord name={subName || '@'} value={'178.128.141.114'} {...this.props} />
        <Button variant="primary" onClick={this.done}>{_t('g.finish')}</Button>
      </div>;
    }

    if (verification) {
      return <>
        <div className="new-project-form verification">
          <div className="title">{_t('new-project-dialog.verification-main-title')}</div>
          <div className="sub-title"
               dangerouslySetInnerHTML={{__html: _t('new-project-dialog.verification-title', {n: rootName})}}/>
          <div className="description">{_t('new-project-dialog.verification-description')}</div>
          <DnsRecord name="@" value={verification} {...this.props} />
          <div className="controls d-flex align-items-center justify-content-between">
            <label> <input type="checkbox" onChange={(e) => {
              this.setState({canVerify: e.target.checked})
            }}/> {_t('new-project-dialog.verification-confirm-label')}</label>
            <Button variant="primary" disabled={!canVerify} onClick={this.verify}>
              {inProgress ? '...' : _t('g.next')}
            </Button>
          </div>
          {(() => {
            if (error === '1') {
              return <div className="error-feedback">
                <p className="text-danger">{_t('new-project-dialog.verification-error')}</p>
                <p className="text-muted">{_t('new-project-dialog.verification-error-note')}</p>
              </div>
            }
            if (error) {
              return <div className="error-feedback"><p className="text-danger">{error}</p></div>;
            }
          })()}
        </div>
      </>;
    }

    return <div className="new-project-form">
      <div className="name-input">
        <InputGroup>
          <FormControl autoFocus id="txt-name" maxLength={CUSTOM_NAME_MAX_LENGTH} autoComplete="off"
                       placeholder={_t('new-project-dialog.custom-name-placeholder')}
                       value={name} onChange={this.nameChanged} className={error ? 'is-invalid' : ''}/>
        </InputGroup>
        <div className="form-feedback">
          {error && <FormText className="text-danger">{error}</FormText>}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Button variant="link" size="sm" onClick={this.switch}>
          <u>{_t('new-project-dialog.name-btn-label')}</u>
        </Button>
        <Button variant="primary" onClick={this.next} disabled={inProgress}>
          {inProgress ? '...' : _t('g.next')}
        </Button>
      </div>
    </div>;
  }
}

CustomProjectForm.propTypes = {
  switchFn: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};


export default CustomProjectForm;
