import React from "react"
import { Link, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Blogs" />
      <h1>My blogs</h1>
      <p>Please read my blogs</p>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li><Link to={node.frontmatter.path}>{node.frontmatter.title}</Link></li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage
