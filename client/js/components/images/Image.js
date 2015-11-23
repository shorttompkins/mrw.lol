import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImageStore from '../../stores/ImageStore'
import { Link } from 'react-router'

class Image extends Component {
  static propTypes = {
    image: PropTypes.object
  }

  static getStores() {
    return [ImageStore]
  }

  static getStateFromStores() {
    return { image: ImageStore.getImage() }
  }

  render() {
    if (!this.props.image.url) { return <img src="/public/images/loading.gif" /> }

    let image = this.props.image,
        tags = image.tags.map((tag, index) => (<a className="tag-link" href={`/images/${tag}`} key={index}><i className="fa fa-tag"></i> {tag}</a>))

    return (
      <div className="image">
        <img src={image.web_url} className="image-full"/>

        <div>
          <Link to={`/image/add/${image.uniqueid}`} className="button add-button left"><i className="fa fa-plus"></i> Add</Link>
          Filename: {image.filename.substring(image.uniqueid.length+1)}
          <br/>
          UniqueID: {image.uniqueid}
          <br/><br/>
        </div>
        <h3>Tags:</h3>
        {tags}
      </div>

    )
  }
}

export default connectToStores(Image)
