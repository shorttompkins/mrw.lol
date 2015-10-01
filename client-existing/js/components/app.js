import React from 'react'
import Header from './layout/header'
import { RouteHandler } from 'react-router'

class App extends React.Component {
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
          <RouteHandler />
        </div>
      </div>
    )
  }
}

export default App
