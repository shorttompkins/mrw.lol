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
