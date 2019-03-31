import { GraphQLObjectType, GraphQLString } from 'graphql'

import { prop } from 'ramda'

import { UserType } from './../user/schema'
import UserDB from './../user/db'

export const PoolBetType = new GraphQLObjectType({
  name: 'PoolBet',
  description: '...',

  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: prop('id')
    },
    guess: {
      type: GraphQLString,
      resolve: prop('guess')
    },
    user: {
      type: UserType,
      resolve: bet => {
        return UserDB.get(bet.userId)
      }
    }
  })
})
