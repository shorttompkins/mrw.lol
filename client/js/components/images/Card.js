import React, { Component } from 'react'
import { Link } from 'react-router'

import 'stylesheets/components/images/card'

class Card extends Component {
  static propTypes = {
    image: React.PropTypes.object
  }

  hoverHandler = () => {
    let canvas = this.refs.canvas,
        image = this.refs.image

    if (canvas.className === 'show') {
      image.className = 'show'
      canvas.className = 'hide'
    } else {
      image.className = 'hide'
      canvas.getContext('2d').drawImage(image, 0, 0, 190, 190)
      canvas.className = 'show'
    }
  }

  gifHandler = () => {
    let canvas = this.refs.canvas,
        image = this.refs.image

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, 190, 190)
  }

  render() {
    let { image } = this.props
    return (
      <Link to={`/image/${image.uniqueid}`} key={image._id} className="card">
        <div>
          <i className="fa fa-search-plus"></i>
          <img ref="image" src={image.web_url} onLoad={this.gifHandler} className="hide" onMouseOut={this.hoverHandler} /><br/>
          <canvas ref="canvas" width="190" height="190" className="show" onMouseOver={this.hoverHandler} />
        </div>
      </Link>
    )
  }
}

export default Card
