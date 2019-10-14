/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import {Button, Container, Row, Col, Nav, Navbar} from 'react-bootstrap';

import ContactDialog from '../../dialogs/contact';

import cloudImg from '../../../images/cloud.png';

import logoImg from '../../../images/logo-white.png';

import {userSession} from '../../../blockstack-config';

import {
  twitterSvg,
  facebookSvg,
  steemSvg,
  youtubeSvg,
  discordSvg,
  telegramSvg,
  slackSvg,
  coctailSvg,
  networkSvg,
  infinitySvg,
  gemSvg,
  shieldSvg,
  codeSvg,
  githubSvg
} from '../../../svg';


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
        <Navbar.Brand><Link to="/"><img src={logoImg} alt="Logo"/></Link>beta</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/#features">Features</Nav.Link>
            <Nav.Link href="/#get-started">Get Started</Nav.Link>
            <Nav.Link href="https://blockstack.org/what-is-blockstack/" target="_blank"
                      rel="noopener noreferrer">Blockstack</Nav.Link>
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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
};

class Footer extends Component {

  contact = (e) => {
    e.preventDefault();

    const {toggleUiProp} = this.props;
    toggleUiProp('contact');
  };

  render() {
    const {ui} = this.props;

    return <footer className="main-footer">
      <div className="container">
        <Row>
          <Col lg={3} sm={6}>
            <h4>Runkod</h4>
            <ul>
              <li><a href="/#features">Features</a></li>
              <li><a href="/#get-started">Get Started</a></li>
            </ul>
          </Col>
          <Col lg={3} sm={6}>
            <h4>Blockstack</h4>
            <ul>
              <li><a href="https://blockstack.org/what-is-blockstack/" target="_blank"
                     rel="noopener noreferrer">What is Blockstack?</a></li>
              <li><a href="https://github.com/blockstack/gaia" target="_blank"
                     rel="noopener noreferrer">Gaia Storage</a></li>
            </ul>
          </Col>
          <Col lg={3} sm={6}>
            <h4>Support</h4>
            <ul>
              <li><a href="#" onClick={this.contact}>Contact</a></li>
            </ul>
          </Col>
          <Col lg={3} sm={6}>
            <a href="https://twitter.com/runkodapp" title="Twitter" target="_blank"
               rel="noopener noreferrer" className="social-link">
              {twitterSvg}
            </a>
            <a href="https://www.facebook.com/Runkod-116829083049401/" title="Facebook" target="_blank"
               rel="noopener noreferrer" className="social-link">
              {facebookSvg}
            </a>
            <a href="https://www.youtube.com/channel/UCOxqxLdSAjt7QD2NKjIavOQ" title="Youtube" target="_blank"
               rel="noopener noreferrer" className="social-link">
              {youtubeSvg}
            </a>
            <a href="https://steemit.com/@runkod" title="Steem" target="_blank"
               rel="noopener noreferrer" className="social-link">
              {steemSvg}
            </a>
            <a href="https://runkod.slack.com" title="Slack" target="_blank"
               rel="noopener noreferrer" className="social-link">
              {slackSvg}
            </a>
            <a href="https://discord.gg/Qk57NDS" title="Discord" target="_blank"
               rel="noopener noreferrer" className="social-link">
              {discordSvg}
            </a>
            <a href="https://t.me/joinchat/AYcx-xLSlNfCqUNFKEExsQ" title="Telegram" target="_blank"
               rel="noopener noreferrer" className="social-link">
              {telegramSvg}
            </a>
            <a href="https://github.com/runkod" title="Github" target="_blank"
               rel="noopener noreferrer" className="social-link">
              {githubSvg}
            </a>
          </Col>
        </Row>
      </div>
      {ui.contact && <ContactDialog  {...this.props}  />}
    </footer>
  }
}

Footer.propTypes = {
  ui: PropTypes.shape({contact: PropTypes.bool.isRequired}),
  toggleUiProp: PropTypes.func.isRequired
};


class HomePage extends Component {
  goManager = () => {
    const {history} = this.props;
    history.push('/manager');
  };

  render() {
    const {user} = this.props;

    return (
      <div className="home-page user-select">
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
        <div className="features" id="features">
          <div className="container">
            <h2>Why you should use Runkod?</h2>

            <div className="row">
              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{coctailSvg}</span>
                  <h5>Free</h5>
                  <p>Completely Free service and hosting, powered by Blockstack. Runkod will offer free tools
                    for you to quickly start building decentralized apps.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{networkSvg}</span>
                  <h5>Decentralized</h5>
                  <p> Runkod works top on Blockstack's high-performance storage
                    system "Gaia". It is decentralized yet gives you complete control of your data.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{infinitySvg}</span>
                  <h5>Unlimited</h5>
                  <p>You can create as many project you want. No bandwidth limits. Runkod believes in being open and
                    unlimited. No more limitations and hidden fees.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{gemSvg}</span>
                  <h5>Easy</h5>
                  <p>Straightforward and intuitive user interface. Developers can setup and upload their decentralised
                    applications with click of button.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{shieldSvg}</span>
                  <h5>Instant SSL</h5>
                  <p>Even SSL certificates are free. Whether you are using a custom domain or not, ssl certificate for
                    your website is ready in seconds.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{codeSvg}</span>
                  <h5>Open Source</h5>
                  <p>All Runkod code is open sourced on github under MIT licence. Feel free to view code and let us know
                    your feedback.</p>
                </div>
              </Col>

            </div>
          </div>

        </div>
        <div className="get-started" id="get-started">
          <div className="container">
            <h2>Get Started</h2>
            <div className="video">
              <iframe title="Getting started with Runkod" src="https://www.youtube.com/embed/abWsiwslrrc"
                      frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen/>
            </div>
          </div>
        </div>
        {/*
        <div className="testimonials" id="testimonials">
          <div className="container">
            <h2>Testimonials</h2>
            <Row>
              <Col md={6} lg={4}>
                <div className="testimonial">
                  <p className="quote">Happy to bring my apps to a new host!</p>
                  <div className="author">
                    <img className="avatar" src="https://randomuser.me/api/portraits/men/81.jpg" alt="avatar"/>
                    <div className="name">
                      <h5>Lorem Ipsum</h5>
                      <span>Developer</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="testimonial">
                  <p className="quote">Very cool... Cant wait to see it and use it. It would be awesome to make that easier by providing a simple 'save to RunKod' so that people could run their own.</p>
                  <div className="author">
                    <img className="avatar" src="https://randomuser.me/api/portraits/women/9.jpg" alt="avatar"/>
                    <div className="name">
                      <h5>Dolor Sit</h5>
                      <span>Developer</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="testimonial">
                  <p className="quote">Very intrigued by this project. Having users host the apps themselves would be a radically decentralized approach.</p>
                  <div className="author">
                    <img className="avatar" src="https://randomuser.me/api/portraits/men/60.jpg" alt="avatar"/>
                    <div className="name">
                      <h5>Foo Bar</h5>
                      <span>Developer</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        */}
        <Footer {...this.props} />
      </div>
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