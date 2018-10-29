import { post } from './../lib/api'

export async function createBet (token, bet) {
  return post(`/bet`, bet, token)
}

export async function createStatement (token, statement) {
  return post(`/statement`, statement, token)
}
