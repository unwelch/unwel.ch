import { randomString, dataQaSelector, setToken } from './utils'
import { HOST } from './config'

import * as api from './api'

fixture`Public feed`.page`${HOST}`

test('I can see public third party bets on my feed', async t => {
  const betStatement = `statement ${randomString()}`
  const betQuantity = `quantity ${randomString()}`

  const { token: creatorToken } = await api.createUser('creator')
  const { token: acceptorToken } = await api.createUser('acceptor')
  const { token: thirdPartyToken } = await api.createUser('thirdparty')
  const betId = await api.createBet(
    creatorToken,
    betQuantity,
    betStatement,
    false
  )
  await api.acceptBet(acceptorToken, betId)

  await setToken(thirdPartyToken)

  await t.navigateTo(`${HOST}/feed`)

  await t
    .expect(dataQaSelector('bet-list-item-text').withText(betStatement).exists)
    .ok()
  await t
    .expect(dataQaSelector('bet-list-item-text').withText(betQuantity).exists)
    .ok()
})

test('I can not see private third party bets on my feed', async t => {
  const betStatement = `statement ${randomString()}`
  const betQuantity = `quantity ${randomString()}`

  const { token: creatorToken } = await api.createUser('creator')
  const { token: acceptorToken } = await api.createUser('acceptor')
  const { token: thirdPartyToken } = await api.createUser('thirdparty')
  const betId = await api.createBet(
    creatorToken,
    betQuantity,
    betStatement,
    true
  )
  await api.acceptBet(acceptorToken, betId)

  await setToken(thirdPartyToken)

  await t.navigateTo(`${HOST}/feed`)

  await t
    .expect(dataQaSelector('bet-list-item-text').withText(betStatement).exists)
    .notOk()
  await t
    .expect(dataQaSelector('bet-list-item-text').withText(betQuantity).exists)
    .notOk()
})
