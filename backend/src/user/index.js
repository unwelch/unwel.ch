import { getTokenFromRequest, decode } from '../auth/token'

import UserDB from './db'

export const getUser = async request => {
  const token = getTokenFromRequest(request)
  try {
    const decodedToken = decode(token)
    return UserDB.get(decodedToken.userId)
  } catch (e) {}
}

export const isAuthenticated = request => {
  const token = getTokenFromRequest(request)
  try {
    decode(token)
    return true
  } catch (e) {
    return false
  }
}
