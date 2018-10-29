import uuid from 'uuid/v4'
import * as types from './constants'

export const showAnnounce = message => {
  return { type: types.SHOW_ANNOUNCE, payload: { message, key: uuid() } }
}

export const popAnnounce = () => {
  return { type: types.POP_ANNOUNCE }
}
