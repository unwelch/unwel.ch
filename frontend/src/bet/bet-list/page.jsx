import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { compose } from 'ramda'

import DefaultContainer from 'components/default-container'
import Text from 'components/text'
import Spacer from 'components/spacer'

import * as queries from './queries'
import { trackEvent, events } from '../../tracking'
import { TranslatorConsumer } from '../../translations'
import withNavigate from '../../navigation/withNavigate'
import withIsLoggedIn from '../../user/auth/withIsLoggedIn'
import BetList from './bet-list'

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
    const { bets, currentUser, loading } = this.props.data

    return (
      <Root>
        <DefaultContainer>
          <Spacer inner top={3} />
          <TranslatorConsumer>
            {t => (
              <Text size="size3" fontWeight="bold">
                {t('bet-list.title')}
              </Text>
            )}
          </TranslatorConsumer>
          <Spacer top={3} />
          <BetList
            placeholders={loading}
            bets={bets}
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
  graphql(queries.BET_LIST, {
    options: () => ({
      fetchPolicy: 'cache-and-network'
    })
  }),
  withIsLoggedIn,
  withNavigate
)(BetListPage)
