import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _image = {}

let ImageStore = baseStore({
  getImage() {
    return _image
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
  }
}

export default ImageStore
