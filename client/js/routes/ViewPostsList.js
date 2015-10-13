import React, { Component } from 'react'
import PostsListStore from '../stores/PostsListStore'
import PostsList from '../components/posts/PostsList'

export default class ViewPostsList extends Component {
  constructor() {
    super()
    this.state = this._getPosts()
  }

  // boilerplate - nice to refactor out...
  componentDidMount = () => { PostsListStore.addChangeListener(this._onChange) }
  componentWillUnmount = () => { PostsListStore.removeChangeListener(this._onChange) }
  _onChange = () => { this.setState(this._getPosts()) }

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
