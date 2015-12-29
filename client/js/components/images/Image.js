import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImageStore from '../../stores/ImageStore'
import UserStore from '../../stores/UserStore'
import TagsStore from '../../stores/TagsStore'
import { Link } from 'react-router'
import Tag from './Tag'

import 'stylesheets/components/images/image'

class Image extends Component {
  static getStores() {
    return [ImageStore, UserStore, TagsStore]
  }

  static getStateFromStores() {
    return { image: ImageStore.getImage(), user: UserStore.getUser(), usertags: TagsStore.getUserTags() }
  }

  static propTypes = {
    image: PropTypes.object,
    user: PropTypes.object,
    usertags: PropTypes.array
  }

  render() {
    if (!this.props.image.url) { return <i className="fa fa-refresh fa-spin"></i> }

    let { image } = this.props,
        tags = image.tags.map((tag, index) => (
          <Tag tag={tag} key={index} />
        ))

    let user_tags = this.props.usertags.map((tag, index) => (
      <Tag tag={tag} key={index} userid={this.props.user._id} />
    ))

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
