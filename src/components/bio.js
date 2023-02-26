/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"

import { graphql, useStaticQuery } from "gatsby"

import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
    const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

    // Set these values by editing "siteMetadata" in gatsby-config.js
    const author = data.site.siteMetadata?.author
    const social = data.site.siteMetadata?.social

    return (
        <div className="flex items-center gap-4 my-8">
            <StaticImage
                className="profile-picture"
                layout="fixed"
                src="../images/profile-pic.jpg"
                width={80}
                height={80}
                quality={95}
                alt="Profile picture"
            />
            {author?.name && (
                <p className="m-0">
                    Written by <strong>{author.name}</strong>. {author?.summary || null}
                    {` `}
                    <a href={`https://twitter.com/${social?.twitter || ``}`} target="_blank">
                        Follow me on Twitter
                    </a>
                </p>
            )}
        </div>
    )
}

export default Bio
