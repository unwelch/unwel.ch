import { Role } from 'testcafe'

import {
  getLocation,
  dataQaSelector,
  dataQaExists,
  getToken,
  setToken,
  clearLocalStorage
} from './utils'
import { HOST } from './config'

fixture`Anonymous login by accepting`.page`${HOST}`

test('I can accept a bet by loggin in', async t => {
  await t.click(dataQaSelector('make-bet-button'))

  await t.typeText(dataQaSelector('bet-input-statement'), 'something')
  await t.typeText(dataQaSelector('bet-input-quantity'), '1 coffee')

  await t.click(dataQaSelector('create-bet-button'))

  await t
    .expect(await getLocation())
    .eql(`/anonymous-login`, 'redirects to anonymous login')

  await t.typeText(dataQaSelector('anonymous-login-input'), 'Creator')
  await t.click(dataQaSelector('anonymous-login-confirm'))

  await t.wait(2000) // wait for token reload
  await t.expect(await getLocation()).eql(`/bets`, 'redirects to bet page')

  await t.click(dataQaSelector('bet-list-item'))
  const betUrl = await getLocation()
  const newBetId = betUrl.split('/').pop()

  // ACEPTER

  await clearLocalStorage()

  await t.navigateTo(`${HOST}/bet/${newBetId}`)

  await t.click(dataQaSelector('accept-bet-button'))

  await t
    .expect(await getLocation())
    .eql(`/anonymous-login`, 'redirects to anonymous login')

  await t.typeText(dataQaSelector('anonymous-login-input'), `Creators friend`)
  await t.click(dataQaSelector('anonymous-login-confirm'))

  await t.wait(2000) // wait for token reload
  await t.expect(await getLocation()).match(/^\/bet\//, 'redirects to bet page')

  await t.expect(dataQaExists('bet-page')).ok()
})
