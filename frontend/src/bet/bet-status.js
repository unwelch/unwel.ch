export const betStatuses = {
  WAITING_FOR_OPONENT: 'WAITING_FOR_OPONENT',
  AVAILABLE_BET: 'AVAILABLE_BET',
  THIRD_PARTY_BET: 'THIRD_PARTY_BET',
  WAITING_FOR_USER_RESPONSE: 'WAITING_FOR_USER_RESPONSE',
  WAITING_FOR_OPONENT_RESPONSE: 'WAITING_FOR_OPONENT_RESPONSE',
  WON: 'WON',
  LOST: 'LOST',
  DISPUTED: 'DISPUTED'
}

export const getBetStatus = (bet, currentUser) => {
  const isCreator = currentUser && bet.user.id === currentUser.id
  const isAcceptor = currentUser && bet.user2 && bet.user2.id === currentUser.id
  const userResponded = bet.userResponse != null
  const user2Responded = bet.user2Response != null

  if (bet.user2 == null) {
    // Bet not accepted
    if (isCreator) {
      return betStatuses.WAITING_FOR_OPONENT
    } else {
      return betStatuses.AVAILABLE_BET
    }
  } else if (!isCreator && !isAcceptor) {
    return betStatuses.THIRD_PARTY_BET
  } else if (!userResponded || !user2Responded) {
    // Bet accepted
    if (isCreator) {
      if (!userResponded) return betStatuses.WAITING_FOR_USER_RESPONSE
    } else {
      if (!user2Responded) return betStatuses.WAITING_FOR_USER_RESPONSE
    }
    return betStatuses.WAITING_FOR_OPONENT_RESPONSE
  } else {
    // BET FINISHED
    if (bet.userResponse === bet.user2Response) {
      return betStatuses.DISPUTED
    }

    if ((bet.userResponse && isCreator) || (bet.user2Response && !isCreator)) {
      return betStatuses.WON
    }

    return betStatuses.LOST
  }
}
