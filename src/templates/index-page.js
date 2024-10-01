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

import blogimg01 from '../../static/img/blogimg01.png';

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
              Apache AGE™, Graph database <br></br>
              <div className={styles.cardContent}>
                <b>Apache AGE™</b> is a PostgreSQL extension that provides graph database functionality. <br></br><br></br>
                The goal of <b>Apache AGE™</b> is to provide graph data processing and analytics capability to all relational databases.
                <br></br><br></br>
                Through Apache AGE, PostgreSQL users will gain access to graph query modeling within the existing relational database.
                <br></br><br></br>
                Users can read and write graph data in nodes and edges. They can also use various algorithms such as variable length and edge traversal when analyzing data.
              </div>
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.cardRight}>
              <div className={styles.cardContent}>
                  <img src="/img/AGE-Architecture.webp" alt="img"></img>
                <br></br>
              </div>
            </div>
          </div>

          <div><br></br></div>
          <div><br></br></div>
          <div><br></br></div>
          <div><br></br></div>
          
          <section>
              <div className={styles.card1}>
                <div className={styles.content}>
                  <h2><b>Key Updates</b></h2><hr></hr>
                  <div className={styles.cardContent}>
                    <div><h2><b>ASF PROJECT SPOTLIGHT: APACHE AGE </b></h2></div>
                      <div>Read the full blog post now and be a part of shaping the future of graph database technology. </div>
                      <div><a href="https://news.apache.org/foundation/entry/asf-project-spotlight-apache-age" target="_blank" rel="noopener noreferrer">Read More</a></div>
                      <br></br>

                    <div><h2><b>Why do you use Apache AGE? </b></h2></div>
                      <div>Give feedback at the GitHub (<a href="https://github.com/apache/age/issues/1705" target="_blank" rel="noopener noreferrer">#1705</a>)</div>
                      <br></br>

                    <div><h2><b>Add graph store implementation for Apache AGE in langchain github</b></h2></div>

                      <div>Check out the pull request for the implementation of the GraphStore class for the Apache Age graph database in the LangChain repository.</div>
                      <div><a href="https://github.com/langchain-ai/langchain/pull/20582" target="_blank" rel="noopener noreferrer">Read more</a></div>
                      <br></br>

                    <div><h2><b>Proposal: Vector handling with extension(pgvector)</b></h2></div>
                      <div>A proposal for applying PGvector to Apache AGE has been posted on GitHub. Please read and leave a comment or opinion if you are interested.</div>
                      <div><a href="https://github.com/apache/age/issues/1121" target="_blank" rel="noopener noreferrer">Read more</a></div>
                      <br></br>

                    <div><h2><b>Apache AGE is now compatible with PostgreSQL 16!</b></h2></div>
                      <div>Check the changelog for the latest version</div>
                      <div><a href="https://github.com/apache/age/releases/tag/PG16%2Fv1.5.0-rc0" target="_blank" rel="noopener noreferrer">Read more</a></div>
                      <br></br>
                
                  </div>
                </div>
              </div>
            </section>

          <div><br></br></div>
          <div><br></br></div>

          <section>
              <div className={styles.card1}>
                <div className={styles.content}>
                  <h3><b>This week's article by community</b></h3><hr></hr>
                  <h2>Graph Database in PostgreSQL: Apache AGE</h2>
                  <div className={styles.cardContent}>
                    <p>
                      Graph database have gained popularity in recent years due to their ability to handle complex relationships between data. Unlike traditional relational database, which store data in tables, graph database represent data as nodes, edges, and properties. Nodes represent entities, edges represent the relationships between those entities, and properties represent the attributes of both.
                    </p>
                    <p>
                      PostgreSQL, a popular relational database, can also function as a graph database through the use of an extension called Apache AGE. With Apache AGE, users can leverage the flexibility and scalability of graph database while still utilizing PostgreSQL's advanced SQL querying capabilities and transaction support.
                    </p>
                    <p>
                      To use Apache AGE, users must first install it as an extension and then model their data as nodes and edges. Apache AGE comes with its own set of SQL extensions, similar to Cypher, that allows users to query their graph database. However, users can also still use SQL to query their graph database if desired.
                    </p>
                    <p>
                      For those new to graph database, Apache AGE comes with a tutorial to help them get started. Additionally, you may use the #apache-age tag for questions on Stack Overflow, join the project's Discord channel, or open an issue on GitHub, the Apache AGE community is readily available to provide support and answer questions.
                    </p>
                    <p>
                      Overall, graph database offer a new way of thinking about how to store and query complex relationships between data. With Apache AGE, users can easily transform their PostgreSQL database into a graph database and take advantage of the benefits that come with this type of database.
                    </p>
                  </div>
                  </div>
              </div>
          </section>

          <div><br></br></div>
          <div><br></br></div>

        </div>
      </section>

      <section hidden></section>
      
      <section>
        <div className={styles.content1}>
          {/*<div className={styles.Subscribe1}>
            <img src={landingMailImg} alt="mail-image"></img>
          </div>*/}
          <h2>Subscribe Mailing List</h2>
          <p>
            Get help using Apache AGE or contribute to the project on our
            mailing lists!
          </p>
          <div className={styles.SubscribeLink1}>
            <div>
              <a target="_blank" href="https://lists.apache.org/list.html?users@age.apache.org" rel="noopener noreferrer">
                User
              </a>
              <a href="mailto:users-subscribe@age.apache.org">Subscribe</a>
            </div>
            <div>
              <a target="_blank" href="https://lists.apache.org/list.html?dev@age.apache.org" rel="noopener noreferrer">
                Developer
              </a>
              <a href="mailto:dev-subscribe@age.apache.org">Subscribe</a>
            </div>
            <div>
              <a target="_blank" href="https://lists.apache.org/list.html?commits@age.apache.org" rel="noopener noreferrer">
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

