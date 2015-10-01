import React from 'react'
import AppActions from '../../actions/actions'

class DecreaseItem extends React.Component {
  static propTypes = {
    index: React.PropTypes.number
  }

  constructor() {
    super()
  }

  _handler = () => {
    AppActions.decreaseItem(this.props.index)
  }

  render() {
    return (
      <button onClick={ this._handler }>-</button>
    )
  }
}

export default DecreaseItem
