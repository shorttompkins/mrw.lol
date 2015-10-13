import React, { Component, PropTypes } from 'react'
import PostStore from '../stores/PostStore'
import Post from '../components/posts/Post'

class ViewPost extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  constructor() {
    super()
    this.state = this._getPost()
  }

  // boilerplate - nice to refactor out...
  componentDidMount = () => { PostStore.addChangeListener(this._onChange) }
  componentWillUnmount = () => { PostStore.removeChangeListener(this._onChange) }
  _onChange = () => { this.setState(this._getPost()) }

  _getPost() {
    return { post: PostStore.getPost(), comments: PostStore.getComments() }
  }

  render() {
    if (!this.state.post) { return <img src="/public/images/loading.gif" /> }

    return (
      <Post post={this.state.post} comments={this.state.comments} />
    )
  }
}

export default ViewPost
