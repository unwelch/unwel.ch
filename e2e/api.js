import fetch from 'node-fetch'

const HOST = 'http://localhost:3000'

export const createBet = async (
  token,
  quantity,
  statement,
  isPrivate = false
) => {
  const resp = await fetch(`${HOST}/graphql`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify({
      operationName: 'addBetMutation',
      variables: { statement, quantity, isPrivate },
      query: `
      mutation addBetMutation($quantity: String!, $statement: String!, $isPrivate: Boolean!) {
        addBet(quantity: $quantity, statement: $statement, isPrivate: $isPrivate) {
          id
        }
      }`
    })
  })

  const data = (await resp.json())['data']

  return data.addBet.id
}

export const acceptBet = async (token, betId) => {
  await fetch(`${HOST}/graphql`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify({
      operationName: 'acceptBetMutation',
      variables: { id: betId },
      query: `
      mutation acceptBetMutation($id: String!) {
        acceptBet(id: $id) {
          id
        }
      }`
    })
  })
}

// {"operationName":"acceptBetMutation","variables":{"id":"3fbed347-7ef7-4db2-9ac8-00626001627d"},"query":"mutation acceptBetMutation($id: String!) {\n  acceptBet(id: $id) {\n    userResponse\n    user2Response\n    __typename\n  }\n}\n"}

export const createUser = async name => {
  const resp = await fetch(`${HOST}/auth/anonymous`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name
    })
  })

  const body = await resp.json()

  return { token: body.token, userId: body.id }
}
