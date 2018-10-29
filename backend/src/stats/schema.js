import { GraphQLObjectType, GraphQLInt } from 'graphql'

import R from 'ramda'

export const StatsType = new GraphQLObjectType({
  name: 'Stats',
  description: '...',

  fields: () => ({
    betsAccepted: {
      type: GraphQLInt,
      resolve: R.prop('accepted')
    },
    betsCreated: {
      type: GraphQLInt,
      resolve: R.prop('created')
    },
    betsDisputed: {
      type: GraphQLInt,
      resolve: R.prop('disputed')
    },
    betsWon: {
      type: GraphQLInt,
      resolve: R.prop('won')
    },
    betsLost: {
      type: GraphQLInt,
      resolve: R.prop('lost')
    }
  })
})
