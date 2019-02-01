import React, { Component } from 'react'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import Tabs from './navigation/tabs'
import Header from './header'

import { colors } from 'components/variables'
import { withGlobalSize } from 'components/responsive-provider'

const TabWrapper = styled.div`
  background: white;
  left: 0;
  bottom: 0;
  right: 0;
  border-top: ${props => (props.disableBorder ? '1px' : '0px')} solid
    ${colors.grey3};
  z-index: 900;

  transition: transform 0.3s ease;
  transform: translateY(${p => (p.visible ? '0' : '100%')});
`

const Content = styled.div`
  flex: 1;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
`

const Root = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

class Layout extends Component {
  render () {
    const { location, globalWidth } = this.props

    const { pathname } = location

    const showTabs = !(
      pathname === '/bets/new' ||
      pathname === '/save-account' ||
      pathname === '/login' ||
      pathname === '/anonymous-login'
    )

    const tabsOnTop = globalWidth > 600

    return (
      <Root>
        <Header />
        {tabsOnTop && (
          <TabWrapper visible={showTabs}>
            <Tabs verticalLabels={!tabsOnTop} />
          </TabWrapper>
        )}
        <Content>{this.props.children}</Content>
        {!tabsOnTop && (
          <TabWrapper disableBorder visible={showTabs}>
            <Tabs verticalLabels={!tabsOnTop} />
          </TabWrapper>
        )}
      </Root>
    )
  }
}

export default compose(
  withRouter,
  withGlobalSize
)(Layout)
