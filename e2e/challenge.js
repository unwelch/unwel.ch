import { Selector } from 'testcafe'

import { dataQaExists, dataQaSelector, setToken, getLocation } from './utils'
import { HOST } from './config'

import { fillNewBet, acceptBet } from './helpers'

import * as api from './api'

const expectOnlyTargetCanAccept = async (t, targetToken) => {
  const { token: otherToken } = await api.createUser('Some random guy')

  await t.expect(await getLocation()).match(/^\/bet\//, 'redirects to bet page')

  await setToken(otherToken)

  await t.expect(dataQaExists('accept-bet-button')).notOk()

  await setToken(targetToken)

  await t.expect(dataQaExists('accept-bet-button')).ok()

  await acceptBet(t)

  await t.expect(await getLocation()).match(/^\/bet\//, 'redirects to bet page')
}

fixture`Challenge user`.page`${HOST}`

test('Challenge a user by going to profile', async t => {
  const acceptorName = 'bugs bunnY'
  const { token: creatorToken } = await api.createUser('creator')

  const { token: acceptorToken, userId: acceptorId } = await api.createUser(
    acceptorName
  )

  await setToken(creatorToken)

  await t.navigateTo(`${HOST}/profiles/${acceptorId}`)

  await t.click(dataQaSelector('challenge-button'))

  await t.expect(dataQaSelector('target-name').withExactText(acceptorName)).ok()

  await fillNewBet(t, 'you suck', 'a cold b33r')

  await t.expect(await getLocation()).match(/^\/bet\//, 'redirects to bet page')

  await expectOnlyTargetCanAccept(t, acceptorToken)
})

test('Challenge a user by selecting it in the modal', async t => {
  const acceptorName = 'Maria 182'
  const { token: creatorToken } = await api.createUser('creator')

  const { token: acceptorToken } = await api.createUser(acceptorName)

  // Create a first bet so they are 'friends'
  const betId = await api.createBet(creatorToken, '1 coffee', 'something')
  await api.acceptBet(acceptorToken, betId)

  await setToken(creatorToken)

  await t.navigateTo(`${HOST}/bets/new`)

  await t.expect(dataQaExists('target-anonymous')).ok()
  await t.expect(dataQaExists('target-name')).notOk()

  await t.click(dataQaSelector('target-button'))

  await t.click(Selector('div').withExactText(acceptorName))

  await t.expect(dataQaExists('target-anonymous')).notOk()
  await t.expect(dataQaSelector('target-name').withExactText(acceptorName)).ok()

  await fillNewBet(t, 'you suck', 'a cold b33r')

  await t.expect(await getLocation()).match(/^\/bet\//, 'redirects to bet page')

  await expectOnlyTargetCanAccept(t, acceptorToken)
})
