import React, {Component} from 'react';
import PropTypes from "prop-types";


import {checkedSvg} from "../../../svg";

class CheckBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      iChecked: false
    }
  }

  clicked = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {disabled} = this.props;
    if (disabled) return;

    const {iChecked} = this.state;
    const iChecked2 = !iChecked;
    this.setState({iChecked: iChecked2}, () => {
      const {onChange} = this.props;
      onChange(iChecked2);
    });
  };

  render() {

    const {checked, disabled} = this.props;

    return <div className={`checkbox_ ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
                onClick={this.clicked}>
      {checked && checkedSvg}
    </div>;
  }
}

CheckBox.defaultProps = {
  disabled: false
};

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default CheckBox;
