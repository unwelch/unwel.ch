import createReducer from './../lib/create-reducer'
import * as types from './constants'

const initialState = []

const announcers = {
  [types.SHOW_ANNOUNCE]: (state, action) => {
    return [action.payload, ...state]
  },

  [types.POP_ANNOUNCE]: state => {
    return state.slice(0, -1)
  }
}

export default createReducer(initialState, announcers)
