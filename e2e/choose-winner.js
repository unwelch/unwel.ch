import { waitForReact } from 'testcafe-react-selectors'
import { dataQaExists, setToken } from './utils'
import { HOST } from './config'

import { chooseWon, chooseLost } from './helpers'

import * as api from './api'

fixture`Choosing winner`.page`${HOST}`.beforeEach(async () => {
  await waitForReact()
})

test('Creator wins', async t => {
  const creatorToken = await api.createUser('creator')
  const acceptorToken = await api.createUser('acceptor')
  const betId = await api.createBet(creatorToken, '1 coffee', 'something')
  await api.acceptBet(acceptorToken, betId)

  await setToken(acceptorToken)

  await t.navigateTo(`${HOST}/bet/${betId}`)
  await chooseLost(t)

  await setToken(creatorToken)

  await t.navigateTo(`${HOST}/bet/${betId}`)
  await chooseWon(t)

  await t.expect(dataQaExists('text-label-won')).ok()

  await setToken(acceptorToken)
  await t.navigateTo(`${HOST}/bet/${betId}`)

  await t.expect(dataQaExists('text-label-lost')).ok()
})

test('Creator loses', async t => {
  const creatorToken = await api.createUser('creator')
  const acceptorToken = await api.createUser('acceptor')
  const betId = await api.createBet(creatorToken, '1 coffee', 'something')
  await api.acceptBet(acceptorToken, betId)

  await setToken(acceptorToken)

  await t.navigateTo(`${HOST}/bet/${betId}`)
  await chooseWon(t)

  await setToken(creatorToken)

  await t.navigateTo(`${HOST}/bet/${betId}`)
  await chooseLost(t)

  await t.expect(dataQaExists('text-label-lost')).ok()

  await setToken(acceptorToken)
  await t.navigateTo(`${HOST}/bet/${betId}`)

  await t.expect(dataQaExists('text-label-won')).ok()
})

test('Both win', async t => {
  const creatorToken = await api.createUser('creator')
  const acceptorToken = await api.createUser('acceptor')
  const betId = await api.createBet(creatorToken, '1 coffee', 'something')
  await api.acceptBet(acceptorToken, betId)

  await setToken(acceptorToken)

  await t.navigateTo(`${HOST}/bet/${betId}`)
  await chooseWon(t)

  await setToken(creatorToken)

  await t.navigateTo(`${HOST}/bet/${betId}`)
  await chooseWon(t)

  await t.expect(dataQaExists('text-label-disputed')).ok()

  await setToken(acceptorToken)
  await t.navigateTo(`${HOST}/bet/${betId}`)

  await t.expect(dataQaExists('text-label-disputed')).ok()
})

test('Both lost', async t => {
  const creatorToken = await api.createUser('creator')
  const acceptorToken = await api.createUser('acceptor')
  const betId = await api.createBet(creatorToken, '1 coffee', 'something')
  await api.acceptBet(acceptorToken, betId)

  await setToken(acceptorToken)

  await t.navigateTo(`${HOST}/bet/${betId}`)
  await chooseLost(t)

  await setToken(creatorToken)

  await t.navigateTo(`${HOST}/bet/${betId}`)
  await chooseLost(t)

  await t.expect(dataQaExists('text-label-disputed')).ok()

  await setToken(acceptorToken)
  await t.navigateTo(`${HOST}/bet/${betId}`)

  await t.expect(dataQaExists('text-label-disputed')).ok()
})
