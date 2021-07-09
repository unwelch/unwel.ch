import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'
import { prop } from 'ramda'

import { UserType } from './../user/schema'
import UserDB from './../user/db'
import PoolBetDB from './../poolBet/db'
import { PoolBetType } from './../poolBet/schema'
import db from './db'

export const PoolType = new GraphQLObjectType({
  name: 'Pool',
  description: '...',

  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: prop('id')
    },
    quantity: {
      type: GraphQLString,
      resolve: prop('quantity')
    },
    statement: {
      type: GraphQLString,
      resolve: prop('statement')
    },
    user: {
      type: UserType,
      resolve: bet => {
        return UserDB.get(bet.userId)
      }
    },
    closed: {
      type: GraphQLBoolean,
      resolve: prop('closed')
    },
    isPrivate: {
      type: GraphQLBoolean,
      resolve: prop('isPrivate')
    },
    bets: {
      type: new GraphQLList(PoolBetType),
      resolve: pool => {
        return PoolBetDB.getBy('poolId', pool.id)
      }
    },
    createdAt: {
      type: GraphQLString,
      resolve: bet => bet.createdAt.toISOString()
    }
  })
})

export const PoolMutation = {
  createPool: {
    type: PoolType,
    args: {
      quantity: { type: GraphQLString },
      statement: { type: GraphQLString },
      isPrivate: { type: GraphQLBoolean }
    },
    resolve: async (
      root,
      { quantity, statement, isPrivate = false },
      { user }
    ) => {
      if (!user) {
        throw new Error('Not logged in')
      }

      let pool = {
        quantity,
        userId: user.id,
        statement,
        isPrivate
      }

      return db.insert(pool)
    }
  },
  createPoolBet: {
    type: PoolType,
    args: {
      poolId: { type: GraphQLString },
      guess: { type: GraphQLString }
    },
    resolve: async (root, { poolId, guess }, { user }) => {
      if (!user) {
        throw new Error('Not logged in')
      }

      await PoolBetDB.insert({
        guess,
        poolId,
        userId: user.id
      })

      return db.get(poolId)
    }
  }
}

const poolsQuery = {
  type: new GraphQLList(PoolType),
  resolve: (root, _, { user }) => {
    if (user) {
      return db.getRelatedToUser(user.id)
    } else {
      throw new Error('Not logged in')
    }
  }
}

const poolQuery = {
  type: PoolType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: async (root, args) => {
    return db.get(args.id)
  }
}

export const PoolQuery = {
  pools: poolsQuery,
  pool: poolQuery
}
