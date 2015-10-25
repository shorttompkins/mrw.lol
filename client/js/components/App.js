import React, { Component } from 'react'
import Header from './layout/header'

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

        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
