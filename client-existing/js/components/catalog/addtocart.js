import React from 'react'
import AppActions from '../../actions/actions'

class AddToCart extends React.Component{
  static propTypes = {
    item: React.PropTypes.object
  }

  constructor() {
    super()
  }

  _handler = () => {
    AppActions.addItem(this.props.item)
  }

  render() {
    return (
      <button onClick={ this._handler }>
        Add To Cart
      </button>
    )
  }
}

export default AddToCart
