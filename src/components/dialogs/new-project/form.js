import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, InputGroup, FormControl, FormText} from 'react-bootstrap';

import to from 'await-to-js';

import isEqual from 'react-fast-compare';

import {Project} from '../../../model';

import {getUsername} from '../../../blockstack-config';

import {_t} from '../../../i18n';

import testName from '../../../helper/test-name';

import {
  NAME_SUFFIX,
  NAME_MAX_LENGTH,
  PROJECT_STATUS_ON,
  DEFAULT_TAG_NAME
} from '../../../constants';

class ProjectForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      fullName: '',
      isNew: false,
      error: '',
      inProgress: false,
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

  getBusy = () => {
    this.setState({error: '', inProgress: true});
  };

  beIdle = (error = '') => {
    this.setState({error, inProgress: false});
  };

  submit = async () => {
    this.getBusy();

    const {name} = this.state;
    const sName = name.trim();

    if (!testName(sName)) {
      this.beIdle(_t('new-project-dialog.error-not-valid-name'));
      return;
    }

    const fullName = `${sName}${NAME_SUFFIX}`;

    const [, checkList] = await to(Project.fetchList({name: fullName}));

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

    let isNew = true;

    if (p) {
      p.update({deleted: false});
      isNew = false;
    } else {
      p = new Project({
        name: fullName,
        username: getUsername(),
        custom: false,
        tag: DEFAULT_TAG_NAME,
        status: PROJECT_STATUS_ON,
        deleted: false
      });
    }

    const [err,] = await to(p.save());

    if (err) {
      this.beIdle(_t('g.server-error'));
      return;
    }

    this.beIdle();
    this.setState({fullName, isNew, done: true});
  };

  done = () => {
    const {isNew} = this.state;
    const {onDone} = this.props;

    onDone(isNew);
  };

  render() {
    const {name, fullName, error, inProgress, done} = this.state;

    if (done) {
      return <div className="new-project-form done">
        <div className="title">{_t('new-project-dialog.success')}</div>
        <div className="sub-title">{fullName}</div>
        <Button variant="primary" onClick={this.done}>{_t('g.done')}</Button>
      </div>;
    }

    return <div className="new-project-form">
      <div className="name-input">
        <InputGroup>
          <FormControl autoFocus id="txt-name" maxLength={NAME_MAX_LENGTH} autoComplete="off"
                       placeholder={_t('new-project-dialog.name-placeholder')}
                       value={name} onChange={this.nameChanged} className={error ? 'is-invalid' : ''}/>
          <InputGroup.Append>
            <InputGroup.Text>{NAME_SUFFIX}</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <div className="form-feedback">
          {error && <FormText className="text-danger">{error}</FormText>}
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <Button variant="link" size="sm" onClick={this.switch}>
          <u>{_t('new-project-dialog.custom-name-btn-label')}</u>
        </Button>
        <Button variant="primary" onClick={this.submit} disabled={inProgress}>
          {inProgress ? '...' : _t('g.next')}
        </Button>
      </div>
    </div>;
  }
}

ProjectForm.propTypes = {
  switchFn: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default ProjectForm;
