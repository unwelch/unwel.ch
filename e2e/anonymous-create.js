import { HOST } from './config'
import { createBetAndAnonymousUser } from './helpers'

fixture`Anonymous login by creation`.page`${HOST}`

test('I can create a bet and login anonymously', async t => {
  await createBetAndAnonymousUser(t)
})
