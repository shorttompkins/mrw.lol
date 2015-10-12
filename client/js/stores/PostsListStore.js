import AppDispatcher from '../dispatchers/dispatcher'
import ActionTypes from '../constants/ActionTypes.js'
import _ from 'lodash'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let _posts = []

let PostsListStore = _.extend({}, EventEmitter.prototype, {

  emitChange() {
    console.log(' --> ListStore emittingChange')
    this.emit(CHANGE_EVENT)
  },
  addChangeListener(callback) { this.on(CHANGE_EVENT, callback) },
  removeChangeListener(callback) { this.removeListener(CHANGE_EVENT, callback) },

  getPosts() {
    return _posts
  }
})

PostsListStore.dispatcherToken = AppDispatcher.register(function(payload) {
  console.log('ListStore dispatched:', payload)
  switch(payload.actionType) {
    case ActionTypes.LOAD_POSTS_SUCCESS:
      _posts = payload.posts
      PostsListStore.emitChange()
      break
  }
})

export default PostsListStore
