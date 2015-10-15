import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _posts = []

let PostsListStore = baseStore({
  getPosts() {
    return _posts
  }
})

PostsListStore.dispatchHandler = (payload) => {
  switch(payload.actionType) {
    case ActionTypes.LOAD_POSTS_SUCCESS:
      _posts = payload.posts
      PostsListStore.emitChange()
      break
  }
}

export default PostsListStore
