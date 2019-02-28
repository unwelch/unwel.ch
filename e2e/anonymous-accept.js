import { waitForReact } from 'testcafe-react-selectors'
import { getLocation, dataQaExists } from './utils'
import { HOST } from './config'
import { fillAnonymousLogin, acceptBet } from './helpers'

import * as api from './api'
import { ClientFunction } from 'testcafe'

fixture`Anonymous login by accepting`.page`${HOST}`.beforeEach(async () => {
  await waitForReact()
})

test('I can accept a bet by loggin in', async t => {
  const creatorToken = await api.createUser('creator')
  const newBetId = await api.createBet(creatorToken, '1 coffee', 'something')

  console.log('newBetId', newBetId)
  await t.navigateTo(`${HOST}/bet/${newBetId}`)
  const getLocation = ClientFunction(() => document.location)
  console.log('location', getLocation())

  await acceptBet(t)

  await t
    .expect(await getLocation())
    .eql(`/anonymous-login`, 'redirects to anonymous login')

  await fillAnonymousLogin(t, `Creator's friend`)

  await t.wait(2000) // wait for token reload
  await t.expect(await getLocation()).match(/^\/bet\//, 'redirects to bet page')

  await t.expect(dataQaExists('bet-page')).ok()
})
