import uuid from 'uuid/v4'
import { squel, queryOne, query, defaultSquelConstructorParams } from './../db'
import { keysToUnderscore } from './../db/helpers'

export default {
  insert: async notification => {
    let newNotification = {
      ...notification,
      id: notification.id ? notification.id : uuid(),
      createdAt: new Date()
    }

    return queryOne(
      squel
        .insert(defaultSquelConstructorParams)
        .into('notifications')
        .setFields(keysToUnderscore(newNotification))
        .returning('*')
        .toString()
    )
  },

  update: async notification => {
    let newNotification = {
      ...notification,
      id: notification.id ? notification.id : uuid()
    }

    return queryOne(
      squel
        .update(defaultSquelConstructorParams)
        .table('notifications')
        .setFields(keysToUnderscore(newNotification))
        .where(`'${notification.id}' = notifications.id`)
        .returning('*')
        .toString()
    )
  },

  get: async id => {
    return queryOne(
      squel
        .select(defaultSquelConstructorParams)
        .from('notifications')
        .where('id = ?', id)
        .toString()
    )
  },

  getAll: async () => {
    return query(
      squel
        .select(defaultSquelConstructorParams)
        .from('notifications')
        .toString()
    )
  },

  getBy: {
    recieverUserId: userId => {
      return query(
        squel
          .select(defaultSquelConstructorParams)
          .from('notifications')
          .where('reciever_user_id = ?', userId)
          .toString()
      )
    }
  }
}
