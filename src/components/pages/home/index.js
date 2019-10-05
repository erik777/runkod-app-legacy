/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import {Button, Container, Row, Col, Nav, Navbar} from 'react-bootstrap';

import ContactDialog from '../../dialogs/contact'

import cloudImg from '../../../images/cloud.png'
import logoImg from '../../../images/logo-white.png'
import dnsImg from '../../../images/dns-settings.png'

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
  codeSvg
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
    const {user, location} = this.props;

    return <Navbar variant="dark" expand="lg" className="main-nav">
      <Container>
        <Navbar.Brand><Link to="/"><img src={logoImg} alt="Logo"/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/#features">Features</Nav.Link>
            <Nav.Link href="/#get-started">Get Started</Nav.Link>
            <Link className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`} to="/faq">FAQ</Link>
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
              <li><a href="/faq">FAQ</a></li>
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
            <a href="https://steemit.com/runkod" title="Steem" target="_blank"
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


class FaqPage extends Component {

  render() {
    return (
      <div className="faq-page user-select">
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
                <img src={dnsImg} className="sc-img" alt="Dns Settings"/>
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
      </div>
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
                  <p>Lorem Ipsum dolor sit amet has been the industry's standard dummy text ever since the 1500s.  Lorem Ipsum has been
                    the industry's standard.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{networkSvg}</span>
                  <h5>Decentralized</h5>
                  <p>Naturally decentralized. Runkod works top on Blockstack's decentralized high-performance storage
                    system "Gaia". Lorem Ipsum dolor sit.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{infinitySvg}</span>
                  <h5>Unlimited</h5>
                  <p>You can create as many project you want. No bandwidth limits.Lorem Ipsum dolor sit amet has been the industry's standard dummy. </p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{gemSvg}</span>
                  <h5>Easy</h5>
                  <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been
                    the industry's standard.</p>
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
            <div className="video"></div>
          </div>
        </div>
        <div className="testimonials" id="testimonials">
          <div className="container">
            <h2>Testimonials</h2>
            <Row>
              <Col md={6} lg={4}>
                <div className="testimonial">
                  <p className="quote">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                  <div className="author">
                    <img className="avatar" src="https://randomuser.me/api/portraits/men/81.jpg" alt="avatar"/>
                    <div className="name">
                      <h5>Niggel Banks</h5>
                      <span>Full Stack Developer</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="testimonial">
                  <p className="quote">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                  <div className="author">
                    <img className="avatar" src="https://randomuser.me/api/portraits/women/9.jpg" alt="avatar"/>
                    <div className="name">
                      <h5>Peggy Brown</h5>
                      <span>UI/UX Designer</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="testimonial">
                  <p className="quote">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                  <div className="author">
                    <img className="avatar" src="https://randomuser.me/api/portraits/men/60.jpg" alt="avatar"/>
                    <div className="name">
                      <h5>Byron Tucker</h5>
                      <span>Frontend Developer</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
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