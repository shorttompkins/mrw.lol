import React, { Component, PropTypes } from 'react'
import connectToStores from '../utils/connectToStores'
import PostStore from '../stores/PostStore'
import Post from '../components/posts/Post'

class ViewPost extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    post: PropTypes.object,
    comments: PropTypes.array
  }

  constructor() {
    super()
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

    return (
      <Post post={this.props.post} comments={this.props.comments} />
    )
  }
}

export default connectToStores(ViewPost)
