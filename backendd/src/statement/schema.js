import { GraphQLObjectType, GraphQLString } from 'graphql'
import { prop } from 'ramda'

import { UserType } from './../user/schema'
import UserDB from './../user/db'

export const StatementType = new GraphQLObjectType({
  name: 'Statement',
  description: '...',

  fields: () => ({
    statement: {
      type: GraphQLString,
      resolve: prop('statement')
    },
    user: {
      type: UserType,
      resolve: statement => {
        return UserDB.get(statement.userId)
      }
    },
    id: {
      type: GraphQLString,
      resolve: prop('id')
    }
  })
})
