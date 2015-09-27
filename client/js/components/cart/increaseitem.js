import React from 'react'
import AppActions from '../../actions/actions'

class IncreaseItem extends React.Component {
  static propTypes = {
    index: React.PropTypes.number
  }

  constructor() {
    super()
  }

  _handler = () => {
    AppActions.increaseItem(this.props.index)
  }

  render() {
    return (
      <button onClick={ this._handler }>+</button>
    )
  }
}

export default IncreaseItem
