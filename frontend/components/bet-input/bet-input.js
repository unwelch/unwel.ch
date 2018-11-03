import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import LockIcon from 'react-feather/dist/icons/lock'
import UnLockIcon from 'react-feather/dist/icons/unlock'

import Distribute from '../distribute'
import Split from '../split'
import { colors } from '../variables'
import Button from './../button'
import Spacer from './../spacer'
import Input from '../input'
import Animate from '../animate'
import Text from '../text'

import { PRIVATE_BET_FEATURE_TOGGLE } from './../../src/features'

const fadeIn = keyframes`
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

const Root = styled.div``

const AnimateWrapper = styled.div`
  animation: ${fadeIn} 0.5s both;
  transition: 0.25s;
  ${props => (props.delay ? `animation-delay: ${props.delay * 200}ms` : '')};
`

const isEnterKey = fn => {
  return event => {
    if (event.key === 'Enter') {
      fn()
    }
  }
}

class Bet extends Component {
  static propTypes = {
    quantity: PropTypes.string,
    statement: PropTypes.string,
    isPrivate: PropTypes.bool
  }

  static defaultProps = {
    quantity: '',
    statement: '',
    isPrivate: false
  }

  constructor (props) {
    super(props)

    this.state = {
      quantityValue: props.quantity,
      statementValue: props.statement,
      isPrivate: props.isPrivate
    }
  }

  onChange = stateKey => {
    return ({ target }) => {
      this.setState({
        [stateKey]: target.value
      })
    }
  }

  handleVisibilityChange = () => {
    this.setState({
      isPrivateBet: !this.state.isPrivateBet
    })
  }

  canSubmit (state) {
    return state.quantityValue.length > 0 && state.statementValue.length > 0
  }

  submitHandler = () => {
    const {
      quantityValue: quantity,
      statementValue: statement,
      isPrivate
    } = this.state

    if (this.canSubmit(this.state)) {
      this.props.onConfirm({ quantity, statement, isPrivate })
    }
  }

  render () {
    const { starter, middle } = this.props
    const { quantityValue, statementValue } = this.state
    const VisibilityIcon = this.state.isPrivateBet ? LockIcon : UnLockIcon

    return (
      <Root onKeyDown={isEnterKey(this.submitHandler)}>
        <AnimateWrapper delay={1}>
          <Text fontWeight='regular' size='size5'>
            {starter}
          </Text>
          <Spacer top={1} />
          <Input
            fontWeight='bold'
            size='size5'
            fullWidth
            onChange={this.onChange('quantityValue')}
            value={quantityValue}
            placeholder={'1 coffee'}
            data-qa='bet-input-quantity'
          />
        </AnimateWrapper>
        <Spacer top={2} />

        <AnimateWrapper delay={3}>
          <Text fontWeight='regular' size='size5'>
            {middle}
          </Text>
          <Input
            italics
            fontWeight='bold'
            size='size5'
            fullWidth
            onChange={this.onChange('statementValue')}
            value={statementValue}
            placeholder={'something'}
            data-qa='bet-input-statement'
          />
        </AnimateWrapper>

        {PRIVATE_BET_FEATURE_TOGGLE &&
          <AnimateWrapper delay={3}>
            <Spacer top={3} onClick={this.handleVisibilityChange}>
              <Distribute space={2} align='center'>
                <Text size='size1'>
                  Visibility
                </Text>
                <VisibilityIcon
                  color={
                    this.state.isPrivateBet ? colors.grey5 : colors.primary
                  }
                />
              </Distribute>
              <Split />
            </Spacer>
          </AnimateWrapper>}

        <Animate
          type='slideUp'
          delay={1}
          isVisible={this.canSubmit(this.state)}
        >
          <Spacer top={4}>
            <Button
              size='large'
              fullWidth
              onClick={this.submitHandler}
              type='level2'
              disabled={!this.canSubmit(this.state)}
              dataQa='create-bet-button'
            >
              Save your bet
            </Button>
          </Spacer>
        </Animate>
      </Root>
    )
  }
}

export default Bet
