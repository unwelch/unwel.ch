import { dataQaExists, dataQaSelector, setToken, getLocation } from './utils'
import { HOST } from './config'

import { fillNewBet, acceptBet } from './helpers'

import * as api from './api'

fixture`Challenge user`.page`${HOST}`

test('Challenge a user', async t => {
  const { token: creatorToken } = await api.createUser('creator')

  const { token: acceptorToken, userId: acceptorId } = await api.createUser(
    'Maria 182'
  )

  const { token: otherToken } = await api.createUser('Some random guy')

  await setToken(creatorToken)

  await t.navigateTo(`${HOST}/profiles/${acceptorId}`)

  await t.click(dataQaSelector('challenge-button'))

  await t.expect(dataQaExists('target-name')).ok()

  await fillNewBet(t, 'you suck', 'a cold b33r')

  await t.expect(await getLocation()).match(/^\/bet\//, 'redirects to bet page')

  await setToken(otherToken)

  await t.expect(dataQaExists('accept-bet-button')).notOk()

  await setToken(acceptorToken)

  await t.expect(dataQaExists('accept-bet-button')).ok()

  await acceptBet(t)

  await t.expect(await getLocation()).match(/^\/bet\//, 'redirects to bet page')
})
