import * as React from "react"

import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const posts = data.allMarkdownRemark.nodes?.filter(post => post?.fields?.slug != '/about/')

    if (posts.length === 0) {
        return (
            <Layout location={location} title={siteTitle}>
                <Bio />
                <p>
                    No blog posts found. Add markdown posts to "content/blog" (or the
                    directory you specified for the "gatsby-source-filesystem" plugin in
                    gatsby-config.js).
                </p>
            </Layout>
        )
    }

    return (
        <Layout location={location} title={siteTitle}>

            <ol style={{ listStyle: `none` }}>
                {posts.map(post => {
                    const title = post.frontmatter.title || post.fields.slug
                    const featuredImage = post.frontmatter.featured_image?.childImageSharp?.gatsbyImageData || null
                    const featuredImageTitle = post.frontmatter.featured_image_title || null

                    return (
                        <li key={post.frontmatter.title}>
                            <article
                                className="pt-8"
                                itemScope
                                itemType="http://schema.org/Article"
                            >
                                {featuredImage && (
                                    <div className="mb-8">
                                        <Link to={post.fields.slug}>
                                            <img
                                                srcSet={featuredImage.images.fallback.srcSet}
                                                sizes={featuredImage.images.fallback.sizes}
                                                src={featuredImage.images.fallback.src}
                                                alt={featuredImageTitle}
                                                className="w-full h-auto rounded border border-slate-200 shadow-lg"
                                            />
                                        </Link>
                                    </div>
                                )}
                                <div className="md:w-4/5 mx-auto pb-8 border-b border-slate-200">
                                    <header>
                                        <small className="text-slate-500 text-sm mb-0 font-bold uppercase">{post.frontmatter.date}</small>
                                        <h2 className="font-display font-bold text-2xl mb-4">
                                            <Link to={post.fields.slug} itemProp="url" className="no-underline transition-colors duration-200 ease-in-out hover:text-rose-700">
                                                <span itemProp="headline">{title}</span>
                                            </Link>
                                        </h2>
                                        { post?.frontmatter?.tags && (
                                            <div className="flex flex-wrap mb-4 gap-2">
                                                {post.frontmatter.tags.map(tag => (
                                                    <span key={ tag } className="bg-slate-200 text-xs inline-block px-3 py-1 rounded-full no-underline text-slate-700">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </header>
                                    <section>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: post.frontmatter.description || post.excerpt,
                                            }}
                                            itemProp="description"
                                        />

                                        <Link to={post.fields.slug} className="bg-rose-300 hover:bg-rose-500 transition-all duration-200 hover:shadow-lg mt-4 inline-block px-4 py-1 text-sm rounded-full no-underline text-rose-800 hover:text-white">
                                            Read more
                                        </Link>
                                    </section>
                                </div>
                            </article>
                        </li>
                    )
                })}
            </ol>

            <footer>
                <Bio />
            </footer>
        </Layout>
    )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          tags
          title
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
    }
  }
`
