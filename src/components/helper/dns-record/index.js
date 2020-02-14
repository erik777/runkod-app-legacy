import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {_t} from '../../../i18n';

class DnsRecord extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {name, value} = this.props;

    return <div className="dns-record">
      <div className="record-row">
        <div className="record-label">{_t('new-project-dialog.verification-record-name-label')}</div>
        <div className="record-value user-select">{name}</div>
      </div>
      <div className="record-row">
        <div className="record-label">{_t('new-project-dialog.verification-record-value-label')}</div>
        <div className="record-value user-select">{value}</div>
      </div>
    </div>
  }
}

DnsRecord.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};


export default DnsRecord;
