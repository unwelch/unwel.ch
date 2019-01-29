import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { last } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { popAnnounce } from './actions'

import Text from 'components/text'
import { colors } from 'components/variables'

import { TranslatorConsumer } from '../translations'

const appear = keyframes`
  0%, 10% {
    transform: translateY(120px) scaleY(1.6);
    opacity: 0;
    animation-timing-function: cubic-bezier(0.55, 1.5, 0.55, 0.9);
  }

  20%, 90% {
    transform: translateY(0);
    opacity: 1;
    animation-timing-function: cubic-bezier(0.8, 0, 0.8, 0);
  }

  100% {
    transform: translateY(120px) scaleY(1.6);
    opacity: 0;
  }
`

const Root = styled.div`
  position: fixed;
  bottom: 12vh;
  left: 10vw;
  right: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Announce = styled.div`
  width: fit-content;
  background: ${colors.lila};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 48px;
  background: ${colors.primary};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);

  animation: ${appear} 3.5s forwards;
  border-radius: 6px;
`

class Announcer extends Component {
  render () {
    const { announce } = this.props

    if (!announce) return null

    if (this.lastAnnounceKey !== announce.key) {
      setTimeout(() => this.props.popAnnounce(), 4000)
      this.lastAnnounceKey = announce.key
    }

    return (
      <TranslatorConsumer>
        {t => (
          <Root>
            {announce && (
              <Announce key={announce.key}>
                <Text size='size2' color={colors.background}>
                  {t(announce.message)}
                </Text>
              </Announce>
            )}
          </Root>
        )}
      </TranslatorConsumer>
    )
  }
}

const mapStateToProps = state => {
  return {
    announce: last(state.announces)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      popAnnounce
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Announcer)
