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
  loadImageById(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_IMAGE_BYID
    })

    request
      .get(`/api/image/${id}`)
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
  loadImageByFilename(filename) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_IMAGE_BYFILENAME
    })

    request
      .get(`/api/image/${filename}`)
      .end((err, res) =>{
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGE_BYFILENAME_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_IMAGE_BYFILENAME_SUCCESS,
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
  },
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
  }
}
