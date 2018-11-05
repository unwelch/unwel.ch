import { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { betStatuses, getBetStatus } from './bet-status'

const QUERY = gql`
  query($betId: String!) {
    bet(id: $betId) {
      user {
        id
      }
      user2 {
        id
      }
      userResponse
      user2Response
    }
    currentUser {
      id
    }
  }
`

class BetStatusIcon extends Component {
  getText (betStatus) {
    switch (betStatus) {
      case betStatuses.WAITING_FOR_OPONENT:
        return 'Waiting for an opponent'
      case betStatuses.AVAILABLE_BET:
        return 'Available'
      case betStatuses.WAITING_FOR_USER_RESPONSE:
        return 'Waiting for result'
      case betStatuses.WAITING_FOR_OPONENT_RESPONSE:
        return 'Waiting for opponent result'
      case betStatuses.LOST:
        return 'Lost'
      case betStatuses.WON:
        return 'Won'
      case betStatuses.WELCHED:
        return 'Dispute'
    }

    console.error('Unkown bet state')
  }

  render () {
    const { loading, bet, currentUser } = this.props.data

    // let icon = ''
    let text = ''

    if (!loading) {
      const betStatus = getBetStatus(bet, currentUser)

      // icon = getBetStatusIcon(betStatus)
      text = this.getText(betStatus)
    }

    return text
  }
}

export default graphql(QUERY)(BetStatusIcon)
