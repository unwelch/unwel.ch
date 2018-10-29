import * as types from './constants'

export const setToken = token => {
  return { type: types.SET_TOKEN, payload: token }
}
