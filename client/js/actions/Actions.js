import ActionTypes from '../constants/ActionTypes'
import AppDispatcher from '../dispatchers/Dispatcher'
import request from 'superagent'

export default {
  loadImages() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_IMAGES
    })

    request
      .get('/api/images')
      .end(function(err, res){
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGES_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGES_SUCCESS,
            images: res.body
          })
        }
      })
  },
  loadImagesByTag(tag) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_IMAGES_BYTAG
    })
    
    request
      .get(`/api/images/${tag}`)
      .end(function(err, res){
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGES_BYTAG_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGES_BYTAG_SUCCESS,
            tag: tag,
            images: res.body
          })
        }
      })
  }
}
