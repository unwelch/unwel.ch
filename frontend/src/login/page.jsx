import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'ramda'

import DefaultContainer from 'components/default-container'
import Spacer from 'components/spacer'
import Content from 'components/content'
import Distribute from 'components/distribute'
import Button from 'components/button'
import Input from 'components/input'
import ProviderButtons from 'components/login-provider-buttons'

import { anonymousLogin, googleLogin } from '../user/login'
import withNavigate from '../navigation/withNavigate'
import withIsLoggedIn from '../user/auth/withIsLoggedIn'
import { trackEvent, events } from '../tracking'

const Root = styled(Distribute)`
  height: 100%;
`

class AnonymousLogin extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
  }

  onChangeHandler = e => {
    this.setState({ value: e.target.value })
  }

  onAnonymousClickHandler = () => {
    trackEvent(events.loginRequested, { type: 'anonymous' })
    anonymousLogin(this.state.value)
  }

  render () {
    return (
      <div>
        <Spacer inner top={3} />
        <Content type='title' fontWeight='regular'>
          Give us a name
        </Content>
        <Spacer top={1} />
        <Content type='subtitle'>
          Your friends will know who you are when you share the bet.
        </Content>
        <Spacer top={2} />
        <Content type='title' fontWeight='regular'>
          <Input
            data-qa='anonymous-login-input'
            value={this.state.value}
            size='size4'
            autoFocus
            onChange={this.onChangeHandler}
            placeholder='e.g Jim Carrey'
          />
        </Content>
        <Spacer top={6} bottom={10}>
          <Button
            type='level2'
            onClick={this.onAnonymousClickHandler}
            dataQa='anonymous-login-confirm'
          >
            Create a new account
          </Button>
        </Spacer>
      </div>
    )
  }
}

const onGoogleClickHandler = () => {
  trackEvent(events.loginRequested, {
    type: 'oauth',
    provider: 'google'
  })
  googleLogin()
}

const OAuthLogin = () => {
  return (
    <div>
      <Spacer top={4} />
      <Content type='title' fontWeight='regular'>
        Welcome 👋
      </Content>
      <Spacer top={1} />
      <Content type='subtitle'>
        Sign into your account and start challenging your friends.
      </Content>
      <Spacer top={6} bottom={6}>
        <ProviderButtons onClickGoogle={onGoogleClickHandler} />
      </Spacer>
    </div>
  )
}

class Login extends Component {
  componentDidMount () {
    trackEvent(events.pageLoaded, {
      page: 'login',
      anonymousLogin: this.props.anonymous
    })

    if (this.props.isLoggedIn) {
      this.props.goToPage('/bets')
    }
  }

  render () {
    const { anonymous } = this.props
    return (
      <div>
        <Root align='center' position='center'>
          <DefaultContainer>
            {anonymous ? <AnonymousLogin /> : <OAuthLogin />}
          </DefaultContainer>
        </Root>
      </div>
    )
  }
}

export default compose(
  withIsLoggedIn,
  withNavigate
)(Login)
