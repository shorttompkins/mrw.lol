import React, { Component } from 'react'
import { Link } from 'react-router'

class Brief extends Component {
  static propTypes = {
    data: React.PropTypes.object
  }

  constructor() {
    super()
  }

  render() {
    return (
      <div className="brief">
        <Link to={'/apps/blog/posts/' + this.props.data._id} className="title">{this.props.data.title}</Link>
        <p className="description">{this.props.data.blurb}</p>
      </div>
    )
  }
}

export default Brief
