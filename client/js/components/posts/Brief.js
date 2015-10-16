import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Brief extends Component {
  static propTypes = {
    post: React.PropTypes.object.isRequired
  }

  render() {
    let { post } = this.props
    return (
      <div className="brief">
        <Link to={`/apps/blog/posts/${post._id}`} className="title"><strong>{post.title}</strong></Link>
        <p className="description">{post.blurb}</p>
      </div>
    )
  }
}
