import React, { Component } from 'react'
import AppActions from '../../actions/actions'
import PostsListStore from '../../stores/PostsListStore'
import PostsList from '../../components/posts/list'

class List extends Component {
  constructor() {
    super()
    this.state = this._getPosts()
  }

  componentDidMount = () => {
    PostsListStore.addChangeListener(this._onChange)
  }

  componentWillUnmount = () => {
    PostsListStore.removeChangeListener(this._onChange)
  }

  _onChange = () => {
    this.setState(this._getPosts())
  }

  _getPosts() {
    return { posts: PostsListStore.getPosts() }
  }

  render() {
    if (!this.state.posts.length) { return <img src="/public/images/loading.gif" /> }

    return (
      <PostsList posts={this.state.posts} />
    )
  }
}

List.willTransitionTo = function() {
  if (!PostsListStore.getPosts().length) {
    AppActions.loadPosts()
  }
}

export default List
