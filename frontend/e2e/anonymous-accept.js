import { Role } from 'testcafe'

import { getLocation, dataQaSelector, dataQaExists } from './utils'
import { HOST } from './config'

const creator = Role(`${HOST}/bets/new`, async t => {
  await t.typeText(dataQaSelector('bet-input-statement'), 'something')
  await t.typeText(dataQaSelector('bet-input-quantity'), '1 coffee')

  await t.click(dataQaSelector('create-bet-button'))

  await t
    .expect(await getLocation())
    .eql(`/anonymous-login`, 'redirects to anonymous login')

  await t.typeText(dataQaSelector('anonymous-login-input'), 'Creator')
  await t.click(dataQaSelector('anonymous-login-confirm'))

  await t.expect(await getLocation()).eql(`/bets`, 'redirects to bet page')
})

fixture`Anonymous login by accepting`.page`${HOST}`

test('I can accept a bet by loggin in', async t => {
  let newBetId
  {
    await t.useRole(creator)

    await t.click(dataQaSelector('bet-list-item'))

    const betUrl = await getLocation()
    newBetId = betUrl.split('/').pop()
  }

  await t.useRole(Role.anonymous())

  await t.navigateTo(`${HOST}/bet/${newBetId}`)

  await t.click(dataQaSelector('accept-bet-button'))

  await t
    .expect(await getLocation())
    .eql(`/anonymous-login`, 'redirects to anonymous login')

  await t.typeText(dataQaSelector('anonymous-login-input'), `Creator's friend`)
  await t.click(dataQaSelector('anonymous-login-confirm'))

  await t.expect(await getLocation()).eql(`/bets`, 'redirects to bet page')

  await t.expect(dataQaExists('bet-list-item')).ok()
})
