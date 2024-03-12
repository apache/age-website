import React, { useEffect, useState } from 'react'; // React와 필요한 훅을 한 번에 import
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
// component
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
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
              News & Events
              <div className={styles.cardContent}>
                <div><b>Apache AGE on Microsoft Azure PostgreSQL</b></div>
                <div>Support the integration of Microsoft Azure PostgreSQL with Apache AGE by casting your vote!</div>
                  <div>
                    <a href="https://feedback.azure.com/d365community/idea/4ba45e52-63b9-ee11-92bc-6045bd7aea25" target="_blank">Read more</a>
                  </div>

                <br></br>
                <div><b>Easy and Smooth Start to Graph Databases</b></div>
                <div>Get to know the newest tool that makes using Apache AGE easy as pie</div>
                <div>
                  <a href="https://dev.to/markgomer/easy-and-smooth-start-to-graph-databases-5epk" target="_blank">Read more</a>
                </div>

                <br></br>
                <div><b>Apache AGE is now compatible with PostgreSQL 16!</b></div>
                <div>Check the changelog for the latest version</div>
                  <div>
                  <a href="https://news.ycombinator.com/item?id=39674765" target="_blank">Read more</a>

                  </div>

                <br></br>
                <div><b>Apache AGE, PostGraphile, and Hasura</b></div>
                <div>Join the comparison discussion on Reddit</div>
                <div>
                  <a href="https://www.reddit.com/r/PostgreSQL/comments/1bcdo9z/apache_age_postgraphile_and_hasura/" target="_blank">Read more</a>
                </div>
              </div>
            </div>
          </div>

          <div><br></br></div>
          <div><br></br></div>
          <div><br></br></div>
          <div><br></br></div>
          <div><br></br></div>
          <div><br></br></div>

          {/* 메인화면: 유튜브 영상
          <section className={styles.videos}>
            <div className={styles.content}>
              <h2>Installation Guide</h2>
              <div className={styles.Youtube}>
                <iframe
                  src="https://www.youtube.com/embed/0-qMwpDh0CA"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>
          */ }

            <section>
            <div className={styles.card}>

              <div className={styles.content}>
                <h2>Comparison of Apache AGE, PostGraphile, and Hasura</h2><br></br><br></br>
                <p>
                <h3><b>◾ Apache AGE: Graph Database Extension for PostgreSQL</b></h3>
                Apache AGE extends PostgreSQL, transforming it into a graph database.
                This enables handling complex data relationships and graph structures, supplemented by the power of Cypher queries for graph-specific operations.<br></br><br></br>
                
                <ul><b>Key Features:</b></ul>
                  <li>Graph & SQL Queries</li>
                  <li>Integration deeply with existing PostgreSQL features,
                  making it a robust and scalable solution for graph data management without the need for external graph databases.</li>
                  <li>Ideal for applications that require complex data relationship analysis,such as social networks, recommendation systems, and knowledge graphs.</li>
                  <br></br><hr></hr><br></br>

                <h3><b>◾ PostGraphile: GraphQL API from PostgreSQL Schema</b></h3>
                PostGraphile is a tool for building a GraphQL API on top of an existing PostgreSQL schema.<br></br>
                It's designed for efficiency in web development, allowing real-time data access and manipulation through GraphQL interface.<br></br><br></br>

                <ul><b>Key Features:</b></ul>
                  <li>Automates the creation of GraphQL APIs from existing PostgreSQL.</li>
                  <li>Offers subscriptions for real-time data updates.</li>
                  <li>Best suited for projects requiring quick development of web or mobile backends with real-time data needs, but without complex graph data management requirements.</li><br></br><hr></hr><br></br>

                <h3><b>◾ Hasura: Real-Time GraphQL Engine for PostgreSQL</b></h3>
                Hasura is a GraphQL server engine that dynamically generates real-time GraphQL APIs from a PostgreSQL database.<br></br>
                It emphasizes performance and developer productivity, with an easy setup process and tools for managing access and queries.<br></br><br></br>

                <ul><b>Key Features:</b></ul>
                  <li>Provides a user-friendly interface for setting up and managing GraphQL endpoints.</li>
                  <li>Optimized for performance, supporting high-volume traffic.</li>
                  <li>Ideal for developers needing a fast, scalable GraphQL layer over their PostgreSQL databases.</li>
                  <br></br><hr></hr><br></br>

                <h3><b>◾ Conclusion</b></h3>
                Apache AGE is ideal for sophisticated graph data tasks within PostgreSQL.<br></br>
                PostGraphile and Hasura excel in quick GraphQL API deployment for example for web and mobile, complementing AGE's rich graph features.<br></br>
                </p>


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
      {/* <section style={{ backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} hidden > */}
        {/* <div className={styles.content}>
          <h2>Message From AGE Team</h2>
          <div className={styles.Youtube}>
            <iframe
              src="https://www.youtube.com/embed/0-qMwpDh0CA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div> */}
      {/* </section> */}


      {/* 메인화면: 디스코드
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
      */}
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

