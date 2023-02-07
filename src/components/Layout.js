import * as React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './styles/all.sass';
import useSiteMetadata from './SiteMetadata';
import { withPrefix } from 'gatsby';
// context
import { MainContext } from './MainContex';
// ant desing
import '../common/antd.css';
// font
import '../components/styles/font/font.css';
// media query
import './styles/media.scss';
// styles
import * as styles from './styles/Layout.module.scss';
import favicon from '../../static/img/agedb-favicon.png';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();

  const injectGA = () => {

    if (typeof window == 'undefined') {
      return;
    }
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
  
    gtag('config', 'G-VPCE2QF63F');
  };

  const titleNameMapper = () => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      const pathName = window.location.pathname;
      const urlToTitle = {
        '/overview' : 'Overview | Apache AGE',
        '/team' : 'Team | Apache AGE',
        '/release-notes' : 'Release Notes | Apache AGE',
        '/joinus' : 'Community | Apache AGE',
        '/contribution/how' : 'Contribution | Apache AGE',
        '/contribution/guide' : 'Code Convention | Apache AGE',
        '/contribution/volunteers' : 'Volunteer Guideline | Apache AGE',
        '/contribution/requirements' : 'Committer Requirements | Apache AGE',
        '/contribution/process' : 'Release Process | Apache AGE',
        '/download' : 'Download | Apache AGE',
      }
      return urlToTitle[pathName] ?? 'Apache AGE';    
    } else {
      return 'Apache AGE';
    }    
  }

  return (
    <MainContext.Consumer>
      {(mainContex) => (
        <>
          <Helmet>
            <html lang="en" />
            <title>{titleNameMapper()}</title>
            <link rel="icon" href={favicon} />
            <meta name="description" content={description} />
            {/* Global site tag (gtag.js) - Google Analytics */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-VPCE2QF63F" />
            <meta name="google-site-verification" content="yl8xrMjtcZXVEZ0JqZ_H0s3YJ4hb8XwKMkCOdKoC3Jk" />
            <script>
                {injectGA()}
            </script>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href={`${withPrefix('/')}img/apple-touch-icon.png`}
            />
            <link
              rel="icon"
              type="image/png"
              href={`${withPrefix('/')}img/favicon-32x32.png`}
              sizes="32x32"
            />
            <link
              rel="icon"
              type="image/png"
              href={`${withPrefix('/')}img/favicon-16x16.png`}
              sizes="16x16"
            />

            <link
              rel="mask-icon"
              href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
              color="#ff4400"
            />
            <meta name="theme-color" content="#fff" />

            <meta property="og:type" content="business.business" />
            <meta property="og:title" content={title} />
            <meta property="og:url" content="/" />
            <meta
              property="og:image"
              content={`${withPrefix('/')}img/og-image.jpg`}
            />
          </Helmet>
          <Navbar />
          <div className={styles.contents}>{children}</div>
          <Footer />
        </>
      )}
    </MainContext.Consumer>
  );
};

export default TemplateWrapper;
