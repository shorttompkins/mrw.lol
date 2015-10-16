import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import PostsListStore from '../../stores/PostsListStore'
import Brief from './Brief'

class PostsList extends Component {
  static propTypes = {
    posts: PropTypes.array
  }

  static getStores() {
    return [PostsListStore]
  }

  static getStateFromStores() {
    return { posts: PostsListStore.getPosts() }
  }

  render() {
    if (!this.props.posts) { return <img src="/public/images/loading.gif" /> }

    let posts_list = this.props.posts.map((post) => {
      return <Brief post={post} key={post._id} />
    })
    return (
      <div className="posts">
        {posts_list}
      </div>
    )
  }
}

export default connectToStores(PostsList)
