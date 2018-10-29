import createReducer from './../../lib/create-reducer'
import * as types from './constants'

const initialState = {
  auth: {
    token: null
  }
}

const auth = {
  [types.SET_TOKEN]: (state, action) => {
    return { ...state, auth: { token: action.payload } }
  }
}

export default createReducer(initialState, auth)
