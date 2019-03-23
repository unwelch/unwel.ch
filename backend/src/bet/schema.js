import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'
import { prop } from 'ramda'

import { StatementType } from './../statement/schema'
import { UserType } from './../user/schema'
import UserDB from './../user/db'
import StatementDB from './../statement/db'
import { newNotification, types } from './../notifications/service'
import db from './db'

export const BetType = new GraphQLObjectType({
  name: 'Bet',
  description: '...',

  fields: () => ({
    quantity: {
      type: GraphQLString,
      resolve: prop('quantity')
    },
    statement: {
      type: StatementType,
      resolve: bet => {
        return StatementDB.get(bet.statementId)
      }
    },
    user: {
      type: UserType,
      resolve: bet => {
        return UserDB.get(bet.userId)
      }
    },
    user2: {
      type: UserType,
      resolve: bet => {
        return UserDB.get(bet.user2Id)
      }
    },
    targetUser: {
      type: UserType,
      resolve: bet => {
        return UserDB.get(bet.targetUserId)
      }
    },
    userResponse: {
      type: GraphQLBoolean,
      resolve: prop('userResponse')
    },
    isPrivate: {
      type: GraphQLBoolean,
      resolve: prop('isPrivate')
    },
    user2Response: {
      type: GraphQLBoolean,
      resolve: prop('user2Response')
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

export const BetMutation = {
  acceptBet: {
    type: BetType,
    args: {
      id: { type: GraphQLString }
    },
    resolve: async (_, { id }, { user }) => {
      if (user) {
        const bet = await db.get(id)

        if (bet.userId === user.id) {
          throw new Error('Can not accept your own bet')
        }

        if (bet.targetUserId && bet.targetUserId !== user.id) {
          throw new Error(
            'You cannot accept this bet, it is targeted at another user'
          )
        }

        bet.user2Id = user.id

        await newNotification(bet.user2Id, bet.userId, bet.id, types.ACCEPTED, {
          userName: user.name
        })

        return db.update(bet)
      } else {
        throw new Error('Not logged in')
      }
    }
  },
  addBet: {
    type: BetType,
    args: {
      quantity: { type: GraphQLString },
      statement: { type: GraphQLString },
      targetUserId: { type: GraphQLString },
      isPrivate: { type: GraphQLBoolean }
    },
    resolve: async (
      root,
      { quantity, statement, isPrivate = false, targetUserId },
      { user }
    ) => {
      if (user) {
        const newStatement = await StatementDB.insert({
          statement,
          userId: user.id
        })

        let bet = {
          quantity,
          userId: user.id,
          statementId: newStatement.id,
          isPrivate
        }

        if (targetUserId) {
          bet.targetUserId = targetUserId
        }

        bet = await db.insert(bet)

        if (targetUserId) {
          newNotification(user.id, targetUserId, bet.id, types.CHALLENGE, {
            userName: user.name
          })
        }

        return bet
      } else {
        throw new Error('Not logged in')
      }
    }
  },
  editBet: {
    type: BetType,
    args: {
      id: { type: GraphQLString },
      quantity: { type: GraphQLString },
      statement: { type: GraphQLString }
    },
    resolve: async (root, { id, quantity, statement }, { user }) => {
      if (!user) {
        throw new Error('Not logged in')
      }

      const bet = await db.get(id)
      const isUserTheCreator = user.id === bet.userId

      if (!isUserTheCreator) {
        throw new Error(`Can't edit someonelse bet`)
      }

      await db.update({
        id,
        statement,
        quantity
      })
    }
  },
  chooseWinner: {
    type: BetType,
    args: {
      id: { type: GraphQLString },
      winner: { type: GraphQLBoolean }
    },
    resolve: async (root, { id, winner }, { user }) => {
      if (user) {
        const bet = await db.get(id)

        if (bet.userId === user.id) {
          // userResponse true means user was right
          bet.userResponse = winner
          await db.update(bet)
        } else if (bet.user2Id === user.id) {
          // user2Response true means user2 was right
          bet.user2Response = winner
          await db.update(bet)
        }

        if (bet.user2Response == null || bet.userResponse == null) {
          return
        }

        if (bet.userResponse === true && bet.user2Response === true) {
          // user 1 disputed
          // user 2 disputed
          await newNotification(bet.user2Id, bet.userId, bet.id, types.DISPUTED)
          await newNotification(bet.userId, bet.user2Id, bet.id, types.DISPUTED)
        } else if (bet.userResponse === true && bet.user2Response === false) {
          // user 1 won
          // user 2 lost
          await newNotification(bet.user2Id, bet.userId, bet.id, types.WON)
          await newNotification(bet.userId, bet.user2Id, bet.id, types.LOST)
        } else if (bet.userResponse === false && bet.user2Response === true) {
          // user 2 won
          // user 1 lost
          await newNotification(bet.user2Id, bet.userId, bet.id, types.LOST)
          await newNotification(bet.userId, bet.user2Id, bet.id, types.WON)
        } else if (bet.userResponse === false && bet.user2Response === false) {
          // user 1 lost
          // user 2 lost
          await newNotification(bet.user2Id, bet.userId, bet.id, types.DISPUTED)
          await newNotification(bet.userId, bet.user2Id, bet.id, types.DISPUTED)
        }

        // throw new Error('Cannot choose winner of a bet you are not part of')
      } else {
        throw new Error('Not logged in')
      }
    }
  },
  deleteBet: {
    type: BetType,
    args: {
      id: { type: GraphQLString }
    },
    resolve: async (root, { id }, { user }) => {
      if (user) {
        const bet = await db.get(id)

        if (bet.userId === user.id) {
          await db.delete(id)
        } else {
          throw new Error('You cannot delete a bet thats not your own')
        }
      } else {
        throw new Error('Not logged in')
      }
    }
  }
}

const betsQuery = {
  type: new GraphQLList(BetType),
  resolve: (root, _, { user }) => {
    if (user) {
      return db.getByUserOrUser2(user.id)
    } else {
      throw new Error('Not logged in')
    }
  }
}

const betQuery = {
  type: BetType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: (root, args) => {
    return db.get(args.id)
  }
}

export const BetQuery = {
  bets: betsQuery,
  bet: betQuery
}
