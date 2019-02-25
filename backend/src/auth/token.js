import jwt from 'jsonwebtoken'

const backupTokenSecret = 'supersecret'

if (process.env.NODE_ENV === 'production' && !process.env.TOKEN_SECRET) {
  throw new Error('No token secret configured')
}

export const getTokenSecret = () =>
  process.env.TOKEN_SECRET || backupTokenSecret

const tokenPrefix = 'Bearer '
const nonValidAuth = auth =>
  !auth || auth.slice(0, tokenPrefix.length) !== tokenPrefix

export const getTokenFromRequest = request => {
  let auth = request.headers['authorization']
  if (nonValidAuth(auth)) return
  return auth.slice(tokenPrefix.length)
}

export const getTokenVersion = token => {
  const secret = getTokenSecret()
  try {
    jwt.verify(token, secret)
    return '1'
  } catch (e) {
    try {
      jwt.verify(token, backupTokenSecret)
      return '0'
    } catch (e) {
      return null
    }
  }
}

// TODO remove this when all tokens are using the correct secret
export const upgradeToken = token => {
  const secret = getTokenSecret()
  try {
    const decoded = jwt.verify(token, backupTokenSecret)
    return jwt.sign(decoded, secret)
  } catch (e) {
    return null
  }
}

export const decode = token => {
  const secret = getTokenSecret()
  return jwt.verify(token, secret)
}
