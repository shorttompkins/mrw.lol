import React from 'react'
import { isFunction } from 'lodash'

function connectToStores(Component) {
  if (!isFunction(Component.getStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getStores() method')
  }
  if (!isFunction(Component.getStateFromStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getStateFromStores() method')
  }

  let stores = Component.getStores()
  let getStateFromStores = Component.getStateFromStores

  class StoreConnection extends React.Component {
    constructor(props, context) {
      super(props, context)
      this.state = getStateFromStores(this.props)
    }

    componentDidMount = () => {
      stores.forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      )
    }
    componentWillUnmount = () => {
      stores.forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      )
    }
    handleStoresChanged = () => {
      this.setState(getStateFromStores(this.props))
    }
    render() {
      Component.getStores()
      return <Component {...this.props} {...this.state} />
    }
  }

  if (Component.contextTypes) {
    StoreConnection.contextTypes = Component.contextTypes
  }

  return StoreConnection
}

export default connectToStores
