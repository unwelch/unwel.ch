import { API_HOST } from './../config'

export async function anonymousLogin(name) {
  if (!name) {
    name = window.prompt('name')
  }

  const resp = await window.fetch(API_HOST + '/auth/anonymous', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })

  const { token } = await resp.json()

  window.location =
    window.location.protocol +
    '//' +
    window.location.hostname +
    ':' +
    window.location.port +
    '?token=' +
    token
}

export async function googleLogin(token) {
  // TODO: Use router redirect and ignore it in history
  window.location = API_HOST + '/auth/google' + (token ? `?token=${token}` : '')
}
