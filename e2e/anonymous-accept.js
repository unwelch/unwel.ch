import {
  getLocation,
  dataQaSelector,
  dataQaExists,
  clearLocalStorage
} from './utils'
import { HOST } from './config'

import { fillNewBet, fillAnonymousLogin, acceptBet } from './helpers'

fixture`Anonymous login by accepting`.page`${HOST}`

test('I can accept a bet by loggin in', async t => {
  await t.click(dataQaSelector('make-bet-button'))

  await fillNewBet(t, 'something', '1 coffee')

  await t
    .expect(await getLocation())
    .eql(`/anonymous-login`, 'redirects to anonymous login')

  await fillAnonymousLogin(t, `Creator`)

  await t.wait(2000) // wait for token reload
  await t.expect(await getLocation()).eql(`/bets`, 'redirects to bet page')

  await t.click(dataQaSelector('bet-list-item'))
  const betUrl = await getLocation()
  const newBetId = betUrl.split('/').pop()

  // ACEPTER

  await clearLocalStorage()

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
