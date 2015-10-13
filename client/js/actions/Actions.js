import ActionTypes from '../constants/ActionTypes'
import AppDispatcher from '../dispatchers/Dispatcher'
import request from 'superagent'

export default {
  loadPosts() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_POSTS
    })

    request
      .get('/api/posts')
      .end(function(err, res){
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_POSTS_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_POSTS_SUCCESS,
            posts: res.body
          })
        }
      })
  },

  loadPost(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_POST
    })

    request
      .get(`/api/posts/${id}`)
      .end(function(err, res){
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_POST_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_POST_SUCCESS,
            post: res.body
          })
        }
      })
  }
}
