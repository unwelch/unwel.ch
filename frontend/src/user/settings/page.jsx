import React, { Component, Fragment } from 'react'
import Switch from 'react-switch'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'ramda'

import DefaultContainer from 'components/default-container'
import Input from 'components/input'
import Distribute from 'components/distribute'
import Button from 'components/button'
import Text from 'components/text'
import Spacer from 'components/spacer'
import { colors } from 'components/variables'

import { trackEvent } from '../../tracking'
import {
  CHANGE_NAME,
  ENABLE_PUSH_NOTIFICATIONS,
  DISABLE_PUSH_NOTIFICATIONS
} from './mutations'

import { getToken } from '../auth/selectors'

import { setupPush, isPushSupported } from '../../service-worker'
import { promptInstall, canInstall } from '../../pwa'

export const QUERY = gql`
  query {
    currentUser {
      id
      name
      avatar
      isAnonymous
      pushEnabled
    }
  }
`

const Split = styled.div`
  background: ${colors.grey3};
  height: 1px;
  margin: 16px 0;
`

const Root = styled(DefaultContainer)``

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: null
    }

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleNameInputBlur = this.handleNameInputBlur.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleNotificationsChange = this.handleNotificationsChange.bind(this)
  }

  componentWillUpdate (nextProps, nextState) {
    if (!nextProps.data.loading && nextState.name === null) {
      this.setState({
        name: nextProps.data.currentUser.name
      })
    }
  }

  componentDidMount () {
    trackEvent('pageLoaded', { page: 'settings' })

    if (!this.props.data.loading && this.state.name === null) {
      this.setState({
        name: this.props.data.currentUser.name
      })
    }
  }

  handleLogOut () {
    window.localStorage.clear()
    window.location.href = '/'
  }

  handleChangeName (event) {
    this.setState({
      name: event.target.value
    })
  }

  handleNameInputBlur () {
    this.props.changeName(this.state.name)
  }

  handleNotificationsChange (enabled) {
    if (enabled) {
      setupPush(this.props.token)
        .then(() => this.props.enablePushNotifications())
        .catch(() => {
          // User probably denied the request of notifications
          // reload to reflect changes (Notification.permission will be 'denied')
          window.location.reload()
        })
    } else {
      this.props.disablePushNotifications()
    }
  }

  handleInstall () {
    promptInstall()
  }

  render () {
    const { currentUser, loading } = this.props.data

    if (loading) {
      return null
    }

    const isAnonymous = currentUser.isAnonymous

    return (
      <Root>
        <Spacer inner top={3} />
        <Text size='size3' fontWeight='regular'>
          Settings
        </Text>
        <Split />
        <Distribute space={2} align='center'>
          <Text size='size2' fontWeight='regular'>
            Name
          </Text>
          <Input
            value={this.state.name ? this.state.name : ''}
            onChange={this.handleChangeName}
            onBlur={this.handleNameInputBlur}
            size='size2'
          />
        </Distribute>
        <Split />
        {isPushSupported() &&
          window.Notification.permission !== 'denied' && (
          <Fragment>
            <Distribute space={2} align='center'>
              <Text size='size2' fontWeight='regular'>
                  Notifications
              </Text>
              <Switch
                onChange={this.handleNotificationsChange}
                checked={currentUser.pushEnabled}
                onColor={colors.primary}
              />
            </Distribute>
            <Split />
          </Fragment>
        )}
        {canInstall() && (
          <Fragment>
            <Button onClick={this.handleInstall}>Add to homescreen</Button>
            <Split />
          </Fragment>
        )}
        {!isAnonymous && (
          <Fragment>
            <Button type='warning' onClick={this.handleLogOut}>
              Log out
            </Button>
            <Split />
          </Fragment>
        )}
      </Root>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: getToken(state)
  }
}

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  graphql(QUERY),
  graphql(CHANGE_NAME, {
    props: ({ mutate }) => ({
      changeName: name => mutate({ variables: { name } })
    })
  }),
  graphql(ENABLE_PUSH_NOTIFICATIONS, {
    props: ({ mutate }) => ({
      enablePushNotifications: () => mutate()
    })
  }),
  graphql(DISABLE_PUSH_NOTIFICATIONS, {
    props: ({ mutate }) => ({
      disablePushNotifications: () => mutate()
    })
  })
)(Settings)
