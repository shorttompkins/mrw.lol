import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImageStore from '../../stores/ImageStore'
import UserStore from '../../stores/UserStore'
import TagsStore from '../../stores/TagsStore'
import { Link } from 'react-router'

class Image extends Component {
  static propTypes = {
    image: PropTypes.object,
    user: PropTypes.object,
    usertags: PropTypes.array
  }

  static getStores() {
    return [ImageStore, UserStore, TagsStore]
  }

  static getStateFromStores() {
    return { image: ImageStore.getImage(), user: UserStore.getUser(), usertags: TagsStore.getUserTags() }
  }

  render() {
    if (!this.props.image.url) { return <i className="fa fa-refresh fa-spin"></i> }

    let image = this.props.image,
        tags = image.tags.map((tag, index) => (
          <Link className="tag-link" to={`/images/${tag}`} key={index}>
            <i className="fa fa-tag"></i> {tag}
          </Link>
        ))

    let user_tags = ''
    if (this.props.usertags.length) {
      user_tags = this.props.usertags.map((tag, index) => (
        <Link className="tag-link user-tag" to={`/users/${this.props.user._id}/${tag}`} key={index}>
          <i className="fa fa-tag"></i> {tag}
        </Link>
      ))
    }

    return (
      <div className="image">
        <img src={image.web_url} className="image-full"/>

        <div>
          { this.props.user._id ? (
              <Link to={`/image/add/${image.uniqueid}`} className="button add-button left">
                <i className="fa fa-plus"></i> Add
              </Link>
            ) : ''
          }
          Filename: {image.filename.substring(image.uniqueid.length+1)}
          <br/>
          UniqueID: {image.uniqueid}
          <br/><br/>
        </div>
        <h3>Tags:</h3>
        {tags}
        <br/>
        {user_tags.length ? <div><strong>Your Tags:</strong></div> : '' }
        {user_tags}
      </div>

    )
  }
}

export default connectToStores(Image)
