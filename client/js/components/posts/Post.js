import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import CommentsList from '../comments/CommentsList'

export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired
  }

  constructor() {
    super()
  }

  render() {
    const { post, comments } = this.props

    if (!post) return null

    return (
      <div className="post">
        <h1>{post.title}</h1>
        <span className="description">{post.blurb}</span>
        <br/><br/>
        <div className="body">
          {post.body}
        </div>
        <br/>
        <CommentsList comments={comments} />
        <br/>
        <Link to="/apps/blog/"> &lt;&lt; Back to Posts</Link>
      </div>
    )
  }
}
