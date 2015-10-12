import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatchers/dispatcher'
import request from 'superagent'

export default {
  loadPosts() {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_POSTS
    })

    // do async thing here:
    request
      .get('/api/posts')
      .end(function(err, res){
        if (err) {
          AppDispatcher.dispatch({
            actionType: AppConstants.LOAD_POSTS_FAIL
          })
        } else {
          AppDispatcher.dispatch({
            actionType: AppConstants.LOAD_POSTS_SUCCESS,
            posts: res.body
          })
        }
      })
  },

  loadPost(id) {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_POST
    })

    // do async thing here:
    request
      .get(`/api/posts/${id}`)
      .end(function(err, res){
        if (err) {
          AppDispatcher.dispatch({
            actionType: AppConstants.LOAD_POST_FAIL
          })
        } else {
          AppDispatcher.dispatch({
            actionType: AppConstants.LOAD_POST_SUCCESS,
            post: res.body
          })
        }
      })
  }
}
