import R from 'ramda'

import db from './db'
import { sendPushToUser } from '../push'

const NOTIFICATION_TYPES = {
  ACCEPTED: `{{userName}} accepted your bet`,
  WON: 'You won a bet',
  LOST: 'You lose a bet',
  DISPUTED: 'Oh... you got disputed!'
}

const newNotification = async (
  senderUserId,
  recieverUserId,
  betId,
  type,
  params = {}
) => {
  let message = NOTIFICATION_TYPES[type]
  const paramNames = Object.keys(params)

  for (let i = 0; i < paramNames.length; i++) {
    const paramName = paramNames[i]
    message = message.replace(`{{${paramName}}}`, params[paramName])
  }

  sendPushToUser(
    recieverUserId,
    message,
    'Unwel.ch notification',
    `https://unwel.ch/bet/${betId}`
  )

  return db.insert({
    senderUserId,
    recieverUserId,
    betId,
    message
  })
}

const types = R.mapObjIndexed((_, key) => key)(NOTIFICATION_TYPES)

export { newNotification, types }
