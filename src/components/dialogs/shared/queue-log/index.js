import React, {Component} from 'react';

import PropTypes from 'prop-types';

class QueueLog extends Component {
  list = React.createRef();

  componentDidUpdate() {
    const el = this.list.current;
    el.scrollTop = el.scrollHeight;
  }

  render() {
    const {logs} = this.props;

    return <div className="queue-log" ref={this.list}>
      {logs.map((x, i) => <div key={i} className={`list-item list-item-${x.type}`}>{x.msg}</div>)}
    </div>
  }
}

QueueLog.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired
  })).isRequired
};

export default QueueLog;
