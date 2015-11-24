import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _image = {}, uploading = ''

const _resetStatus = () => {
  setTimeout(() => {
    uploading = ''
    ImageStore.emitChange()
  }, 2000)
}

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
      uploading = 'LOADING'
      ImageStore.emitChange()
      break
    case ActionTypes.ADD_IMAGE_SUCCESS:
      uploading = 'OK'
      ImageStore.emitChange()
      _resetStatus()
      break
    case ActionTypes.ADD_IMAGE_FAIL:
      uploading = 'FAIL'
      ImageStore.emitChange()
      _resetStatus()
      break
    case ActionTypes.RESET_IMAGE:
      _image = {}
      ImageStore.emitChange()
      break
  }
}

export default ImageStore
