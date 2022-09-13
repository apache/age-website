import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import HowToAge from '../components/HowToAge';
import Content, { HTMLContent } from '../components/Content';
// styles
import * as styles from './styles/overview.module.scss';
// page by style
import './styles/pageby.scss';
import keyFeaturesImg01 from '../../static/img/keyfeature01-wt.png';
import keyFeaturesImg02 from '../../static/img/keyfeature02-wt.png';
import keyFeaturesImg03 from '../../static/img/keyfeature03-wt.png';
import keyFeaturesImg04 from '../../static/img/keyfeature04-wt.png';

// eslint-disable-next-line
export const OverviewTemplate = ({
  bannerImg,
  bannerContents,
  title,
  content,
  subcontent,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;
  const bannerSrc =
    bannerImg?.childImageSharp?.gatsbyImageData.images.fallback.src ||
    bannerImg;

  return (
    <>
      <div
        className={styles.banner}
      // style={{ backgroundImage: `url(${bannerSrc})` }} remove image
      >
        <PageContent
          className={styles.bannerContent}
          content={bannerContents}
        />
      </div>
      <section className={styles.root}>
        <h1>{title}</h1>
        <PageContent className="Overview" content={content} />
        <HowToAge />
        <PageContent className={styles.bannerContent} content={subcontent} />
        <div className={styles.keyFeatures}>
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
      </section>
    </>
  );
};

OverviewTemplate.propTypes = {
  bannerImg: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  subcontent: PropTypes.string,
  contentComponent: PropTypes.func,
};

const OverView = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <OverviewTemplate
        bannerImg={post.frontmatter.bannerImg}
        bannerContents={post.frontmatter.bannerContents}
        title={post.frontmatter.title}
        content={post.html}
        subcontent={post.frontmatter.subcon}
        contentComponent={HTMLContent}
      />
    </Layout>
  );
};

OverView.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OverView;

export const aboutPageQuery = graphql`
  query OverViewPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        bannerImg {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        bannerContents
        title
        subcon
      }
    }
  }
`;
