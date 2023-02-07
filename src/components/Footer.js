import * as React from 'react';
// import { Link } from 'gatsby';
// images
import icoGithubLd from '../../static/img/icon-github.png';
import icoTwitterLd from '../../static/img/icon-twitter.png';
import icoYoutubeLd from '../../static/img/icon-youtube.png';
import icoDiscordLd from '../../static/img/icon-discord.png';


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
        links[2].children[0].src = icoYoutubeLd;
        links[3].children[0].src = icoDiscordLd;
      }
    }
  }

  render() {
    let landingYn = false;
    return (
      <footer className={`${styles.root} ${landingYn ? styles.Landing : ''}`}>
        <div className={`${styles.Sitemap} Sitemap`}>
          <ul className={`${styles.Item} Item`}>
            <li>AGE</li>
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
              <a href="https://discord.com/invite/NMsBs9X8Ss" target='_blank'>AGE Discord</a>
            </li>
            <li>
              <a href="https://www.reddit.com/r/apacheage/" target='_blank'>
                AGE Forum
              </a>
            </li>
            <li>
              <a href="https://github.com/apache/age/projects" target='_blank'>AGE Project</a>
            </li>
            <li>
              <a href="https://github.com/apache/age-viewer/projects" target='_blank'>AGE Viewer Project</a>
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
            <li>
              <a href="/download">Download AGE</a>
            </li>
            <li></li>
          </ul>
          <ul className={`${styles.Item} Item`}>
            <li>Apache</li>
            <li>
              <a href="https://www.apache.org/foundation/" target={'_blank'}>
                Foundation
              </a>
            </li>
            <li>
              <a href="https://www.apache.org/" target={'_blank'}>
                How Apache works
              </a>
            </li>
            <li>
              <a
                href="https://www.apache.org/foundation/sponsorship.html"
                target={'_blank'}
              >
                Sponsorship
              </a>
            </li>
            <li>
              <a href="https://www.apache.org/security/" target={'_blank'}>
                Security
              </a>
            </li>
            <li>
              <a href="https://www.apache.org/licenses/" target={'_blank'}>
                License
              </a>
            </li>
            <li>
              <a
                href="https://apachecon.com/?ref=age.apache.org"
                target={'_blank'}
              >
                Events
              </a>
            </li>
          </ul>
        </div>
        <div
          style={{ maxWidth: '100vw' }}
          className={`${styles.Social} Social`}
        >
          <div className={`${styles.Links} FooterLinks`}>
            <a title="Github" href="https://github.com/apache/age" target={'_blank'}>
              <img
                src={icoGithubLd}
                alt="Facebook"
                style={{ width: '2.5em', height: '2.5em' }}
              />
            </a>
            <a title="twitter" href="https://twitter.com/apache_age?lang=en" target={'_blank'}>
              <img
                className="fas fa-lg"
                src={icoTwitterLd}
                alt="Twitter"
                style={{ width: '2.5em', height: '2.5em' }}
              />
            </a>
            <a title="Youtube" href="https://youtu.be/qC_3F4Gaipk" target={'_blank'}>
              <img
                src={icoYoutubeLd}
                alt="Youtube"
                style={{ width: '2.5em', height: '2.5em' }}
              />
            </a>
            <a title="Discord" href="https://discord.com/invite/NMsBs9X8Ss" target={'_blank'}>
              <img
                src={icoDiscordLd}
                alt="Discord"
                style={{ width: '2.5em', height: '2.5em' }}
              />
            </a>
          </div>
          <p>
            Copyright © 2023 The Apache Software Foundation.<br></br>
            The Apache Software Foundation Apache AGE, AGE, Apache, the Apache feather, 
            and the Apache AGE project logo are either registered trademarks or trademarks of the Apache Software Foundation.
          </p>
        </div>
      </footer>
    );
  }
};

export default Footer;
