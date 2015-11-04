import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImagesListStore from '../../stores/ImagesListStore'
import Card from './Card'

class ImagesList extends Component {
  static propTypes = {
    images: PropTypes.array,
    params: PropTypes.object
  }

  static getStores() {
    return [ImagesListStore]
  }

  static getStateFromStores() {
    return { images: ImagesListStore.getImages() }
  }

  render() {
    if (!this.props.images) { return <img src="/public/images/loading.gif" /> }

    let images_list = this.props.images.map((image) => (
      <Card key={image._id} image={image} />
    ))

    let title = ''
    if (this.props.params.tag) {
      title = (
        <h1>{this.props.params.tag}</h1>
      )
    }

    return (
      <div className="images">
        {title}
        {images_list}
      </div>

    )
  }
}

export default connectToStores(ImagesList)
