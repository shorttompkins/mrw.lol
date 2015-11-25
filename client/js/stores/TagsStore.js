import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _tags = []

let TagsStore = baseStore({
  getTags() {
    return _tags
  }
})

TagsStore.dispatchHandler = (payload) => {
  switch(payload.actionType) {
    case ActionTypes.LOAD_TAGS_BYUSERID_SUCCESS:
    case ActionTypes.LOAD_TAGS_SUCCESS:
      _tags = payload.tags
      TagsStore.emitChange()
      break
  }
}

export default TagsStore
