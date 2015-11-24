import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImageStore from '../../stores/ImageStore'
import UserStore from '../../stores/UserStore'
import { Link } from 'react-router'

class Image extends Component {
  static propTypes = {
    image: PropTypes.object,
    userid: PropTypes.string
  }

  static getStores() {
    return [ImageStore]
  }

  static getStateFromStores() {
    return { image: ImageStore.getImage(), userid: UserStore.getUserid() }
  }

  render() {
    if (!this.props.image.url) { return <i className="fa fa-refresh fa-spin"></i> }

    let image = this.props.image,
        tags = image.tags.map((tag, index) => (
          <Link className="tag-link" to={`/images/${tag}`} key={index}>
            <i className="fa fa-tag"></i> {tag}
          </Link>
        ))

    return (
      <div className="image">
        <img src={image.web_url} className="image-full"/>

        <div>
          { this.props.userid ? (
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
      </div>

    )
  }
}

export default connectToStores(Image)
