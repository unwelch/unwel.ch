import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'ramda'
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
import { colors } from 'components/variables'

import { BasicStats, WonLostPie, WonLostBar } from './stats'

import { trackEvent, events } from '../../tracking'
import { goToPage } from './../../navigation/actions'

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

const Split = styled.div`
  background: ${colors.grey3};
  height: 1px;
  margin: 16px 0;
`

class Profile extends Component {
  state = { selectedTab: 'bets' }

  componentDidMount () {
    trackEvent(events.pageLoaded, { page: 'profile' })
  }

  handleSettingsIconClick = () => {
    this.props.goToPage('/settings')
  }

  render () {
    const { user, currentUser, loading } = this.props.data

    if (loading || !user) {
      return (
        <Root>
          <Placeholder fullWidth />
        </Root>
      )
    }

    const isCurrentUser = currentUser.id === user.id

    return (
      <Root>
        <Spacer top={3} bottom={3}>
          <Spread align='center'>
            <Distribute space={2} align='center'>
              <Avatar size={7} user={user} />
              <Text size='size3' fontWeight='bold'>
                {user.name}
                {"'"}s profile
              </Text>
            </Distribute>
            {isCurrentUser && (
              <SettingsIcon onClick={this.handleSettingsIconClick} />
            )}
          </Spread>
        </Spacer>

        <BasicStats stats={user.stats} />

        <Split />

        <WonLostPie stats={user.stats} />

        {!isCurrentUser && (
          <Fragment>
            <Split />
            <div>
              <Text size='size3' fontWeight='regular'>
                You vs {user.name}
              </Text>
              <Spacer top={2}>
                <WonLostBar stats={user.statsAgainstYou} />
              </Spacer>
            </div>
          </Fragment>
        )}
      </Root>
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
    null,
    mapDispatchToProps
  ),
  graphql(QUERY)
)(Profile)
