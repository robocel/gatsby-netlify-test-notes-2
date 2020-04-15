import React from "react"
import { graphql } from "gatsby"
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  const [comments, setComment] = React.useState([])
  const [newComment, setNewComment] = React.useState("")

  const getComments = () => {
    fetch(`/.netlify/functions/post-comments/${frontmatter.slug}`)
      .then(res => res.json())
      .then(comments =>
        setComment(comments.map(comment => comment.data.comment) || [])
      )
  }

  const submitForm = event => {
    fetch(`/.netlify/functions/post-comments`, {
      method: "POST",
      body: JSON.stringify({ post: frontmatter.slug, comment: newComment }),
    }).then(() => {
      setNewComment("")
      getComments()
    })
    event.preventDefault()
  }

  React.useEffect(() => getComments(), [])

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <form onSubmit={event => submitForm(event)}>
        <input
          type="text"
          value={newComment}
          onChange={event => setNewComment(event.target.value)}
        ></input>
        <button type="submit">Submit Comment</button>
      </form>
      <section>
        <h3>Comments</h3>
        {comments.map((comment, idx) => (
          <p key={idx}>{comment}</p>
        ))}
      </section>
    </div>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        slug
      }
    }
  }
`
