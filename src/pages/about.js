import * as React from "react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"

const About = ({ 
    data: { site, markdownRemark: page}, 
    location,
 }) => {
    const siteTitle = site.siteMetadata?.title || `Title`

    return (
        <Layout location={location} title={siteTitle}>

            <article
                className="page"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header className="mb-8 md:w-4/5 mx-auto">
                    <h1 itemProp="headline" className="text-4xl mb-0 mt-0 text-rose-500 font-bold">{page?.frontmatter?.title}</h1>
                </header>
                <section
                    className="md:w-4/5 mx-auto"
                    dangerouslySetInnerHTML={{ __html: page?.html }}
                    itemProp="articleBody"
                />
                <hr />
                <footer>
                    <Bio />
                </footer>
            </article>
        </Layout>
    )
}

export default About

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
query Page {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fileAbsolutePath: { regex: "/about.md/" }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
