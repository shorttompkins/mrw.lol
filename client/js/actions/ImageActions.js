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
      .end((err, res) =>{
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
      .end((err, res) =>{
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
  },
  loadImagesByUserId(userid) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_IMAGES_BYUSERID
    })

    request
      .get(`/api/users/${userid}/images`)
      .end((err, res) =>{
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGES_BYUSERID_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGES_BYUSERID_SUCCESS,
            images: res.body
          })
        }
      })
  },
  loadImagesByUserIdTag(userid, tag) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_IMAGES_BYUSERID_BYTAG
    })

    request
      .get(`/api/users/${userid}/${tag}`)
      .end((err, res) =>{
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGES_BYUSERID_BYTAG_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGES_BYUSERID_BYTAG_SUCCESS,
            images: res.body
          })
        }
      })
  },
  loadImageByUniqueId(uniqueid) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_IMAGE_BYID
    })

    request
      .get(`/api/image/${uniqueid}`)
      .end((err, res) =>{
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGE_BYID_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGE_BYID_SUCCESS,
            image: res.body
          })
        }
      })
  },

  addImage(image) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.ADD_IMAGE
    })

    request
      .post('/api/image/')
      .send(image)
      .end((err, res) =>{
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.ADD_IMAGE_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.ADD_IMAGE_SUCCESS,
            image: res.body
          })
        }
      })
  },
  resetImage() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.RESET_IMAGE
    })
  }
}
