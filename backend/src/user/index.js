import jwt from 'jsonwebtoken'

import SECRET from './secret'
import UserDB from './db'

const tokenPrefix = 'Bearer '
const nonValidAuth = auth =>
  !auth || auth.slice(0, tokenPrefix.length) !== tokenPrefix

const getToken = request => {
  let auth = request.headers['authorization']
  if (nonValidAuth(auth)) return
  const token = auth.slice(tokenPrefix.length)
  let decodedToken
  try {
    decodedToken = jwt.verify(token, SECRET)
  } catch (e) {
    return
  }
  return decodedToken
}

const containsUserId = t => t != null && t.userId != null

export const getUser = async request => {
  const token = getToken(request)
  if (containsUserId(token)) {
    return UserDB.get(token.userId)
  }
}

export const isAuthenticated = request => {
  const token = getToken(request)
  return containsUserId(token)
}
