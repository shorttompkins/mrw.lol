import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _image = {}, uploading = false

let ImageStore = baseStore({
  getImage() {
    return _image
  },
  
  isUploading() {
    return uploading
  }
})

ImageStore.dispatchHandler = (payload) => {
  switch(payload.actionType) {
    case ActionTypes.LOAD_IMAGE_BYID_SUCCESS:
      _image = payload.image
      ImageStore.emitChange()
      break
    case ActionTypes.LOAD_IMAGE_BYFILENAME_SUCCESS:
      _image = payload.image
      ImageStore.emitChange()
      break
    case ActionTypes.ADD_IMAGE:
      uploading = true
      ImageStore.emitChange()
      break
    case ActionTypes.ADD_IMAGE_SUCCESS:
    case ActionTypes.ADD_IMAGE_FAIL:
      uploading = false
      ImageStore.emitChange()
      break
  }
}

export default ImageStore
