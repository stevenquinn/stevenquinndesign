import * as React from "react"

import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import FeaturedImage from "../components/featuredImage"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
    data: { previous, next, site, markdownRemark: post },
    location,
}) => {
    const siteTitle = site.siteMetadata?.title || `Title`
    const featuredImage = post.frontmatter.featured_image?.childImageSharp?.gatsbyImageData || null
    const featuredImageTitle = post.frontmatter.featured_image_title || null

    return (
        <Layout location={location} title={siteTitle}>
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                { featuredImage && <FeaturedImage image={featuredImage} title={featuredImageTitle} /> }
                <header className="mb-8 md:w-4/5 mx-auto">
                    {post?.frontmatter?.date && (
                        <p className="text-slate-500 text-xs mb-0 font-bold uppercase">{post.frontmatter.date}</p>
                    )}
                    <div className="w-12 h-1 mb-4 mt-2 bg-slate-300"></div>
                    <h1 itemProp="headline" className="text-4xl mb-0 mt-0 text-rose-500 font-bold">{post.frontmatter.title}</h1>
                </header>
                <section
                    className="md:w-4/5 mx-auto pb-10"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                    itemProp="articleBody"
                />
                <hr />
                <footer>
                    <Bio />
                </footer>
            </article>

            { post?.fields?.slug != 'about' && (
                <nav className="mt-4">
                    <ul className="flex flex-wrap justify-between list-none m-0 p-0">
                        <li>
                            {previous && (
                                <Link to={previous.fields.slug} rel="prev">
                                    ← {previous.frontmatter.title}
                                </Link>
                            )}
                        </li>
                        <li>
                            {next && (
                                <Link to={next.fields.slug} rel="next">
                                    {next.frontmatter.title} →
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            )}
        </Layout>
    )
}

export const Head = ({ data: { markdownRemark: post } }) => {
    return (
        <Seo
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
        />
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featured_image {
            childImageSharp {
                gatsbyImageData(
                    width: 1200
                    height: 450
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                )
            }
        }
        featured_image_title
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
