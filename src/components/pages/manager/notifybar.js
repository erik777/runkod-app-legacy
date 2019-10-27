import React, {Component} from 'react';

import PropTypes from 'prop-types';

import ExampleProjectDialog from '../../dialogs/example-project';

import {closeSvg, infoSvg} from '../../../svg';

import {_t} from '../../../i18n';

class EpFlagBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: false
    }
  }

  toggleModal = () => {
    const {modal} = this.state;
    this.setState({modal: !modal});
  };

  render() {
    const {modal} = this.state;
    const {invalidateUiFlag} = this.props;

    return (
      <div className="notify-bar clickable">
        {infoSvg}

        <span className="text-content" onClick={this.toggleModal}>
          {_t('manager.notify-bar.starter-project')}
        </span>

        <div className="close-bar">
          <span className="close-button" onClick={() => {
            invalidateUiFlag('ep');
          }}>{closeSvg}</span>
        </div>

        {modal && <ExampleProjectDialog {...this.props} onHide={this.toggleModal}/>}
      </div>
    )
  }
}

EpFlagBar.propTypes = {
  invalidateUiFlag: PropTypes.func.isRequired,
};

class NotifyBar extends Component {
  render() {
    const {ui} = this.props;

    if (ui.epFlag) {
      return <EpFlagBar {...this.props} />
    }

    return null;
  }
}

NotifyBar.defaultProps = {};

NotifyBar.propTypes = {
  ui: PropTypes.shape({
    epFlag: PropTypes.bool.isRequired,
  }).isRequired
};

export default NotifyBar;