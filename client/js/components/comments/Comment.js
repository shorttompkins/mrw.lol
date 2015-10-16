import React, { Component, PropTypes } from 'react'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  render() {
    let { comment } = this.props
    return (
      <div className="comment">
        <div className="byline">
          <img className="avatar" src={comment.gravatar} />
          From: <strong><a href={`mailto:${comment.email}`}>{comment.name}</a></strong><br/>@ {comment.timestamp}
        </div>
        <div>
          {comment.comment}
        </div>
      </div>
    )
  }
}

export default Comment
