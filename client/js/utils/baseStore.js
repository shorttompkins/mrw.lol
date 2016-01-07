/************************
 *
 * baseStore Wrapper
 *
 * Handle boilerplate implementation for EventEmitter and change listener
 * handling.
 *
 * To Use:  import the baseStore.  When creating a new Store pass the store config
 * object into the baseStore wrapper:
 *
 * let MyStore = baseStore({
 *   myStoreFunction() {
 *     // do work etc.
 *   }
 * })
 *
 * Then assign your dispatchHandler separately on the new store:
 *
 * MyStore.dispatchHandler = (payload) => {
 *   switch(payload.actionType) {
 *      case ActionTypes.DO_SOMETHING:
 *        ImageStore.emitChange()
 *        break
 *   }
 * }
 ************************/

import AppDispatcher from '../dispatchers/Dispatcher'
import { assign } from 'lodash'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let baseStore = {
  emitChange() { this.emit(CHANGE_EVENT) },
  addChangeListener(callback) { this.on(CHANGE_EVENT, callback) },
  removeChangeListener(callback) { this.removeListener(CHANGE_EVENT, callback) }
}

assign(baseStore, EventEmitter.prototype)

function extendBaseStore(Store) {
  let newStore = {}
  assign(newStore, baseStore, Store)
  newStore.dispatcherToken = AppDispatcher.register(function(payload) {
    if (this.dispatchHandler) {
      this.dispatchHandler(payload)
    } else {
      /*eslint-disable no-console */
      console.debug(`${payload.actionType} was ignored because dispatchHandler() was not defined for this Store.`)
    }
  }.bind(newStore))

  return newStore
}

export default extendBaseStore
