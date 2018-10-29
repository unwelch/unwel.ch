import UserDB from './user/db'
import { getUser } from './user'

const webpush = require('web-push')

// This keys are temporal, they should be secret
const VAPID_PUBLIC =
  'BLGf4odvx8PEcK5pdvaHw0qBPobyhynHYCHVk5jpcZnQBlug6IiSxuNrJuQtzjmBpwzXnLkZss6t_4osuBJT5BQ'
const VAPID_PRIVATE = 'HKKVMmeg7ysh16BpoBRKdLNRFKEkbFXpzbJnwgSesp8'

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  VAPID_PUBLIC,
  VAPID_PRIVATE
)

export const sendPush = (subscription, title, body, link) => {
  if (!subscription) return
  webpush.sendNotification(subscription, JSON.stringify({ title, body, link }))
}

export const sendPushToUser = async (userId, title, body, link) => {
  const user = await UserDB.get(userId)
  if (user.pushEnabled) {
    sendPush(JSON.parse(user.pushSubscription), title, body, link)
  }
}

export const setupPush = app => {
  app.post('/push-subscribe', async function (req, res) {
    const pushSubscription = req.body

    const user = await getUser(req)

    if (!user) {
      res.status(400)
      res.send('Invalid token')
      return
    }

    await UserDB.update({
      id: user.id,
      pushSubscription: JSON.stringify(pushSubscription)
    })

    res.send()
  })
}
