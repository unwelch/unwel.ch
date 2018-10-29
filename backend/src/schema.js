import { GraphQLSchema, GraphQLObjectType } from 'graphql'

import { NotificationQuery, NotificationMutation } from './notifications/schema'
import { UserQuery, UserMutation } from './user/schema'
import { BetQuery, BetMutation } from './bet/schema'

export default new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: '...',

    fields: () => ({
      ...BetMutation,
      ...UserMutation,
      ...NotificationMutation
    })
  }),
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      ...UserQuery,
      ...BetQuery,
      ...NotificationQuery
    })
  })
})
