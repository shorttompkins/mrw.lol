import React, { Component, PropTypes } from 'react'
import AppActions from '../../actions/actions'
import PostStore from '../../stores/PostStore'
import Post from '../../components/posts/post'

class List extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  constructor() {
    super()
    this.state = this._getPost()
  }

  componentDidMount = () => {
    PostStore.addChangeListener(this._onChange)
  }

  componentWillUnmount = () => {
    PostStore.removeChangeListener(this._onChange)
  }

  _onChange = () => {
    this.setState(this._getPost())
  }

  _getPost() {
    return { post: PostStore.getPost() }
  }

  render() {
    if (!this.state.post) { return <img src="/public/images/loading.gif" /> }

    return (
      <Post post={this.state.post} />
    )
  }
}

List.willTransitionTo = function(transition, params) {
  // dont reload the last Post if its the same
  if (!PostStore.getPost() || PostStore.getPost()._id !== params.postid) {
    AppActions.loadPost(params.postid)
  }
}

export default List
