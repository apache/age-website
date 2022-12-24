import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
// component
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Ageinfos from '../components/AgeInfos';
import AgeProjectList from '../components/AgeProjectList';
import AgeViewerProjectList from '../components/AgeViewerProjectList';
import RedditRss from '../components/RedditRss';
import AgeContributors from '../components/AgeContributors';
// style
import * as styles from './styles/index.module.scss';
// img 
import landingMailImg from '../../static/img/icon-LandingMailing.png';
import bg02 from '../../static/img/IMG-BG02.jpg';
import bg03 from '../../static/img/IMG-BG03.jpg';
import bg04 from '../../static/img/IMG-BG04.jpg';
import bg05 from '../../static/img/IMG-BG05.jpg';
import bg06 from '../../static/img/IMG-BG06.jpg';
import ageLogo from '../../static/img/logo.png';

import keyFeaturesImg01 from '../../static/img/keyfeature01.png';
import keyFeaturesImg02 from '../../static/img/keyfeature02.png';
import keyFeaturesImg03 from '../../static/img/keyfeature03.png';
import keyFeaturesImg04 from '../../static/img/keyfeature04.png';



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

      <section style={{ backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} className={styles.topSection}>
        <div className={styles.topContent}>
          <div className={styles.card}>
            <div className={styles.cardLeft}>
              What Is Apache AGE® ?<br></br>
              <div className={styles.cardContent}>
                <b>Apache AGE®</b> is a PostgreSQL extension that provides graph database functionality. <br></br><br></br>
                The goal of <b>Apache AGE®</b> is to provide graph data processing and analytics capability to all relational databases.
                <br></br><br></br>
                Through Apache AGE, PostgreSQL users will gain access to graph query modeling within the existing relational database.
                <br></br><br></br>
                Users can read and write graph data in nodes and edges. They can also use various algorithms such as variable length and edge traversal when analyzing data.
              </div>
            </div>
            <div className={styles.verticalLine}>
            </div>
            <div className={styles.cardRight}>
              What Is Apache AGE® Viewer ?
              <div className={styles.cardContent}>
                <b>Apache AGE® Viewer</b> is a web user interface for Apache AGE that provides data visualization and exploration.
                <br></br><br></br>
                Users can enter complex graph queries and explore the results expressed in graph and table data.
                <br></br><br></br>
                <b>Apache AGE® Viewer</b> handles large graph data. Users will be able to discover meaningful insights with the help of various graph algorithms.
                <br></br><br></br>
                <b>Apache AGE® Viewer</b> will serve as a central graph data management & development platform for Apache AGE, a graph extension which will support all relational databases in the future.
              </div>
            </div>
          </div>
          <section className={styles.videos}>
            <div className={styles.content}>
              <h2>Installation Guide</h2>
              <div className={styles.Youtube}>
                <iframe
                  src="https://www.youtube.com/embed/Vt06H5RARcs"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>
          <div className={styles.keyFeatures}>
            <h2>Key Features</h2>
            <div className={styles.keyFeaturesImgContainer}>
              <div>
                <img src={keyFeaturesImg01}></img>
                <div>Graph Database Plugin<br></br> for PostgreSQL</div>
                <div>
                  Gain access to query and visualize graph data in a PostgreSQL compatible relational databases
                </div>
              </div>
              <div>
                <img src={keyFeaturesImg02}></img>
                <div>Hybrid Queries<br></br> (OpenCypher And SQL)</div>
                <div>Hybrid query technology simultaneously performs the queries for relational data and graph data</div>
              </div>
              <div>
                <img src={keyFeaturesImg03}></img>
                <div>Fast Graph Query <br></br>Processing</div>
                <div>Achieve both fast indexing and efficient query processing.</div>
              </div>
              <div>
                <img src={keyFeaturesImg04}></img>
                <div>Graph Visualization <br></br> and Analytics</div>
                <div>
                  Provides visualization of graph and relational data for clearer understanding of data
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
        <div className={styles.content}>
          <h2>AGE Projects</h2>
          <p>
            Everyone is welcome to join and contribute to Apache AGE Project,
            not only with code contributions. <br />
            You can learn more about
            Apache AGE by working with other developers.  <br />
          </p>
          <AgeProjectList />
        </div>
        <hr style={{ border: 'solid 1px #ffffff', margin: '2rem 0' }} />
        <div className={styles.content}>
          <h2>AGE Viewer Projects</h2>
          <p></p>
          <AgeViewerProjectList />
        </div>
      </section>
      {/* <section style={{ backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} hidden > */}
        {/* <div className={styles.content}>
          <h2>Message From AGE Team</h2>
          <div className={styles.Youtube}>
            <iframe
              src="https://www.youtube.com/embed/w8ixRk9YXJo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div> */}
      {/* </section> */}
      <section style={{ backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
        <div className={styles.content}>
          <h2>Welcome to the AGE Community</h2>
          <p>
            Apache AGE is a continuously developing solution thanks to a progressive community.<br />
            We are always looking for aspiring contributors who are willing to learn and grow with us.<br />
            If you are looking for an opportunity to grow and experience progressive insights, this is the place for you!
          </p>
          <Ageinfos />
          <hr style={{ border: 'solid 1px #9F1A61', margin: '2rem 0', opacity: '0.2' }} />
          <div className={styles.content}>
            <h2>Top GitHub Contributors</h2>
            <p></p>
            <AgeContributors />
          </div>
        </div>
      </section>
      <section style={{ backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
        <div className={styles.content}>
          <h2>Join AGE Discord</h2>
            <a href="https://discord.com/invite/NMsBs9X8Ss" target="_blank">
              <div className={styles.inviteDiscord}>
                <img src={ageLogo} alt="Discord Invite Link" />
              </div>          
            </a>
          <h3>Got any questions about the project? Join us in Discord and let's chat!</h3>
        </div>
      </section>
      <section hidden></section>
      <section>
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
            <div>
              <a
                target="_blank"
                href="https://lists.apache.org/list.html?users@age.apache.org"
              >
                User
              </a>
              <a href="mailto:users-subscribe@age.apache.org">Subscribe</a>
            </div>
            <div>
              <a
                target="_blank"
                href="https://lists.apache.org/list.html?dev@age.apache.org"
              >
                Developer
              </a>
              <a href="mailto:dev-subscribe@age.apache.org">Subscribe</a>
            </div>
            <div>
              <a
                target="_blank"
                href="https://lists.apache.org/list.html?commits@age.apache.org"
              >
                Commits
              </a>
              <a href="mailto:commits-subscribe@age.apache.org">Subscribe</a>
            </div>

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
