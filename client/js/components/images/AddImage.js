import React, { Component, PropTypes } from 'react'
import connectToStores from '../../utils/connectToStores'
import ImageStore from '../../stores/ImageStore'
import Actions from '../../actions/Actions'
import Taggle from 'taggle'

let tags

class AddImage extends Component {
  static propTypes = {
    images: PropTypes.array,
    params: PropTypes.object
  }

  static getStores() {
    return [ImageStore]
  }

  static getStateFromStores() {
    return { }
  }

  componentDidMount() {
    this.setState({
      tags: new Taggle('tags', {placeholder: 'Enter tags...'})
    })
  }

  addImage = () => {
    let new_image = {
      url: this.refs.url.value || this.refs.file.value,
      tags: this.state.tags.getTags().values
    }
    Actions.addImage(new_image)
  }

  render() {
    return (
      <div className="add-image">
        <h1>Add a new Reaction Image</h1>
        <fieldset>
          <legend> Image File: </legend>
          <label>URL:</label> <input type="text" className="input" ref="url" /><br />
          <div className="or-sep"> - or - </div>
          <label>Upload:</label> <input type="file" ref="file" /><br />
        </fieldset>

        <fieldset>
          <legend> Associated Tags: </legend>
          <div id="tags" ref="tags" className="clearfix"></div>
        </fieldset>

        <button type="button" onClick={this.addImage} className="button add-button">Add Image</button>
      </div>

    )
  }
}

export default connectToStores(AddImage)
