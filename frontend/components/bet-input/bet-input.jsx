import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import Button from './../button'
import Spacer from './../spacer'
import Input from './input'
import Animate from '../animate'
import Text from '../text'

const quantityIdeas = [
  { color: '#E9CA9F99', emoji: '☕️', content: 'one coffee' },
  { color: '#FF878B99', emoji: '🍕', content: 'the last pizza slice' },
  { color: '#A0BAFF99', emoji: '🍽', content: 'a dinner' },
  { color: '#FDD57F99', emoji: '🍺', content: 'a beer' }
]

const statementIdeas = [
  { color: '#9FD2E999', emoji: '😎', content: 'it will be warmer next year' },
  { color: '#FF878B99', emoji: '🏃‍', content: 'I will finish a marathon' }
]

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

const fadeInDelayed = keyframes`
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  40% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

const Root = styled.div``

const AnimateWrapperQuantity = styled.div`
  animation: ${fadeIn} 0.5s;
  transition: 0.25s;
`

const AnimateWrapperStatement = styled.div`
  animation: ${fadeInDelayed} 0.8s;
  transition: 0.25s;
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
    statement: PropTypes.string
  }

  static defaultProps = {
    quantity: '',
    statement: ''
  }

  constructor (props) {
    super(props)

    this.state = {
      quantityValue: props.quantity,
      statementValue: props.statement
    }
  }

  onChange = stateKey => {
    return ({ target }) => {
      this.setState({
        [stateKey]: target.value
      })
    }
  }

  canSubmit (state) {
    return state.quantityValue.length > 0 && state.statementValue.length > 0
  }

  submitHandler = () => {
    const { quantityValue: quantity, statementValue: statement } = this.state

    if (this.canSubmit(this.state)) {
      this.props.onConfirm({ quantity, statement })
    }
  }

  render () {
    const { starter, middle } = this.props
    const { quantityValue, statementValue } = this.state

    return (
      <Root onKeyDown={isEnterKey(this.submitHandler)}>
        <AnimateWrapperQuantity>
          <Text fontWeight='regular' size='size5'>
            {starter}
          </Text>
          <Spacer top={1} />
          <Input
            fontWeight='black'
            size='size5'
            fullWidth
            onChange={this.onChange('quantityValue')}
            value={quantityValue}
            placeholder={'1 coffee'}
            dataQa='bet-input-quantity'
            ideas={quantityIdeas}
            ideaColumns={1}
          />
        </AnimateWrapperQuantity>
        <Spacer top={2} />

        <AnimateWrapperStatement>
          <Text fontWeight='regular' size='size5'>
            {middle}
          </Text>
          <Input
            italics
            fontWeight='black'
            size='size5'
            fullWidth
            onChange={this.onChange('statementValue')}
            value={statementValue}
            placeholder={'something'}
            dataQa='bet-input-statement'
            ideas={statementIdeas}
            ideaColumns={1}
          />
        </AnimateWrapperStatement>

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
