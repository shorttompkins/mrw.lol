import AppDispatcher from '../dispatchers/dispatcher'
import AppConstants from '../constants/constants.js'
import assign from 'react/lib/Object.assign'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let _catalog = [],
    _cartItems = []

for(var i=1; i < 9; i++) {
  _catalog.push({
    'id': i,
    'title': 'Widget #' + i,
    'summary': 'This is an awesome widget!',
    'description': 'Here is the detailed description of the widget',
    'cost': i
  })
}

function _removeItem(index) {
  _cartItems[index].inCart = false
  _cartItems.splice(index, 1)
}

function _increaseItem(index) {
  _cartItems[index].qty += 1
}

function _decreaseItem(index) {
  _cartItems[index].qty -= 1
  if(_cartItems[index].qty <= 0) {
    _removeItem(index)
  }
}

function _addItem(item) {
  if (!item.inCart) {
    item.qty = 1
    item.inCart = true
    _cartItems.push(item)
  } else {
    _cartItems.forEach((cartItem, i) => {
      if (cartItem.id === item.id) {
        _increaseItem(i)
      }
    })
  }
}

function _cartTotals() {
  var qty = 0,
      total = 0

  _cartItems.forEach((cartItem) => {
    qty += cartItem.qty
    total += cartItem.qty*cartItem.cost
  })

  return {'qty': qty, 'total': total }
}

var AppStore = assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getCart() {
    return _cartItems
  },

  getCatalog() {
    return _catalog
  },

  getCartTotals() {
    return _cartTotals()
  }
})

AppStore.dispatcherIndex = AppDispatcher.register(function(payload) {
  //var action = payload.action;

  switch(payload.actionType) {
    case AppConstants.ADD_ITEM:
      _addItem(payload.item)
      break
    case AppConstants.REMOVE_ITEM:
      _removeItem(payload.index)
      break
    case AppConstants.INCREASE_ITEM:
      _increaseItem(payload.index)
      break
    case AppConstants.DECREASE_ITEM:
      _decreaseItem(payload.index)
      break
  }

  AppStore.emitChange()

  return true
})


export default AppStore
