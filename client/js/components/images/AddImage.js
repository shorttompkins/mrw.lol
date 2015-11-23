import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImageStore from '../../stores/ImageStore'
import Actions from '../../actions/Actions'
import Taggle from 'taggle'

class AddImage extends Component {
  static propTypes = {
    images: PropTypes.array,
    params: PropTypes.object,
    uploading: PropTypes.bool
  }

  static getStores() {
    return [ImageStore]
  }

  static getStateFromStores() {
    return { uploading: ImageStore.isUploading() }
  }

  componentDidMount() {
    this.setState({
      tags: new Taggle('tags', {placeholder: 'Enter tags...'})
    })
  }

  addImage = (e) => {
    e.preventDefault()

    let data = new FormData()
    if (this.refs.file.files.length) {
      data.append('file', this.refs.file.files[0])
    } else {
      data.append('url', this.refs.url.value)
    }

    data.append('tags', this.state.tags.getTags().values)

    Actions.addImage(data)
  }

  render() {
    return (
      <form onSubmit={this.addImage}  className="add-image" encType="multipart/form-data">
        <h1>Add a new Reaction Image</h1>

        <fieldset>
          <legend> Image File: </legend>
          <label>URL:</label> <input type="text" className="input" ref="url" /><br />
          <div className="or-sep"> - or - </div>
          <label>Upload:</label> <input type="file" ref="file" onChange={this.handleFile} /><br />
        </fieldset>

        <fieldset>
          <legend> Associated Tags: </legend>
          <div id="tags" ref="tags" className="clearfix"></div>
        </fieldset>

        <button type="submit" className="button add-button">Add Image { this.props.uploading ? <img src="/public/images/loading.gif" /> : ''}</button>
      </form>
    )
  }
}

export default connectToStores(AddImage)
