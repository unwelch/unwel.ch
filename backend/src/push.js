import webpush from 'web-push'

import UserDB from './user/db'
import { getUser } from './user'

const VAPID_PUBLIC =
  'BFiZMcD9coHZp00RK7x6DLgfkOUc_koVc228begnhoqylXO8uHqGgEKpdxCbm6SdaS1fPmu2KjrOEjKQtvbESGc'
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY

if (VAPID_PRIVATE) {
  webpush.setVapidDetails(
    'mailto:unwelchers@gmail.com',
    VAPID_PUBLIC,
    VAPID_PRIVATE
  )
} else {
  console.warn('Using temporal vapid keys')
  const devVapidKeys = webpush.generateVAPIDKeys()
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    devVapidKeys.publicKey,
    devVapidKeys.privateKey
  )
}

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

export const pushSubscribeMiddleware = async (req, res) => {
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
}
