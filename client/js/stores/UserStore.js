import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _userid = window.userid

let UserStore = baseStore({
  getUserid() {
    return _userid
  }
})

UserStore.dispatchHandler = (payload) => {
  // switch(payload.actionType) {
  //   case ActionTypes.LOAD_IMAGES_SUCCESS:
  //     _images = payload.images
  //     UserStore.emitChange()
  //     break
  //   case ActionTypes.LOAD_IMAGES_BYTAG_SUCCESS:
  //     _images = payload.images
  //     current_tag = payload.tag
  //     UserStore.emitChange()
  //     break
  // }
}

export default UserStore
