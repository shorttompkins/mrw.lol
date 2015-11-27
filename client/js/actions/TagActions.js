import ActionTypes from '../constants/ActionTypes'
import AppDispatcher from '../dispatchers/Dispatcher'
import request from 'superagent'

export default {
  loadTags() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_TAGS
    })

    request
      .get('/api/tags')
      .end((err, res) =>{
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_TAGS_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_TAGS_SUCCESS,
            tags: res.body
          })
        }
      })
  },
  loadTagsByUserId(userid) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_TAGS_BYUSERID
    })

    request
      .get(`/api/users/${userid}/tags`)
      .end((err, res) =>{
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_TAGS_BYUSERID_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_TAGS_BYUSERID_SUCCESS,
            tags: res.body
          })
        }
      })
  },
  loadImageUserTags(imageid, userid) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_IMAGE_TAGS_BYUSER
    })

    request
      .get(`/api/users/${userid}/tags/${imageid}`)
      .end((err, res) =>{
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGE_TAGS_BYUSER_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGE_TAGS_BYUSER_SUCCESS,
            tags: res.body
          })
        }
      })
  }
}
