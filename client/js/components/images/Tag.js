import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import 'stylesheets/components/images/tag-link'

class Tag extends Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    userid: PropTypes.string
  }

  static defaultProps = {
    userid: ''
  }

  render() {
    let { tag } = this.props

    let className = 'tag-link',
        linkUrl = `/images/${tag}`
    if (this.props.userid !== '') {
      className += ' user-tag'
      linkUrl = `/users/${this.props.userid}/${tag}`
    }

    return (
      <Link className={className} to={linkUrl}>
        <i className="fa fa-tag"></i> {tag}
      </Link>
    )
  }
}

export default Tag
