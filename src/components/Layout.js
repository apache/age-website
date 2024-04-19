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
import favicon from '../../static/img/favicon.png';

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
    gtag('config', 'G-XFVE1KJW91')
  };

  const titleNameMapper = () => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      const pathName = window.location.pathname;
      const urlToTitle = {
        '/getstarted/quickstart' : 'Quickstart | Apache AGE',
        '/overview' : 'Overview | Apache AGE',
        '/team' : 'Team | Apache AGE',
        '/release-notes' : 'Release Notes | Apache AGE',
        '/faq' : 'FAQ | Apache AGE',
        '/blog' : 'Blog | Apache AGE',
        '/joinus' : 'Community | Apache AGE',
        '/contribution/how' : 'Contribution | Apache AGE',
        '/contribution/guide' : 'Code Convention | Apache AGE',
        // '/contribution/volunteers' : 'Volunteer Guideline | Apache AGE',
        '/contribution/requirements' : 'Committer Requirements | Apache AGE',
        '/contribution/process' : 'Release Process | Apache AGE',
        'https://age.apache.org/age-manual/master/intro/overview.html' : 'Doc | Apache AGE',
        'https://age.apache.org/age-manual/master/intro/setup.html' : 'Doc | Apache AGE',
        'https://age.apache.org/age-manual/master/clauses/match.html' : 'Doc | Apache AGE',
        'https://age.apache.org/age-manual/master/functions/predicate_functions.html' : 'Doc | Apache AGE',
        'https://age.apache.org/age-manual/master/advanced/advanced_overview.html' : 'Doc | Apache AGE',
        '/download' : 'Download | Apache AGE',
        'https://github.com/apache/age' : 'Apache AGE Github | Apache AGE',
      }
      return urlToTitle[pathName] ?? 'Apache AGE Graph Database | Apache AGE';    
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
            <meta charset="UTF-8" /> {/* 문자 집합 선언 추가 */}
            <link rel="icon" href={withPrefix('/img/favicon.png')} />
            <meta name="description" content={description} />
            {/* Global site tag (gtag.js) - Google Analytics */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-VPCE2QF63F" />
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-XFVE1KJW91"/>

            {/* Search Console New */}
            <meta name="google-site-verification" content="C4CIVL2dGO5hQM50NyalduCnsGIL9cRgtP8ilWhKWko" />
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
