import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _images = [], current_tag = '', loading = false

let ImagesListStore = baseStore({
  getImages() {
    return _images
  },
  getCurrentTag() {
    return current_tag
  },
  getLoadingStatus() {
    return loading
  }
})

ImagesListStore.dispatchHandler = (payload) => {
  switch(payload.actionType) {
    case ActionTypes.LOAD_IMAGES:
    case ActionTypes.LOAD_IMAGES_BYTAG:
    case ActionTypes.LOAD_IMAGES_BYUSERID:
    case ActionTypes.LOAD_IMAGES_BYUSERID_BYTAG:
      loading = true
      ImagesListStore.emitChange()
      break
    case ActionTypes.LOAD_IMAGES_BYUSERID_SUCCESS:
    case ActionTypes.LOAD_IMAGES_SUCCESS:
      _images = payload.images
      loading = false
      ImagesListStore.emitChange()
      break
    case ActionTypes.LOAD_IMAGES_BYUSERID_BYTAG_SUCCESS:
    case ActionTypes.LOAD_IMAGES_BYTAG_SUCCESS:
      _images = payload.images
      loading = false
      current_tag = payload.tag
      ImagesListStore.emitChange()
      break
  }
}

export default ImagesListStore
