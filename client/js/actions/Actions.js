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
  },

  loadPostComments(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_POST_COMMENTS
    })

    request
      .get(`/api/posts/${id}/comments`)
      .end(function(err, res){
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_POST_COMMENTS_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_POST_COMMENTS_SUCCESS,
            comments: res.body
          })
        }
      })
  },

  postNewComment(comment) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.NEW_POST_COMMENT
    })

    request
      .post(`/api/posts/${comment.postid}/comments`)
      .send({name: comment.name, email: comment.email, comment: comment.comment})
      .end(function(err, res){
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.NEW_POST_COMMENT_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.NEW_POST_COMMENT_SUCCESS,
            comment: res.body.comment
          })
        }
      })
  }
}
