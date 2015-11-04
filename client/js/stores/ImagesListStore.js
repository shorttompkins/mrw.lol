import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _images = [], current_tag = ''

let ImagesListStore = baseStore({
  getImages() {
    return _images
  },
  getCurrentTag() {
    return current_tag
  }
})

ImagesListStore.dispatchHandler = (payload) => {
  switch(payload.actionType) {
    case ActionTypes.LOAD_IMAGES_SUCCESS:
      _images = payload.images
      ImagesListStore.emitChange()
      break
    case ActionTypes.LOAD_IMAGES_BYTAG_SUCCESS:
      _images = payload.images
      current_tag = payload.tag
      ImagesListStore.emitChange()
      break
  }
}

export default ImagesListStore
