import React, { Component, PropTypes } from 'react'
import Comment from './comment'

export default class CommentsList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired
  }

  render() {
    let comments = this.props.comments.map((comment) => {
      return (
        <Comment comment={comment} key={comment._id} />
      )
    })

    return (
      <div className="comments">
        <h3>Comments: ({comments.length})</h3>
        {comments}
      </div>
    )
  }
}
