import createReducer from '../lib/create-reducer'
import * as types from './constants'

const initialState = {
  showSaveAccountPopup: false
}

const auth = {
  [types.SHOW_SAVE_ACCOUNT_POPUP]: state => {
    return { ...state, showSaveAccountPopup: true }
  }
}

export default createReducer(initialState, auth)
