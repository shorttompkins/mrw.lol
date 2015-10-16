import React, { Component } from 'react'
import Header from '../components/layout/Header'

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
        <hr size="1" />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
