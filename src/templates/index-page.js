import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
// component
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Ageinfos from '../components/AgeInfos';
import ProjectList from '../components/ProjectList';
import RedditRss from '../components/RedditRss';
// style
import * as styles from './styles/index.module.scss';
// img 
import landingMailImg from '../../static/img/icon-LandingMailing.png';
import bg02 from '../../static/img/IMG-BG02.jpg';
import bg03 from '../../static/img/IMG-BG03.jpg';
import bg04 from '../../static/img/IMG-BG04.jpg';
import bg05 from '../../static/img/IMG-BG05.jpg';
import bg06 from '../../static/img/IMG-BG06.jpg';


// eslint-disable-next-line
export const IndexPageTemplate = ({
  contentComponent,
  bannerImg,
  bannerContents,
  html,
}) => {
  const bannerSrc =
    bannerImg?.childImageSharp?.gatsbyImageData.images.fallback.src ||
    bannerImg;
  const IndexPageContent = contentComponent || Content;
  return (
    <div className={styles.root}>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${bannerSrc})` }}
      >
        <IndexPageContent
          className={styles.bannerContent}
          content={bannerContents}
        />
      </div>
     
      <section style={{backgroundImage: `url(${bg02})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
        <div className={styles.content}>
          <h2>AGE Projects</h2>
          <p>
            Everyone is welcome to join and contribute to Apache AGE Project,
            not only with code contributions. <br /> You can learn more about
            Apache AGE by working with other developers.
          </p>
          <ProjectList />
        </div>
      </section>
      <section style={{backgroundImage: `url(${bg03})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
        <div className={styles.content}>
          <h2>AGE Forum</h2>
          <p>Learn Apache AGE with code examples, resources, and other developers' inquiries and experiences from the developer community.</p>
        </div>
        <RedditRss />
      </section>
      <section style={{backgroundImage: `url(${bg04})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
        <div className={styles.content}>
          <h2>Message From AGE Team</h2>
          <div className={styles.Youtube}>
            <iframe
              width="100%"
              height="720"
              src="https://www.youtube.com/embed/qC_3F4Gaipk"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>
      <section style={{backgroundImage: `url(${bg05})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
        <div className={styles.content}>
          <h2>Welcome To The AGE Community</h2>
          <p>
            Apache AGE is a continuously developed solution by a progressive
            community. <br /> We're always looking for contributors who are
            willing to learn and grow with us. <br /> If you are looking for an
            opportunity to grow and experience progressive insights this is the
            place for you!
          </p>
          <Ageinfos />
        </div>
      </section>
      <section style={{backgroundImage: `url(${bg06})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
        <div className={styles.content}>
          <div className={styles.Subscribe}>
            <img src={landingMailImg} alt="mail-image"></img>
          </div>
          <h2>Subscribe Mailing List</h2>
          <p>
            Get help using Apache AGE or contribute to the project on our
            mailing lists!
          </p>
          <div className={styles.SubscribeLink}>
            <a
              target="_blank"
              href="https://lists.apache.org/list.html?users@age.apache.org"
            >
              User
            </a>
            <a
              target="_blank"
              href="https://lists.apache.org/list.html?dev@age.apache.org"
            >
              Developer
            </a>
            <a href="mailto:users-subscribe@age.apache.org">Subscribe</a>
            <a href="mailto:dev-subscribe@age.apache.org">Subscribe</a>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  html: PropTypes.string,
  bannerImg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  bannerContents: PropTypes.string,
  contentComponent: PropTypes.func,
};

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        contentComponent={HTMLContent}
        bannerImg={frontmatter.bannerImg}
        bannerContents={frontmatter.bannerContents}
        html={html}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string,
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        bannerImg {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        bannerContents
      }
    }
  }
`;
