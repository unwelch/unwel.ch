import R from 'ramda'

import { betStatuses, getBetStatus } from '../bet-status'

const calculateStats = (bets, userId) => ({
  accepted: bets.filter(R.propEq('user2Id', userId)).length,
  created: bets.filter(R.propEq('userId', userId)).length,
  disputed: bets.filter(bet => getBetStatus(bet, userId) === betStatuses.DISPUTED)
    .length,
  won: bets.filter(bet => getBetStatus(bet, userId) === betStatuses.WON).length,
  lost: bets.filter(bet => getBetStatus(bet, userId) === betStatuses.LOST)
    .length
})

export const calculateGlobalStats = (bets, userId) =>
  calculateStats(
    bets.filter(bet => bet.userId === userId || bet.user2Id === userId),
    userId
  )

export const calculateAgainstStats = (bets, userId, currentUserId) =>
  calculateStats(
    bets.filter(
      bet =>
        (bet.userId === userId && bet.user2Id === currentUserId) ||
        (bet.userId === currentUserId && bet.user2Id === userId)
    ),
    userId
  )
