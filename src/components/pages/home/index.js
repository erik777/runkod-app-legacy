/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import {Button, Container, Row, Col, Nav, Navbar} from 'react-bootstrap';

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

    if (window.fcWidget) {
      window.fcWidget.open({});
    }
  };

  render() {
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
    </footer>
  }
}

Footer.propTypes = {
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
                    return <Button variant="primary" className="launch-btn" onClick={this.goManager}>Go to Management
                      Console</Button>
                  })()}
                </div>
                <div className="ph-badge">
                  <a
                    href="https://www.producthunt.com/posts/runkod?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-runkod"
                    target="_blank" rel="noopener noreferrer"><img
                    src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=174044&theme=dark&period=daily"
                    alt="Runkod - Decentralized web hosting | Product Hunt Embed"
                    style={{width: '250px', height: '54px',}}
                    width="250px" height="54px"/></a>

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
                  <p>Completely free services and hosting, powered by Blockstack. Runkod offers handy tools for you
                    to quickly deploy decentralized applications.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{networkSvg}</span>
                  <h5>Decentralized</h5>
                  <p>Runkod works on top of Blockstack's high-performance storage system "Gaia". It is decentralized and
                    gives you full control of your data and storage.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{infinitySvg}</span>
                  <h5>Unlimited</h5>
                  <p>You can create as many projects as you want. No bandwidth limits. We believe in being open and
                    unlimited. No more limitations and hidden fees.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{gemSvg}</span>
                  <h5>Easy</h5>
                  <p>Straightforward and intuitive user interface. Developers can setup and upload their decentralized
                    applications with a click of button.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{shieldSvg}</span>
                  <h5>Instant SSL</h5>
                  <p>Even SSL certificates are completely free. Whether you are using a custom domain or not, ssl
                    certificate for
                    your website is ready within seconds.</p>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <div className="feature">
                  <span className="icon">{codeSvg}</span>
                  <h5>Open Source</h5>
                  <p>All Runkod code is open sourced on Github under MIT licence. Feel free to view code and let us know
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
        <div className="testimonials" id="testimonials">
          <div className="container">
            <h2>Testimonials</h2>
            <Row>
              <Col md={6} lg={4}>
                <div className="testimonial">
                  <p className="quote">For app publishers, Runkod is just an easy way to host their apps. For techies,
                    Runkod is the next Cloudflare enabling decentralized storage.</p>
                  <div className="author">
                    <img className="avatar" src="/testimonial-images/friedger.jpeg" alt="avatar"/>
                    <div className="name">
                      <h5>Friedger Müffke</h5>
                      <span>Software Engineer</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="testimonial">
                  <p className="quote">Runkod is super easy to use. Looks like magic to me. I am so happy to find a free
                    and decentralized hosting solution for my next projects.</p>
                  <div className="author">
                    <img className="avatar" src="/testimonial-images/ue.png" alt="avatar"/>
                    <div className="name">
                      <h5>Uğur Erdal</h5>
                      <span>Frontend Developer</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="testimonial">
                  <p className="quote">
                    Having all tools to deploy my apps for free is awesome.
                    I'm looking forward for more features from Runkod.
                    I see Runkod is creating future of hosting.</p>
                  <div className="author">
                    <img className="avatar" src="/testimonial-images/steven.jpeg" alt="avatar"/>
                    <div className="name">
                      <h5>Steven Jankowski</h5>
                      <span>Frontend Developer</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {user === null &&
        <div className="bottom-cta">
          <LoginButton {...this.props}>
            <Button variant="primary" size="lg" onClick={this.login}>Launch your first project</Button>
          </LoginButton>
        </div>
        }

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
