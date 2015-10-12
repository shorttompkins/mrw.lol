import AppDispatcher from '../dispatchers/dispatcher'
import AppConstants from '../constants/constants.js'
import assign from 'react/lib/Object.assign'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let _current_post, _posts = []

let AppStore = assign(EventEmitter.prototype, {

  emitChange() { this.emit(CHANGE_EVENT) },
  addChangeListener(callback) { this.on(CHANGE_EVENT, callback) },
  removeChangeListener(callback) { this.removeListener(CHANGE_EVENT, callback) },

  loading: false,

  getPosts() {
    return _posts
  },

  getPost() {
    return _current_post
  }
})

AppStore.dispatcherIndex = AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    case AppConstants.LOAD_POSTS:
      AppStore.loading = true
      break
    case AppConstants.LOAD_POSTS_SUCCESS:
      AppStore.loading = false
      _posts = payload.posts
      break
    case AppConstants.LOAD_POST:
      AppStore.loading = true
      _current_post = {}
      break
    case AppConstants.LOAD_POST_SUCCESS:
      AppStore.loading = false
      _current_post = payload.post
      break
  }
  AppStore.emitChange()
  return true
})


export default AppStore
