import React, {Component} from 'react';
import {Website} from '../../../model';
import {Button} from "react-bootstrap";

import PropTypes from 'prop-types';

class ManagerPage extends Component {

  fetchWebsites = async () => {
    const websites = await Website.fetchOwnList({sort: 'createdAt'});
    console.log(websites);
  };

  componentDidMount() {
    // this.fetchWebsites();
  }

  render() {

    return (
      <div className="manager-page">
        <div className="header"/>
        <div className="page-content">
          <div className="no-sites">
            <p className="message-header">
              Nothing here
            </p>
            <Button>Create your first website</Button>
          </div>
        </div>
      </div>
    )
  }
}

ManagerPage.defaultProps = {};

ManagerPage.propTypes = {
  user: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default ManagerPage;