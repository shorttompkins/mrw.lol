import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImagesListStore from '../../stores/ImagesListStore'
import TagsStore from '../../stores/TagsStore'
import Card from './Card'
import Tag from './Tag'

class ImagesList extends Component {
  static getStores() {
    return [ImagesListStore, TagsStore]
  }

  static getStateFromStores() {
    return {
      images: ImagesListStore.getImages(),
      tags: TagsStore.getTags(),
      imagesLoading: ImagesListStore.getLoadingStatus()
    }
  }

  static propTypes = {
    images: PropTypes.array,
    imagesLoading: PropTypes.bool,
    tags: PropTypes.array,
    params: PropTypes.object
  }

  render() {
    if (this.props.imagesLoading) { return <i className="fa fa-refresh fa-spin"></i> }

    let images_list = this.props.images.map(image => (
      <Card key={image._id} image={image} />
    ))

    let title = ''
    if (this.props.params.tag) {
      let randomUrl = `/random/${this.props.params.tag}`

      if (this.props.params.userid) {
        randomUrl = `/random/${this.props.params.userid}/${this.props.params.tag}`
      }

      title = (
        <h1>Tag: {this.props.params.tag}
          <div className="random-link">
            <a href={randomUrl}><i className="fa fa-random"></i></a>
          </div>
        </h1>
      )
    }

    let tags = this.props.tags ? this.props.tags.map((tag, index) => (
      <Tag tag={tag} key={index} userid={this.props.params.userid} />
    )) : ''

    if (!title) {
      tags = (
        <div className="tags clearfix">
          <h3>Tags:</h3>
          {tags}
        </div>
      )
    } else {
      tags = ''
    }

    return (
      <div>
        <div className="images">
          {title}
          {images_list.length ? images_list : (<strong><br/>No matching images found.</strong>)}
        </div>
        { tags }
      </div>
    )
  }
}

export default connectToStores(ImagesList)
