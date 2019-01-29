import createReducer from './../../lib/create-reducer'
import * as types from './constants'

const initialState = {
  token: null
}

const auth = {
  [types.SET_TOKEN]: (state, action) => {
    return { ...state, token: action.payload }
  }
}

export default createReducer(initialState, auth)
