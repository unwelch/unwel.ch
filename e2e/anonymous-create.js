import { getLocation, dataQaSelector, dataQaExists } from './utils'
import { HOST } from './config'

fixture`Anonymous login by creation`.page`${HOST}`

test('I can create a bet and login anonymously', async t => {
  await t.click(dataQaSelector('make-bet-button'))

  await t
    .expect(await getLocation())
    .eql(`/bets/new`, 'redirects to new bet page')

  await t.typeText(dataQaSelector('bet-input-statement'), 'something for sure!')
  await t.typeText(dataQaSelector('bet-input-quantity'), `1 good ol' coffee`)

  await t.click(dataQaSelector('create-bet-button'))

  await t
    .expect(await getLocation())
    .eql(`/anonymous-login`, 'redirects to anonymous login')

  await t.typeText(
    dataQaSelector('anonymous-login-input'),
    `Gerard's a beast?'`
  )
  await t.click(dataQaSelector('anonymous-login-confirm'))

  await t.wait(2000) // wait for token reload
  await t.expect(await getLocation()).eql(`/bets`, 'redirects to bet page')

  await t.expect(dataQaExists('bet-list-item')).ok()
})
