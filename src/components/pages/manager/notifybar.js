import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {closeSvg, infoSvg} from '../../../svg';

class EpFlagBar extends Component {
  render() {
    const {invalidateUiFlag} = this.props;

    return (
      <div className="notify-bar clickable">
        {infoSvg}

        <span className="text-content">
          Our starter project can help you to understand how Runkod works. Click here to see instructions.
        </span>

        <div className="close-bar">
          <span className="close-button" onClick={() => {
            invalidateUiFlag('ep');
          }}>{closeSvg}</span>
        </div>
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