import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose, always } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SettingsIcon from 'react-feather/dist/icons/settings'
import DefaultContainer from 'components/default-container'
import Distribute from 'components/distribute'
import Spread from 'components/spread'
import Text from 'components/text'
import Avatar from 'components/avatar'
import Placeholder from 'components/placeholder'
import Spacer from 'components/spacer'
import Button from 'components/button'
import { colors } from 'components/variables'

import { BasicStats, WonLostPie, WonLostBar } from './stats'

import { TranslatorConsumer } from '../../translations'

import { trackEvent, events } from '../../tracking'
import { goToPage } from '../../navigation/actions'

export const QUERY = gql`
  query($userId: String!) {
    currentUser {
      id
      name
      isAnonymous
      avatar
    }
    user(id: $userId) {
      id
      name
      avatar
      stats {
        betsAccepted
        betsCreated
        betsDisputed
        betsWon
        betsLost
      }
      statsAgainstYou {
        betsAccepted
        betsCreated
        betsDisputed
        betsWon
        betsLost
      }
    }
  }
`
const Root = styled(DefaultContainer)``

const SaveAccountWrapper = styled.div``

const Split = styled.div`
  background: ${colors.grey3};
  height: 1px;
  margin: 16px 0;
`

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = { selectedTab: 'bets' }

    this.handleSettingsIconClick = this.handleSettingsIconClick.bind(this)
    this.saveAccountHandler = this.saveAccountHandler.bind(this)
    this.handleChallengeButtonClick = this.handleChallengeButtonClick.bind(this)
  }

  componentDidMount() {
    trackEvent(events.pageLoaded, { page: 'profile' })
  }

  handleSettingsIconClick() {
    this.props.goToPage('/settings')
  }

  saveAccountHandler() {
    this.props.goToPage('/save-account')
  }

  handleChallengeButtonClick() {
    const user = this.props.data && this.props.data.user
    if (user) {
      this.props.goToPage({
        pathname: '/bets/new',
        search: '?targetUserId=' + user.id
      })
    }
  }

  render() {
    const { user, currentUser } = this.props.data

    if (!user || !currentUser) {
      return (
        <Root>
          <Placeholder fullWidth />
        </Root>
      )
    }

    const isCurrentUser = currentUser.id === user.id
    const isAnonymous = currentUser.isAnonymous

    return (
      <TranslatorConsumer>
        {t => (
          <Root>
            <Spacer top={3} bottom={3}>
              <Spread align="center">
                <Distribute space={2} align="center">
                  <Avatar size={7} user={user} />
                  <Text size="size3" fontWeight="bold">
                    {user.name}
                  </Text>
                </Distribute>
                {isCurrentUser && (
                  <SettingsIcon onClick={this.handleSettingsIconClick} />
                )}
              </Spread>
            </Spacer>

            {!isCurrentUser && currentUser != null && (
              <Fragment>
                <Button
                  type="level2"
                  fullWidth
                  onClick={this.handleChallengeButtonClick}>
                  {t('challenge-a-friend', { userName: user.name })}
                </Button>
              </Fragment>
            )}

            <Split />

            {isCurrentUser && isAnonymous && (
              <Fragment>
                <SaveAccountWrapper>
                  <Text size="size1">{t('save-account-message')}</Text>
                  <Spacer top={1} />
                  <Button
                    type="level2"
                    fullWidth
                    onClick={this.saveAccountHandler}>
                    {t('create-account')}
                  </Button>
                </SaveAccountWrapper>
                <Split />
              </Fragment>
            )}

            {user.stats.betsCreated + user.stats.betsAccepted > 0 && (
              <Fragment>
                <BasicStats stats={user.stats} />
                <Split />
              </Fragment>
            )}

            {user.stats.betsLost + user.stats.betsWon > 0 && (
              <Fragment>
                <WonLostPie stats={user.stats} />
                <Split />
              </Fragment>
            )}

            {!isCurrentUser &&
              user.statsAgainstYou.betsWon + user.statsAgainstYou.betsLost >
                0 && (
                <Fragment>
                  <Split />
                  <div>
                    <Text size="size3" fontWeight="regular">
                      {t('you')} vs {user.name}
                    </Text>
                    <Spacer top={2}>
                      <WonLostBar stats={user.statsAgainstYou} />
                    </Spacer>
                  </div>
                </Fragment>
              )}
            <Spacer inner top={4} />
          </Root>
        )}
      </TranslatorConsumer>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      goToPage
    },
    dispatch
  )
}

export default compose(
  connect(
    always({}),
    mapDispatchToProps
  ),
  graphql(QUERY, {
    options: () => {
      return {
        fetchPolicy: 'cache-and-network'
      }
    }
  })
)(Profile)
