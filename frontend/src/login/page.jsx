import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { compose } from 'ramda'

import DefaultContainer from 'components/default-container'
import Spacer from 'components/spacer'
import Animate from 'components/animate'
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

const onGoogleClickHandler = () => {
  trackEvent(events.loginRequested, {
    type: 'oauth',
    provider: 'google'
  })
  googleLogin()
}

const onAnonymousClickHandler = value => () => {
  trackEvent(events.loginRequested, { type: 'anonymous' })
  anonymousLogin(value)
}

const AnonymousLogin = () => {
  const [value, setValue] = useState('')
  const [inputFocus, setInputFocus] = useState(false)
  const [buttonHover, setButtonHover] = useState(false)

  const onInputFocus = () => {
    setInputFocus(true)
  }

  const onInputBlur = () => {
    if (!buttonHover) {
      setInputFocus(false)
    }
  }

  const onChangeHandler = e => {
    setValue(e.target.value)
  }

  const onKeyDownHandler = e => {
    if (e.key === 'Enter') {
      onAnonymousClickHandler(value)()
    }
  }

  return (
    <Fragment>
      <Content type='title' fontWeight='regular'>
        Give us a name 🤙
      </Content>
      <Spacer top={1} />
      <Content type='subtitle'>Your friends will know who you are...</Content>
      <Spacer top={2} />
      <Distribute>
        <Content type='title' fontWeight='regular'>
          <Input
            data-qa='anonymous-login-input'
            value={value}
            size='size4'
            onChange={onChangeHandler}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onKeyDown={onKeyDownHandler}
            placeholder='e.g Jim Carrey'
          />
        </Content>
      </Distribute>
      <Spacer top={6} bottom={10}>
        <Animate type='slideUp' isVisible={inputFocus}>
          <Button
            type='level2'
            onClick={onAnonymousClickHandler(value)}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            dataQa='anonymous-login-confirm'
          >
            Create a new account
          </Button>
        </Animate>
      </Spacer>
    </Fragment>
  )
}

const Divider = styled.div`
  height: 100%;
  width: 2px;
  background-color: #eee;
  padding: 0px 8px;
`

const OAuth = ({ onLaterClickHandler }) => {
  return (
    <Fragment>
      <Content type='title' fontWeight='regular'>
        Welcome 👋
      </Content>
      <Spacer top={1} />
      <Content type='subtitle'>
        Sign into your account and start challenging your friends.
      </Content>
      <Spacer top={6} bottom={6}>
        <Distribute>
          <ProviderButtons onClickGoogle={onGoogleClickHandler} />
          <Divider />
          <Button
            dataQa='skip-login'
            size='large'
            type='inverted'
            onClick={onLaterClickHandler}
          >
            Later
          </Button>
        </Distribute>
      </Spacer>
    </Fragment>
  )
}

const Login = ({ goToPage, isLoggedIn }) => {
  const [anonymous, setAnonymous] = useState(false)

  if (isLoggedIn) {
    goToPage('/bets')
  }

  useEffect(
    () => {
      trackEvent(events.pageLoaded, {
        page: 'login',
        anonymousLogin: anonymous
      })
    },
    [anonymous]
  )

  const skipLogin = () => {
    setAnonymous(true)
  }

  return (
    <div>
      <Root align='center' position='center'>
        <DefaultContainer>
          <Spacer top={4}>
            {!anonymous ? (
              <OAuth onLaterClickHandler={skipLogin} />
            ) : (
              <AnonymousLogin />
            )}
          </Spacer>
        </DefaultContainer>
      </Root>
    </div>
  )
}

export default compose(
  withIsLoggedIn,
  withNavigate
)(Login)
