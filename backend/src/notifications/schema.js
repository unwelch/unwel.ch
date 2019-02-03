import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'
import { forEach, prop } from 'ramda'

import db from './db'
import UserDB from './../user/db'
import BetDB from './../bet/db'
import { UserType } from './../user/schema'
import { BetType } from './../bet/schema'

export const NotificationType = new GraphQLObjectType({
  name: 'Notification',
  description: '...',

  fields: () => ({
    message: {
      type: GraphQLString,
      resolve: prop('message')
    },
    visited: {
      type: GraphQLBoolean,
      resolve: prop('visited')
    },
    viewed: {
      type: GraphQLBoolean,
      resolve: prop('viewed')
    },
    sender: {
      type: UserType,
      resolve: notification => {
        return UserDB.get(notification.senderUserId)
      }
    },
    reciever: {
      type: UserType,
      resolve: notification => {
        return UserDB.get(notification.reciverUserId)
      }
    },
    bet: {
      type: BetType,
      resolve: notification => {
        return BetDB.get(notification.betId)
      }
    },
    id: {
      type: GraphQLString,
      resolve: prop('id')
    },
    createdAt: {
      type: GraphQLString,
      resolve: bet => bet.createdAt.toISOString()
    }
  })
})

export const NotificationQuery = {
  notifications: {
    type: new GraphQLList(NotificationType),
    resolve: (root, args, { user }) => {
      if (user) {
        return db.getBy('recieverUserId', user.id)
      } else {
        throw new Error('Not logged in')
      }
    }
  }
}

export const NotificationMutation = {
  markNotifcationsViewed: {
    type: new GraphQLList(NotificationType),
    args: {
      ids: { type: new GraphQLList(GraphQLString) }
    },
    resolve: async (root, { ids }, { user }) => {
      if (user) {
        forEach(id => {
          db.update({ id, viewed: true })
        }, ids)
      } else {
        throw new Error('Not logged in')
      }
    }
  },

  markNotifcationsVisited: {
    type: new GraphQLList(NotificationType),
    args: {
      id: { type: GraphQLString }
    },
    resolve: async (root, { id }, { user }) => {
      if (user) {
        db.update({ id, visited: true })
      } else {
        throw new Error('Not logged in')
      }
    }
  }
}
