import * as React from 'react';
// import { Link } from 'gatsby';
// images
import icoGithubLd from '../../static/img/icon-github.png';
import icoTwitterLd from '../../static/img/icon-x.png';


// styles
import * as styles from './styles/Footer.module.scss';
// import './styles/footer.css';

const Footer = class extends React.Component {
  componentDidMount() {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      if (window.location.pathname === '/') {
        const footer = document.getElementsByTagName('footer')[0];        
        footer?.classList?.add('LandingFooter');
        const links = document.getElementsByClassName('FooterLinks')[0].children;
        links[0].children[0].src = icoGithubLd;
        links[1].children[0].src = icoTwitterLd;

      }
    }
  }

  render() {
    let landingYn = false;
    return (
      <footer className={`${styles.root} ${landingYn ? styles.Landing : ''}`}>
        <div className={`${styles.Sitemap} Sitemap`}>
          <ul className={`${styles.Item} Item`}>
            <li>Get Started</li>
              <li>
                <a href="/getstarted/quickstart">Quick Start</a>
              </li>
              <li>
              <a href="/faq">F A Q</a>
            </li>
            </ul>

          <ul className={`${styles.Item} Item`}>
            <li>Apache AGE</li>
            <li>
              <a href="/overview">Overview</a>
            </li>
            <li>
              <a href="/team">Team</a>
            </li>
            <li>
              <a href="/release-notes">Release Note</a>
            </li>
          </ul>
          
          <ul className={`${styles.Item} Item`}>
            <li>Community</li>
            <li>
              <a href="/joinus">Join AGE Community</a>
            </li>
            <li>
              <a href="https://www.reddit.com/r/apacheage/" target='_blank' rel="noopener noreferrer">
                AGE Forum
              </a>
            </li>
            <li>
              <a href="https://github.com/apache/age/projects" target='_blank' rel="noopener noreferrer">AGE Project</a>
            </li>
          </ul>

          <ul className={`${styles.Item} Item`}>
            <li>Contribution</li>
            <li>
              <a href="/contribution/how">How to contribute</a>
            </li>
            <li>
              <a href="/contribution/guide">Code Convention</a>
            </li>
            <li>
              <a href="/contribution/requirements">Committer Requirements</a>
            </li>
            <li>
              <a href="/contribution/process">Release Process</a>
            </li>
          </ul>

          <ul className={`${styles.Item} Item`}>
            <li>Downloads</li>
            <li>
              <a href="/download">Download AGE</a>
            </li>
          </ul>

          <ul className={`${styles.Item} Item`}>
            <li>Doc</li>
            <li>
              <a href="https://age.apache.org/age-manual/master/intro/overview.html" target={'_blank'}>Overview</a>
            </li>
            <li>
              <a href="https://age.apache.org/age-manual/master/intro/setup.html" target={'_blank'}>Setup</a>
            </li>
            <li>
              <a href="https://age.apache.org/age-manual/master/clauses/match.html" target={'_blank'}>Match</a>
            </li>
            <li>
              <a href="https://age.apache.org/age-manual/master/functions/predicate_functions.html" target={'_blank'}>Functions</a>
            </li>
            <li>
              <a href="https://age.apache.org/age-manual/master/advanced/advanced_overview.html" target={'_blank'}>AGE Beyond Cypher</a>
            </li>
          </ul>
          
          <ul className={`${styles.Item} Item`}>
            <li>Apache</li>
            <li>
              <a href="https://www.apache.org/foundation/" target={'_blank'} rel="noopener noreferrer">Foundation</a>
            </li>
            <li>
              <a href="https://www.apache.org/" target={'_blank'} rel="noopener noreferrer">How Apache works</a>
            </li>
            <li>
              <a href="https://www.apache.org/foundation/sponsorship.html" target={'_blank'} rel="noopener noreferrer">Sponsorship</a>
            </li>
            <li>
              <a href="https://www.apache.org/security/" target={'_blank'} rel="noopener noreferrer">Security</a>
            </li>
            <li>
              <a href="https://www.apache.org/licenses/" target={'_blank'} rel="noopener noreferrer">License</a>
            </li>
            <li>
              <a href="https://apachecon.com/?ref=age.apache.org" target={'_blank'} rel="noopener noreferrer">Events</a>
            </li>
          </ul>
        </div>

        <div style={{ maxWidth: '100vw' }} className={`${styles.Social} Social`}>
          <div className={`${styles.Links} FooterLinks`}>
            <a title="Github" href="https://github.com/apache/age" target={'_blank'} rel="noopener noreferrer">
              <img
                src={icoGithubLd}
                alt="Facebook"
                style={{ width: '2.5em', height: '2.5em' }}
              />
            </a>
            <a title="twitter" href="https://twitter.com/apache_age?lang=en" target={'_blank'} rel="noopener noreferrer">
              <img
                className="fas fa-lg"
                src={icoTwitterLd}
                alt="Twitter"
                style={{ width: '2.5em', height: '2.5em' }}
              />
            </a>
          </div>

          <p>
          Copyright © 2024 The Apache Software Foundation.<br></br>
          The Apache Software Foundation Apache AGE, AGE, Apache, the Apache feather,
          and the Apache AGE project logo are either registered trademarks or trademarks of the Apache Software Foundation.
          </p>

        </div>
      </footer>
    );
  }
};

export default Footer;
