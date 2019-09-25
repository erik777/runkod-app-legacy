/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import {Button, Container, Row, Col, Nav, Navbar, Accordion, Card} from 'react-bootstrap';

import cloudImg from '../../../images/cloud.png'
import logoImg from '../../../images/logo-rect-white.png'
import dnsImg from '../../../images/dns-settings.png'

import {userSession} from '../../../blockstack-config';

import {twitterSvg, facebookSvg, mediumSvg, youtubeSvg, discordSvg, slackSvg} from '../../../svg';


class LoginButton extends Component {
  clicked = () => {
    userSession.redirectToSignIn();
  };

  render() {
    const {children} = this.props;

    return React.cloneElement(children, {
      onClick: this.clicked
    });
  }
}

LoginButton.propTypes = {
  children: PropTypes.node.isRequired
};

class LogoutButton extends Component {
  clicked = () => {
    const {logout} = this.props;
    userSession.signUserOut();
    logout();
  };

  render() {
    const {children} = this.props;

    return React.cloneElement(children, {
      onClick: this.clicked
    });
  }
}

LogoutButton.propTypes = {
  children: PropTypes.node.isRequired,
  logout: PropTypes.func.isRequired
};

class Header extends Component {

  render() {
    const {user} = this.props;

    return <Navbar variant="dark" expand="lg" className="main-nav">
      <Container>
        <Navbar.Brand><Link to="/"><img src={logoImg} alt="Logo"/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Features</Nav.Link>
            <Nav.Link href="#link">Get Started</Nav.Link>
            <Link className="nav-link" to="/faq">FAQ</Link>
            <Nav.Link href="#link">Blockstack</Nav.Link>
            <div className="controls">
              {(() => {
                if (user === null) {
                  return <>
                    <LoginButton {...this.props}>
                      <Button variant="primary" className="login-btn">Login</Button>
                    </LoginButton>
                    <LoginButton {...this.props}>
                      <Button variant="info" className="sign-up-btn">Sign Up</Button>
                    </LoginButton>
                  </>
                }
                return <LogoutButton {...this.props}>
                  <Button variant="info" className="sign-out-btn">Logout</Button>
                </LogoutButton>
              })()}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  }
}


Header.defaultProps = {};

Header.propTypes = {
  user: PropTypes.shape({}),
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

class Footer extends Component {
  render() {
    return <footer className="main-footer">
      <div className="container">
        <Row>
          <Col lg={3} sm={6}>
            <h4>Runkod</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Get Started</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </Col>

          <Col lg={3} sm={6}>
            <h4>Blockstack</h4>
            <ul>
              <li><a href="#">What is Blockstack?</a></li>
              <li><a href="#">Gaia Storage</a></li>
            </ul>
          </Col>

          <Col lg={3} sm={6}>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Contact</a></li>
            </ul>
          </Col>

          <Col lg={3} sm={6}>
            <a href="" className="social-link">
              {twitterSvg}
            </a>
            <a href="" className="social-link">
              {facebookSvg}
            </a>
            <a href="" className="social-link">
              {youtubeSvg}
            </a>
            <a href="" className="social-link">
              {mediumSvg}
            </a>

          </Col>
        </Row>


      </div>
    </footer>
  }
}

class FaqPage extends Component {

  render() {
    return (
      <>
        <Header {...this.props}/>
        <div className="faq">
          <div className="container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h5 className="item-header"> DNS Settings For Custom Domains</h5>
              <div className="item-body">
                <p> First, go to the DNS settings page of your domain provider</p>
                <p>Then, Create an A record: type @ for "Host" and paste 178.128.141.114 under "Value" or "Points
                  to"</p>

                <img src={dnsImg} className="sc-img"/>
                <p>If you want to redirect www subdomain add CNAME record like above.</p>

                <p className="text-muted">Please keep in mind, depending on your dns provider it may take some time to
                  activate new settings.</p>

              </div>
            </div>
            <div className="faq-item">
              <h5 className="item-header"> Is there any coding Limitations?</h5>
              <div className="item-body">
                <p>There are only 2 limitations.</p>
                <p>1- File paths in asset files (e.g. javascript, css) must be absolute. </p>
                <p>2- Directory index files (index.html) must be less than 128 KB in size.</p>
              </div>
            </div>
            <div className="faq-item">
              <h5 className="item-header"> How Runkod Serve Files?</h5>
              <div className="item-body">
                Runkod creates a secure bridge between gaia storage and visitors....
              </div>
            </div>
          </div>
        </div>
        <Footer {...this.props} />
      </>
    )
  }
}

export {FaqPage};


class HomePage extends Component {
  goManager = () => {
    const {history} = this.props;
    history.push('/manager');
  };

  render() {
    const {user} = this.props;

    return (
      <>
        <Header {...this.props}/>
        <div className="hero">
          <Container>
            <Row>
              <Col sm={12} md={9} lg={6} className="c-1">
                <div className="content">
                  <h1>Decentralized Web Hosting</h1>
                  <p>Runkod provides decentralized hosting platform and management tools for modern javascript
                    applications and static web publishing.
                  </p>
                  {(() => {
                    if (user === null) {
                      return <LoginButton {...this.props}>
                        <Button variant="primary" className="launch-btn" onClick={this.login}>Launch your first
                          project</Button>
                      </LoginButton>

                    }
                    return <Button variant="primary" className="launch-btn" onClick={this.goManager}>Go to management
                      console</Button>
                  })()}
                </div>
              </Col>
              <Col lg={6} className="c-2">
                <img src={cloudImg} alt="Hero"/>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="features">
          <div className="container">
            <h2>Why you should use Runkod?</h2>

            <div className="row">
              <Col md={6} lg={4}>
                <div className="feature">
                  <h5>Free</h5>
                  <p>whether you are using a custom domain or not, ssl certificate for your website is ready in
                    seconds.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <h5>Decentralized</h5>
                  <p>Naturally decentralized. Runkod works top on Blockstack's decentralized high-performance storage
                    system "Gaia".</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <h5>Unlimited</h5>
                  <p>We don't store your files. You store your files. Runkod runs on Blockstack's gaia storage.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <h5>Easy</h5>
                  <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been
                    the industry's standard dummy text</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <h5>Instant SSL</h5>
                  <p>Even SSL certificates are free. Whether you are using a custom domain or not, ssl certificate for
                    your website is ready in seconds.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <h5>Open Source</h5>
                  <p>All Runkod code is open sourced on github under MIT licence. Feel free to view code and let us know
                    your feedback.</p>
                </div>
              </Col>

            </div>
          </div>

        </div>
        <div className="get-started">
          <div className="container">
            <h2>Get Started</h2>

            <div className="video">

            </div>
          </div>
        </div>
        <Footer {...this.props} />
      </>
    )
  }
}

HomePage.defaultProps = {};

HomePage.propTypes = {
  user: PropTypes.shape({}),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};


export {HomePage};