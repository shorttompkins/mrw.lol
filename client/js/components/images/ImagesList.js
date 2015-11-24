import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImagesListStore from '../../stores/ImagesListStore'
import TagsStore from '../../stores/TagsStore'
import Card from './Card'
import {Link} from 'react-router'

class ImagesList extends Component {
  static propTypes = {
    images: PropTypes.array,
    tags: PropTypes.array,
    params: PropTypes.object
  }

  static getStores() {
    return [ImagesListStore, TagsStore]
  }

  static getStateFromStores() {
    return { images: ImagesListStore.getImages(), tags: TagsStore.getTags() }
  }

  render() {
    if (!this.props.images.length) { return <i className="fa fa-refresh fa-spin"></i> }

    let images_list = this.props.images.map((image) => (
      <Card key={image._id} image={image} />
    ))

    let title = ''
    if (this.props.params.tag) {
      title = (
        <h1>Tag: {this.props.params.tag}</h1>
      )
    }

    let tags = this.props.tags ? this.props.tags.map((tag, index) => (
      <Link className="tag-link" to={`/images/${tag}`} key={index}>
        <i className="fa fa-tag"></i> {tag}
      </Link>
    )) : ''

    return (
      <div>
        <div className="images">
          {title}
          {images_list}
        </div>
        { !title ? (
        <div className="tags clearfix">
          <h3>Tags:</h3>
          {tags}
        </div>
      ) : ''}
      </div>
    )
  }
}

export default connectToStores(ImagesList)
