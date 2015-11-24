import React, { Component } from 'react'
import { Link } from 'react-router'

class Logout extends Component {
  static propTypes = {
    user: React.PropTypes.object
  }
  render() {
    return (
      <div className="login-links">
        <div className="avatar">
          <Link to={`/user/${this.props.user.display ? this.props.user.display : this.props.user._id}`}><img src={this.props.user.avatar} /></Link>
        </div>
        <br/>
        <a><i className="fa fa-gear"></i></a><br/>
        <a href="/auth/logout"><i className="fa fa-sign-out"></i></a>
      </div>
    )
  }
}

export default Logout
