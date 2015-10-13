import React, { PropTypes, Component } from 'react'
import Brief from './Brief'

export default class PostsList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  constructor() {
    super()
  }

  render() {
    if (this.props.posts && this.props.posts.length) {
      let posts_list = this.props.posts.map((post) => {
        return <Brief data={post} key={post._id} />
      })
      return (
        <div className="posts">
          {posts_list}
        </div>
      )
    } else {
      return (
        <img src="/public/images/loading.gif" />
      )
    }

  }
}
