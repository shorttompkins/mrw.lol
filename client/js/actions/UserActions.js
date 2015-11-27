import ActionTypes from '../constants/ActionTypes'
import AppDispatcher from '../dispatchers/Dispatcher'
import request from 'superagent'

export default {
  getUserById(userid) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_USER
    })

    request
      .get(`/api/users/${userid}`)
      .end((err, res) =>{
        if (err) {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_USER_FAIL,
            error: err
          })
        } else {
          AppDispatcher.dispatch({
            actionType: ActionTypes.LOAD_USER_SUCCESS,
            user: res.body
          })
        }
      })
  }
}
