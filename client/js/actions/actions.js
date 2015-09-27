import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatchers/dispatcher'

export default {
  addItem(item) {
    AppDispatcher.dispatch({
      actionType: AppConstants.ADD_ITEM,
      item: item
    })
    // AppDispatcher.handleViewAction({
    //   actionType: AppConstants.ADD_ITEM,
    //   item: item
    // });
  },
  removeItem(index) {
    AppDispatcher.dispatch({
      actionType: AppConstants.REMOVE_ITEM,
      index: index
    })
    // AppDispatcher.handleViewAction({
    //   actionType: AppConstants.REMOVE_ITEM,
    //   index: index
    // });
  },
  increaseItem(index) {
    AppDispatcher.dispatch({
      actionType: AppConstants.INCREASE_ITEM,
      index: index
    })
    // AppDispatcher.handleViewAction({
    //   actionType: AppConstants.INCREASE_ITEM,
    //   index: index
    // });
  },
  decreaseItem(index) {
    AppDispatcher.dispatch({
      actionType: AppConstants.DECREASE_ITEM,
      index: index
    })
    // AppDispatcher.handleViewAction({
    //   actionType: AppConstants.DECREASE_ITEM,
    //   index: index
    // });
  }
}
