/************************
 *
 * connectToStores Higher Order Component
 *
 * Handle boilerplate implementation for Components that need to connect to
 * and listen to Stores.
 *
 * To Use:  Create a base React component and wrap it via connectToStores(Component)
 * call.  Ensure that the component contains the appropriate statics that the
 * wrapper requires:

 import React, { Component, PropTypes } from 'react'
 import connectToStores from '../../utils/connectToStores'
 import MyStore from '../../stores/MyStore'

 class MyComponent extends Component {
   // required:
   static getStores() {
     return [MyStore]
   }

   // required:
   static getStateFromStores() {
     return {
       myStoreData: MyStore.getData()
     }
   }

   // required: connectToStores will inject Store data as this.prop...
   static propTypes = {
     myStoreData: PropTypes.type
   }

   render() {
     // refer to this.props.myStoreData when rendering
   }
 }

 export default connectToStores(MyComponent)
 *
 ************************/

import React, { Component } from 'react'
import { isFunction } from 'lodash'

function connectToStores(Component) {
  if (!isFunction(Component.getStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getStores() method')
  }
  if (!isFunction(Component.getStateFromStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getStateFromStores() method')
  }

  class StoreConnection extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = Component.getStateFromStores()
    }

    componentDidMount() {
      Component.getStores().forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      )
    }
    componentWillUnmount() {
      Component.getStores().forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      )
    }
    handleStoresChanged = () => {
      this.setState(Component.getStateFromStores(this.props))
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
