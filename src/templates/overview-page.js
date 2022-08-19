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
