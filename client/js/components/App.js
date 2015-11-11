import React, { Component } from 'react'
import Header from './layout/Header'

class App extends Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Header />

        <div className="body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
