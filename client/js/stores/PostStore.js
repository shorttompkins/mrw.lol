import AppDispatcher from '../dispatchers/Dispatcher'
import ActionTypes from '../constants/ActionTypes.js'
import _ from 'lodash'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let _current_post, _comments = []

let PostStore = _.extend({}, EventEmitter.prototype, {

  emitChange() { this.emit(CHANGE_EVENT) },
  addChangeListener(callback) { this.on(CHANGE_EVENT, callback) },
  removeChangeListener(callback) { this.removeListener(CHANGE_EVENT, callback) },

  getPost() {
    return _current_post
  },

  getComments() {
    return _comments
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
    case ActionTypes.LOAD_POST_COMMENTS_SUCCESS:
      _comments = payload.comments
      PostStore.emitChange()
      break
    case ActionTypes.NEW_POST_COMMENT_SUCCESS:
      _comments.push(payload.comment)
      PostStore.emitChange()
      break
  }
})

export default PostStore
