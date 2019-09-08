import React, {Component} from 'react';
import PropTypes from 'prop-types';


import _c from '../../../utils/fix-class-names'


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

    return <div className={_c(`checkbox_ ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`)}
                onClick={this.clicked}>
      {checked && checkedSvg}
    </div>;
  }
}

CheckBox.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {

  }
};

CheckBox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckBox;
