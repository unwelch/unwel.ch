import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'
import { complement, prop, chain, uniq } from 'ramda'

import db from './db'
import BetDB from '../bet/db'
import { StatsType } from './../stats/schema'

import {
  calculateGlobalStats,
  calculateAgainstStats
} from './../stats/calculator'

const getFriends = async userId => {
  const userBets = await BetDB.getByUserOrUser2(userId)
  const allIds = uniq(chain(bet => [bet.userId, bet.user2Id], userBets))
  const opponentIds = allIds
    .filter(id => id !== userId)
    .filter(id => id != null)
  return opponentIds
}

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',

  fields: () => ({
    isAnonymous: {
      type: GraphQLBoolean,
      resolve: complement(prop('googleId'))
    },
    avatar: {
      type: GraphQLString,
      resolve: prop('avatar')
    },
    name: {
      type: GraphQLString,
      resolve: prop('name')
    },
    id: {
      type: GraphQLString,
      resolve: prop('id')
    },
    pushEnabled: {
      type: GraphQLBoolean,
      resolve: prop('pushEnabled')
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: async root => {
        const friendIds = await getFriends(root.id)
        const friends = await Promise.all(friendIds.map(id => db.get(id)))
        return friends
      }
    },
    stats: {
      type: StatsType,
      resolve: async root => {
        return calculateGlobalStats(
          await BetDB.getByUserOrUser2(root.id),
          root.id
        )
      }
    },
    statsAgainstYou: {
      type: StatsType,
      resolve: async (root, args, { user }) => {
        return calculateAgainstStats(
          await BetDB.getByUserOrUser2(root.id),
          root.id,
          user.id
        )
      }
    }
  })
})

export const UserQuery = {
  user: {
    type: UserType,
    args: {
      id: { type: GraphQLString }
    },
    resolve: (root, args) => {
      if (args.id) {
        return db.get(args.id)
      }
    }
  },

  currentUser: {
    type: UserType,
    args: {
      id: { type: GraphQLString }
    },
    resolve: async (root, args, { user }) => {
      return user
    }
  }
}

export const UserMutation = {
  changeName: {
    type: UserType,
    args: {
      name: { type: GraphQLString }
    },
    resolve: async (root, { name }, { user }) => {
      if (user) {
        let dbUser = await db.get(user.id)
        dbUser.name = name

        return db.update(dbUser)
      } else {
        throw new Error('Not logged in')
      }
    }
  },
  enablePush: {
    type: UserType,
    args: {
      name: { type: GraphQLString }
    },
    resolve: async (root, args, { user }) => {
      if (user) {
        let dbUser = await db.get(user.id)
        dbUser.pushEnabled = true

        return db.update(dbUser)
      } else {
        throw new Error('Not logged in')
      }
    }
  },
  disablePush: {
    type: UserType,
    args: {
      name: { type: GraphQLString }
    },
    resolve: async (root, args, { user }) => {
      if (user) {
        let dbUser = await db.get(user.id)
        dbUser.pushEnabled = false

        return db.update(dbUser)
      } else {
        throw new Error('Not logged in')
      }
    }
  }
}
