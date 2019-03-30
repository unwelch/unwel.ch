import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'ramda'

import DefaultContainer from 'components/default-container'
import Spacer from 'components/spacer'

import { trackEvent, events } from '../../tracking'
import withNavigate from '../../navigation/withNavigate'
import withIsLoggedIn from '../../user/auth/withIsLoggedIn'
import BetList from '../bet-list/bet-list'

export const BET_FEED = gql`
  query {
    currentUser {
      id
      name
      avatar
    }
    betsFeed {
      id
      quantity
      user {
        id
        avatar
        name
      }
      user2 {
        id
        avatar
        name
      }
      statement {
        statement
      }
      userResponse
      user2Response
      createdAt
    }
  }
`

const Root = styled.div`
  min-height: 100%;
`

class BetListPage extends Component {
  componentDidMount() {
    trackEvent(events.pageLoaded, { page: 'betList' })
    if (!this.props.isLoggedIn) {
      this.props.goToPage(`/`)
    }
  }

  render() {
    const { betsFeed, currentUser, loading } = this.props.data

    return (
      <Root>
        <DefaultContainer>
          <BetList
            placeholders={loading}
            bets={betsFeed}
            onBetClick={betId => this.props.goToPage(`/bet/${betId}`)}
            currentUser={currentUser}
          />
          <Spacer inner top={3} />
        </DefaultContainer>
      </Root>
    )
  }
}

export default compose(
  graphql(BET_FEED, {
    options: () => ({
      fetchPolicy: 'cache-and-network'
    })
  }),
  withIsLoggedIn,
  withNavigate
)(BetListPage)
