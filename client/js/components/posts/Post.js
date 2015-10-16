import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import connectToStores from '../../utils/connectToStores'
import PostStore from '../../stores/PostStore'
import CommentsList from '../comments/CommentsList'

class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array
  }

  static getStores() {
    return [PostStore]
  }

  static getStateFromStores() {
    return {
      post: PostStore.getPost(),
      comments: PostStore.getComments()
    }
  }

  render() {
    if (!this.props.post) { return <img src="/public/images/loading.gif" /> }

    const { post, comments } = this.props

    if (!post || !post._id) return null

    return (
      <div className="post">
        <h1>{post.title}</h1>
        <span className="description">{post.blurb}</span>
        <br/><br/>
        <div className="body">
          {post.body}
        </div>
        <br/>
        <CommentsList postid={post._id} comments={comments} />
        <br/>
        <Link to="/apps/blog/"> &lt;&lt; Back to Posts</Link>
      </div>
    )
  }
}

export default connectToStores(Post)
