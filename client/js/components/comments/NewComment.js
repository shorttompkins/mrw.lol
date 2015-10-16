import React, { Component, PropTypes } from 'react'
import AppActions from '../../actions/Actions'

class NewComment extends Component {
  static propTypes = {
    postid: PropTypes.string.isRequired
  }

  handleNewComment = () => {
    AppActions.postNewComment({
      postid: this.props.postid,
      name: this.refs.name.value,
      email: this.refs.email.value,
      comment: this.refs.comment.value
    })
  }

  componentDidMount = () => {
    this.refs.name.focus()
  }

  render() {
    return (
      <div className="new-comment">
        <label>Name:</label> <input type="text" ref="name" placeholder="Your Name" /><br/>
        <label>Email:</label> <input type="text" ref="email" placeholder="Email Address" /><br/>
        <label>Comment:</label><br/>
        <textarea rows="4" cols="60" ref="comment"></textarea>
        <br/><br/>
        <button className="btn btn-primary" onClick={this.handleNewComment}>Submit Comment!</button>
      </div>
    )
  }
}

export default NewComment
