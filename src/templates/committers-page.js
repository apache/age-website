import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import * as styles from './styles/committers.module.scss';
import iconGithub from '../img/icon-github.png';
// page by style

// eslint-disable-next-line
export const CommittersTemplatePage = ({
  pmcTitle,
  nonpmcTitle,
  pmc,
  nonpmc,
  video,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  const CommitersList = ({ list }) => {
    const Commiters = list?.map((item) => {
      const avatarImg =
        item.avatar?.childImageSharp?.gatsbyImageData.images.fallback.src ||
        item.avatar;
      return (
        <div className={styles.Committer}>
          <p className={styles.Aavatar}>
            <div>
              <img src={avatarImg} art="profile image"></img>
            </div>
          </p>
          <p className={`${styles.Name} CommitterName`}>{item.name}</p>
          <p className={`${styles.GithubName}`}>{item.githubName}</p>
          <p className={`${styles.GithubProfile}`}>
            <a href={item.githubLink} target="_blank">
              <img src={iconGithub} className={styles.githubLink}  alt="github profile link"></img>
            </a>
          </p>
        </div>
      );
    });
    return <div className={styles.CommitersContainer}>{Commiters}</div>;
  };

  return (
    <section className={styles.root}>
      <h1>{pmcTitle}</h1>
      <CommitersList list={pmc} />
      <h1>Welcome to AGE</h1>
      <div className={styles.Youtube}>
        <iframe
          //src="https://www.youtube.com/embed/qC_3F4Gaipk"
          src={video}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <h1>{nonpmcTitle}</h1>
      <CommitersList list={nonpmc} />
      {/* <PageContent className="content" content={content} /> */}
    </section>
  );
};

CommittersTemplatePage.propTypes = {
  pmcTitle: PropTypes.string,
  nonpmcTitle: PropTypes.string,
  pmc: PropTypes.array,
  nonpmc: PropTypes.array,
  video: PropTypes.string,
  contentComponent: PropTypes.func,
};

const CommittersPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <CommittersTemplatePage
        pmcTitle={post.frontmatter.pmcTitle}
        nonpmcTitle={post.frontmatter.nonpmcTitle}
        pmc={post.frontmatter.pmc}
        nonpmc={post.frontmatter.nonpmc}
        video={post.frontmatter.video}
        contentComponent={HTMLContent}
      />
    </Layout>
  );
};

CommittersPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CommittersPage;

export const aboutPageQuery = graphql`
  query CommitterPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        pmcTitle
        nonpmcTitle
        video
        pmc {
          name
          avatar {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          githubName
          githubLink
        }
        nonpmc {
          name
          avatar {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          githubName
          githubLink
        }
      }
    }
  }
`;
