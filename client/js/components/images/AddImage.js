import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImageStore from '../../stores/ImageStore'
import Actions from '../../actions/Actions'
import Taggle from 'taggle'

class AddImage extends Component {
  static propTypes = {
    params: PropTypes.object,
    uploading: PropTypes.string
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

  previewImage = () => {
    if (this.refs.file.files.length) {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.refs.preview.src = e.target.result
      }
      reader.readAsDataURL(this.refs.file.files[0])
    } else {
      this.refs.preview.src = this.refs.url.value
    }
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
    let indicator
    switch(this.props.uploading) {
      case 'LOADING':
        indicator = <i className="fa fa-refresh fa-spin"></i>
        break
      case 'OK':
        indicator = <i className="fa fa-check-circle-o"></i>
        break
      case 'FAIL':
        indicator = <i className="fa fa-times-circle-o"></i>
        break
    }
    return (
      <div>
        <h1>Add a new Reaction Image</h1>
        <form onSubmit={this.addImage} className="add-image" encType="multipart/form-data">
          <fieldset>
            <legend> Image File: </legend>
            <label>Upload:</label> <input type="file" ref="file" onChange={this.previewImage} /><br />
            <div className="or-sep"> - or - </div>
            <label>URL:</label> <input type="text" className="input" ref="url" />
          </fieldset>

          <fieldset>
            <legend> Associated Tags: </legend>
            <div id="tags" ref="tags" className="clearfix"></div>
          </fieldset>

          <button type="submit" className="button add-button">
            Add Image { indicator }
          </button>
        </form>
        <div className="preview-image">
          <fieldset>
            <legend>Preview</legend>
            <img ref="preview" />
          </fieldset>
        </div>
      </div>
    )
  }
}

export default connectToStores(AddImage)
