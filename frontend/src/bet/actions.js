import { SET_TOKEN } from './constants'

export const setToken = token => {
  return { type: SET_TOKEN, payload: token }
}
