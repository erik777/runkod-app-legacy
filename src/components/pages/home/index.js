import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, Container, Row, Col, Nav, Navbar} from 'react-bootstrap';

import cloudImg from '../../../images/cloud.png'
import logoImg from '../../../images/logo-rect-white.png'

import {userSession} from '../../../blockstack-config';


class HomePage extends Component {
  login = (e) => {
    e.preventDefault();

    const {user} = this.props;

    if (userSession.isUserSignedIn() && user !== null) {
      const {history} = this.props;
      history.push('/manager');
      return;
    }

    userSession.redirectToSignIn();
  };

  logout = () => {
    const {logout} = this.props;
    userSession.signUserOut();
    logout();
  };

  render() {
    const {user} = this.props;

    return (
      <>
        <Navbar variant="dark" expand="lg" className="main-nav">
          <Container>
            <Navbar.Brand href="#home"><img src={logoImg}/> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#home">Features</Nav.Link>
                <Nav.Link href="#link">Get Started</Nav.Link>
                <Nav.Link href="#link">FAQ</Nav.Link>
                <Nav.Link href="#link">Blockstack</Nav.Link>
                <div className="buttons">
                  {(() => {
                    if (user === null) {
                      return <>
                        <Button variant="primary" className="login-btn" onClick={this.login}>Login</Button>
                        <Button variant="info" className="sign-up-btn" onClick={this.login}>Sign Up</Button>
                      </>
                    }

                    return <Button variant="info" className="sign-out-btn" onClick={this.logout}>Logout</Button>
                  })()}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="hero">
          <Container>
            <Row>
              <Col sm={12} md={9} lg={6}>
                <div className="content">
                  <h1>Decentralized Web Hosting</h1>
                  <p>Runkod provides decentralized hosting platform and management tools for modern javascript
                    applications
                    and static web publishing.
                  </p>
                  {(() => {
                    if (user === null) {
                      return <Button variant="primary" className="launch-btn" onClick={this.login}>Launch your first
                        project</Button>
                    }

                    return <Button variant="primary" className="launch-btn" onClick={this.login}>Go to management
                      console</Button>
                  })()}
                </div>
              </Col>
              <Col lg={6}>
                <img src={cloudImg}/>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

HomePage.defaultProps = {};

HomePage.propTypes = {
  user: PropTypes.shape({}),
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};


export default HomePage;