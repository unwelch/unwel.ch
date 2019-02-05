import queryString from 'query-string'
import { API_HOST } from './../../config'

export const loadUser = location => {
  let { token, isLoggedIn } = checkToken(location.search)

  // FIX: This goes to the backend to check if the token is valid,
  // then clears the localStorage
  clearTokenIfInvalid(token)

  const userId = getUserIdFromToken(token)

  return { token, isLoggedIn, userId }
}

const getUserIdFromToken = token => {
  let userId

  try {
    userId = JSON.parse(atob(token.split('.')[1])).userId
  } catch (err) {
    userId = null
  }

  return userId
}

const checkToken = search => {
  let token = queryString.parse(search).token

  if (token) {
    // Save token if exists in query string
    window.localStorage.setItem('token', token)
    // reload to remove token from URL
    window.history.replaceState(null, null, window.location.pathname)
    return { token, isLoggedIn: true }
  }

  // Get token into state if exists in local storage
  return { token: window.localStorage.getItem('token'), isLoggedIn: false }
}

const getAuthErrorUrl = () =>
  window.location.protocol +
  '//' +
  window.location.hostname +
  ':' +
  window.location.port +
  '/login'

const clearTokenIfInvalid = async token => {
  if (!token) {
    return
  }

  const response = await window.fetch(API_HOST + '/check-token', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  if (response.status !== 200) {
    const error = await response.json()

    // TODO remove once all tokens are using new version
    if (error.error === 'old-version') {
      const newToken = error.newToken
      window.localStorage.setItem('token', newToken)
      window.location.reload()
    }

    window.location = getAuthErrorUrl()
    window.localStorage.clear()
  }
}
