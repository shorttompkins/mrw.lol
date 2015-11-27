import baseStore from '../utils/baseStore'
import ActionTypes from '../constants/ActionTypes.js'

let _tags = [], _image_tags = []

let TagsStore = baseStore({
  getTags() {
    return _tags
  },
  getUserTags() {
    return _image_tags
  }
})

TagsStore.dispatchHandler = (payload) => {
  switch(payload.actionType) {
    case ActionTypes.LOAD_TAGS_BYUSERID_SUCCESS:
    case ActionTypes.LOAD_TAGS_SUCCESS:
      _tags = payload.tags
      TagsStore.emitChange()
      break
    case ActionTypes.LOAD_IMAGE_BYID:
      _image_tags = []
      TagsStore.emitChange()
      break
    case ActionTypes.LOAD_IMAGE_TAGS_BYUSER_SUCCESS:
      _image_tags = payload.tags
      TagsStore.emitChange()
      break
  }
}

export default TagsStore
