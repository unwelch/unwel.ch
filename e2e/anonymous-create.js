import { getLocation, dataQaSelector, dataQaExists } from './utils'
import { HOST } from './config'
import { fillNewBet, fillAnonymousLogin } from './helpers'

fixture`Anonymous login by creation`.page`${HOST}`

test('I can create a bet and login anonymously', async t => {
  await t.click(dataQaSelector('make-bet-button'))

  await t
    .expect(await getLocation())
    .eql(`/bets/new`, 'redirects to new bet page')

  await fillNewBet(t, 'something for sure!', 'something')

  await t
    .expect(await getLocation())
    .eql(`/anonymous-login`, 'redirects to anonymous login')

  await fillAnonymousLogin(t, `Gerard i'can`)

  await t.wait(2000) // wait for token reload
  await t.expect(await getLocation()).eql(`/bets`, 'redirects to bet page')

  await t.expect(dataQaExists('bet-list-item')).ok()
})
