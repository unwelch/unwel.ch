import {
  getLocation,
  dataQaSelector,
  dataQaExists,
  clearLocalStorage
} from './utils'
import { HOST } from './config'
import { createBetAndAnonymousUser } from './helpers'

fixture`Anonymous login by accepting`.page`${HOST}`

test('I can accept a bet by loggin in', async t => {
  const newBetId = await createBetAndAnonymousUser(t)

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
  await t
    .expect(await getLocation())
    .eql(`/bet/${newBetId}`, 'redirects to bet page')

  await t.expect(dataQaExists('bet-page')).ok()
})
