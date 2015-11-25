import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImageStore from '../../stores/ImageStore'
import Actions from '../../actions/Actions'
import Taggle from 'taggle'

class AddImage extends Component {
  static propTypes = {
    params: PropTypes.object,
    image: PropTypes.object,
    uploading: PropTypes.string
  }

  static getStores() {
    return [ImageStore]
  }

  static getStateFromStores() {
    return { uploading: ImageStore.isUploading(), image: ImageStore.getImage() }
  }

  constructor() {
    super()
    this.state = {
      errorState: false
    }
  }

  componentDidMount() {
    let options = {placeholder: 'Enter tags...'}

    if (this.props.image.tags) {
      options.tags = this.props.image.tags
    }
    this.setState({
      tags: new Taggle('tags', options)
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
    if (this.props.image.uniqueid) {
      data.append('_id', this.props.image._id)
      data.append('uniqueid', this.props.image.uniqueid)
    } else if (this.refs.file.files.length) {
      data.append('file', this.refs.file.files[0])
    } else if (this.refs.url.value) {
      data.append('url', this.refs.url.value)
    }

    if (this.state.tags.getTags().values.length > 0) {
      data.append('tags', this.state.tags.getTags().values)
      Actions.addImage(data)
    } else {
      this.setState({
        tags: this.state.tags,
        errorState: true
      })
    }

  }

  render() {
    let indicator, { image } = this.props
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

    let upload_fieldset
    if (image.uniqueid) {
      upload_fieldset = (
        <fieldset>
          <legend> Image File: </legend>
          <label>UniqueID:</label> {image.uniqueid}
        </fieldset>
      )
    } else {
      upload_fieldset = (
        <fieldset>
          <legend> Image File: </legend>
          <label>Upload:</label> <input type="file" ref="file" onChange={this.previewImage} /><br />
          <div className="or-sep"> - or - </div>
          <label>URL:</label> <input type="text" className="input" ref="url" />
        </fieldset>
      )
    }

    let error_msg = ''
    if (this.state.errorState) {
      error_msg = (
        <div className="error-message">
          <strong>Error:</strong> Please provide a tag before adding an image.
        </div>
      )
    }

    return (
      <div>
        {error_msg}
        <h1>Add a new Reaction Image</h1>
        <form onSubmit={this.addImage} className="add-image" encType="multipart/form-data">
          {upload_fieldset}

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
            <img ref="preview" src={image.web_url ? image.web_url : ''}/>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default connectToStores(AddImage)
