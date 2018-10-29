import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import Button from './../button'
import Spacer from './../spacer'
import Input from '../input'
import Animate from '../animate'
import Text from '../text'

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
  constructor (props) {
    super(props)

    this.state = {
      quantityValue: props.quantity || '',
      statementValue: props.statement || ''
    }

    this.onChange = this.onChange.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  onChange (stateKey) {
    return ({ target }) => {
      this.setState({
        [stateKey]: target.value
      })
    }
  }

  canSubmit (state) {
    return state.quantityValue.length > 0 && state.statementValue.length > 0
  }

  submitHandler () {
    const { quantityValue, statementValue } = this.state

    if (this.canSubmit(this.state)) {
      this.props.onConfirm(quantityValue, statementValue)
    }
  }

  render () {
    const { starter, middle } = this.props

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
            value={this.state.quantityValue}
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
            value={this.state.statementValue}
            placeholder={'something'}
            data-qa='bet-input-statement'
          />
        </AnimateWrapper>

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
