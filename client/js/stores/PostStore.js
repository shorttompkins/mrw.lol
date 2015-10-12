import AppDispatcher from '../dispatchers/dispatcher'
import ActionTypes from '../constants/ActionTypes.js'
import _ from 'lodash'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let _current_post

let PostStore = _.extend({}, EventEmitter.prototype, {

  emitChange() {
    console.log(' --> PostStore emittingChange')
    this.emit(CHANGE_EVENT)
  },
  addChangeListener(callback) { this.on(CHANGE_EVENT, callback) },
  removeChangeListener(callback) { this.removeListener(CHANGE_EVENT, callback) },

  getPost() {
    return _current_post
  }
})

PostStore.dispatcherToken = AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    case ActionTypes.LOAD_POST:
      _current_post = {}
      PostStore.emitChange()
      break
    case ActionTypes.LOAD_POST_SUCCESS:
      _current_post = payload.post
      PostStore.emitChange()
      break
  }
})

export default PostStore
