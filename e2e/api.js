import fetch from 'node-fetch'

const HOST = 'http://localhost:3000'

export const createBet = async (token, quantity, statement) => {
  const resp = await fetch(`${HOST}/graphql`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify({
      operationName: 'addBetMutation',
      variables: { statement, quantity },
      query: `
      mutation addBetMutation($quantity: String!, $statement: String!) {
        addBet(quantity: $quantity, statement: $statement) {
          id
        }
      }`
    })
  })

  const data = (await resp.json())['data']

  return data.addBet.id
}

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

  return body.token
}
