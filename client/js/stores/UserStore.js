import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _user = {}

let UserStore = baseStore({
  getUser() {
    return _user
  }
})

UserStore.dispatchHandler = (payload) => {
  switch(payload.actionType) {
    case ActionTypes.LOAD_USER_SUCCESS:
      _user = payload.user
      UserStore.emitChange()
      break
  }
}

export default UserStore
