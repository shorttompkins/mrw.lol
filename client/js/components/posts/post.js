import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  constructor() {
    super()
  }

  render() {
    const { post } = this.props

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
        <Link to="/apps/blog/"> &lt;&lt; Back to Posts</Link>
      </div>
    )
  }
}
