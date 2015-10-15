import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _current_post, _comments = []

let PostStore = baseStore({
  getPost() {
    return _current_post
  },
  getComments() {
    return _comments
  }
})

PostStore.dispatchHandler = (payload) => {
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
}

export default PostStore
