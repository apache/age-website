import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import * as styles from './styles/docs.module.scss';
// page by style
import './styles/pageby.scss';

// eslint-disable-next-line
export const DocsTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className={styles.root}>
      <h1>{title}</h1>
      <PageContent className="content" content={content} />
    </section>
  );
};

DocsTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const DocsPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <DocsTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

DocsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DocsPage;

export const aboutPageQuery = graphql`
  query MarkdownContentsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
