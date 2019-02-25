import { getLocation, dataQaExists } from './utils'
import { HOST } from './config'

import { fillAnonymousLogin, acceptBet } from './helpers'

import * as api from './api'

fixture`Anonymous login by accepting`.page`${HOST}`

test('I can accept a bet by loggin in', async t => {
  const creatorToken = await api.createUser('creator')
  const newBetId = await api.createBet(creatorToken, '1 coffee', 'something')

  await t.navigateTo(`${HOST}/bet/${newBetId}`)

  await acceptBet(t)

  await t
    .expect(await getLocation())
    .eql(`/anonymous-login`, 'redirects to anonymous login')

  await fillAnonymousLogin(t, `Creator's friend`)

  await t.wait(2000) // wait for token reload
  await t.expect(await getLocation()).match(/^\/bet\//, 'redirects to bet page')

  await t.expect(dataQaExists('bet-page')).ok()
})
