import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import HomePage from './page';

class HomeContainer extends Component {
  render() {
    return <HomePage {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user
});

export default connect(
  mapStateToProps,
  {}
)(HomeContainer)