import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import ArrowLeftIcon from 'react-feather/dist/icons/arrow-left'
import styled from 'styled-components'

import Spread from 'components/spread'
import Distribute from 'components/distribute'
import Logo from 'components/logo'
import DefaultContainer from 'components/default-container'
import Button from 'components/button'
import { colors } from 'components/variables'

import { getIsLoggedIn, getToken } from './user/auth/selectors'
import withNavigate from './navigation/withNavigate'

const Root = styled.div`
  width: 100%;
  z-index: 900;
  padding: 10px 0;
  border-bottom: 1px solid ${colors.grey3};
  background: white;
  display: flex;
  align-items: center;
  height: 54px;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`

const BackArrowWrapper = styled.div`
  display: flex;
  transition: all 0.2s ease;
  opacity: ${p => (p.visible ? 1 : 0)};
  width: ${p => (p.visible ? '32px' : 0)};
`

class Header extends Component {
  saveAccountHandler = () => {
    this.props.goToPage('/save-account')
  }

  newBetHandler = () => {
    this.props.goToPage(`/bets/new`)
  }

  logoutHandler = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  render() {
    const { isLoggedIn, location } = this.props

    const { pathname } = location

    const showBackArrow = !(
      pathname === '/' ||
      pathname.includes('profile') ||
      pathname === '/bets' ||
      pathname === '/notifications'
    )

    return (
      <Root>
        <DefaultContainer>
          <Spread align="center">
            <LogoWrapper
              onClick={showBackArrow ? this.props.history.goBack : _ => _}>
              <BackArrowWrapper visible={showBackArrow}>
                <ArrowLeftIcon />
              </BackArrowWrapper>
              <Logo />
            </LogoWrapper>

            <Distribute space={2} align="center">
              {isLoggedIn && (
                <Button type="level2" size="small" onClick={this.newBetHandler}>
                  New bet
                </Button>
              )}
            </Distribute>
          </Spread>
        </DefaultContainer>
      </Root>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: getIsLoggedIn(state),
    token: getToken(state)
  }
}

export default compose(
  withRouter,
  withNavigate,
  connect(
    mapStateToProps,
    null
  )
)(Header)
