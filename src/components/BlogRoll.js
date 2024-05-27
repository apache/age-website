import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import * as styles from './styles/BlogRollTemplate.module.scss';

class BlogRollTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className={styles.mainContent}>
        {posts &&
          posts.map(({ node: post }) => (
            <div className={styles.article} key={post.id}>
              <article className={styles.blogListItem}>
                <header>
                  <Link className={styles.title} to={post.fields.slug}>
                    {post.frontmatter.title}
                  </Link>
                  <p className={styles.date}>{post.frontmatter.date}</p>
                </header>
                <p>{post.excerpt}</p>
                <Link className={styles.keepReading} to={post.fields.slug}>
                  Keep Reading &rarr;
                </Link>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

BlogRollTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default function BlogRoll() {
  return (
    <StaticQuery
      query={graphql`
        query BlogRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <BlogRollTemplate data={data} count={count} />}
    />
  )
}
