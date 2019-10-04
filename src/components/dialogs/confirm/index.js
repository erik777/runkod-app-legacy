import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button} from 'react-bootstrap';

import {_t} from '../../../i18n';

class ConfirmDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }

  cancel = () => {
    this.setState({visible: false});
    const {onCancel} = this.props;
    onCancel();
  };

  confirm = () => {
    this.setState({visible: false});
    const {onConfirm} = this.props;
    onConfirm();
  };

  clicked = () => {
    this.setState({visible: true});
  };

  render() {
    const {children, title} = this.props;
    const {visible} = this.state;

    const newChildren = React.cloneElement(children, {
      onClick: this.clicked
    });

    return (
      <>
        {visible &&
        <Modal show onHide={this.cancel}>
          {title && <Modal.Body>{title}</Modal.Body>}
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cancel}>
              {_t('g.cancel')}
            </Button>
            <Button variant="primary" onClick={this.confirm}>
              {_t('g.confirm')}
            </Button>
          </Modal.Footer>
        </Modal>
        }
        {newChildren}
      </>
    );
  }
}

ConfirmDialog.defaultProps = {
  title: null,
  onConfirm: () => {
  },
  onCancel: () => {
  }
};

ConfirmDialog.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

export default ConfirmDialog;