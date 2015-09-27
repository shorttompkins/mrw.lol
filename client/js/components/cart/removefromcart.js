import React from 'react'
import AppActions from '../../actions/actions'

class RemoveFromCart extends React.Component {
  static propTypes = {
    index: React.PropTypes.number
  }

  constructor() {
    super()
  }

  _handler = () => {
    AppActions.removeItem(this.props.index)
  }

  render() {
    return (
      <button onClick={ this._handler }>x</button>
    )
  }
}
export default RemoveFromCart
