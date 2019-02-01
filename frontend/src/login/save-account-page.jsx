import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { googleLogin } from '../user/login'

import { getIsAnonymous } from '../user/auth/selectors'
import withToken from '../user/auth/withToken'

import { goToPage } from '../navigation/actions'

import DefaultContainer from 'components/default-container'
import Spacer from 'components/spacer'
import Text from 'components/text'
import ProviderButtons from 'components/login-provider-buttons'

import { trackEvent, events } from '../tracking'

export const QUERY = gql`
  query {
    currentUser {
      id
      isAnonymous
    }
  }
`

class SaveAccount extends Component {
  componentDidMount () {
    trackEvent(events.pageLoaded, { page: 'saveAccount' })
  }

  render () {
    const { currentUser, loading } = this.props.data

    if (loading) {
      return null
    }

    if (!currentUser.isAnonymous) {
      this.props.goToPage('/bets')
    }

    return (
      <DefaultContainer>
        <Spacer top={4}>
          <Text size='size4' fontWeight='regular'>
            Save your account and bets.
          </Text>
        </Spacer>
        <Spacer top={2}>
          <Text>
            Link it with your Google account and get access from other devices.
          </Text>
        </Spacer>
        <Spacer top={2}>
          <ProviderButtons
            onClickGoogle={() => {
              trackEvent(events.saveAccountRequest, {
                type: 'oauth',
                provider: 'google'
              })
              googleLogin(this.props.token)
            }}
          />
        </Spacer>
      </DefaultContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAnonymous: getIsAnonymous(state)
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
  graphql(QUERY),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withToken
)(SaveAccount)
