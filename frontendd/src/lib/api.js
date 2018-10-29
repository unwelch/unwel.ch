import { API_HOST } from '../config'

export async function post (resource, body, token) {
  const bodyString = JSON.stringify(body)
  const result = await _fetch(token, resource, 'POST', bodyString)
  return result.json()
}

export async function get (resource, token) {
  const result = await _fetch(token, resource)
  return result.json()
}

function _fetch (token, resource, method = 'GET', body) {
  return window.fetch(API_HOST + resource, {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body
  })
}
