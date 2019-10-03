import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {OverlayTrigger, Tooltip as RealTooltip} from 'react-bootstrap';

class Tooltip extends Component {

  render() {
    const {children, title, delay, dir} = this.props;

    return (
      <OverlayTrigger
        delay={delay}
        placement={dir}
        overlay={
          <RealTooltip>
            {title}
          </RealTooltip>
        }>
        {children}
      </OverlayTrigger>
    )
  }
}

Tooltip.defaultProps = {
  dir: 'right',
  delay: 2000
};

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  dir: PropTypes.string,
  delay: PropTypes.number
};

export default Tooltip;
