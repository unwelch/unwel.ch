import fetch from 'node-fetch'

const HOST = 'http://localhost:3000'

export const createBet = async (token, quantity, statement) => {
  try {
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
  } catch (error) {
    console.log(error)
    return null
  }
}

export const acceptBet = async (token, betId) => {
  try {
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
  } catch (error) {
    console.log(error)
    return null
  }
}

// {"operationName":"acceptBetMutation","variables":{"id":"3fbed347-7ef7-4db2-9ac8-00626001627d"},"query":"mutation acceptBetMutation($id: String!) {\n  acceptBet(id: $id) {\n    userResponse\n    user2Response\n    __typename\n  }\n}\n"}

export const createUser = async name => {
  try {
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
  } catch (error) {
    console.log(error)
    return null
  }
}
