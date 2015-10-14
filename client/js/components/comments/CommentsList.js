import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import NewComment from './NewComment'

export default class CommentsList extends Component {
  static propTypes = {
    postid: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired
  }

  constructor() {
    super()
    this.state = {
      showNewComment: false
    }
  }

  toggleNewComment = () => {
    this.setState({showNewComment: !this.state.showNewComment })
  }

  render() {
    let comments = this.props.comments.map((comment) => {
      return (
        <Comment comment={comment} key={comment._id} />
      )
    })

    let newComment = this.state.showNewComment ? <NewComment postid={this.props.postid} /> : null

    return (
      <div className="comments">
        <button className="btn btn-primary float-right" onClick={this.toggleNewComment}>Post New Comment</button>
        <h3>Comments: ({comments.length})</h3>
        {comments}
        {newComment}
      </div>
    )
  }
}
