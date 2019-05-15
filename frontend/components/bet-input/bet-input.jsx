import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

import Button from './../button'
import Spacer from './../spacer'
import Input from './input'
import Animate from '../animate'
import Text from '../text'

// const quantityIdeas = [
//   { color: '#E9CA9F99', emoji: '☕️', content: 'one coffee' },
//   { color: '#FF878B99', emoji: '🍕', content: 'the last pizza slice' },
//   { color: '#A0BAFF99', emoji: '🍽', content: 'a dinner' },
//   { color: '#FDD57F99', emoji: '🍺', content: 'a beer' }
// ]

// const statementIdeas = [
//   { color: '#9FD2E999', emoji: '😎', content: 'it will be warmer next year' },
//   { color: '#FF878B99', emoji: '🏃‍', content: 'I will finish a marathon' }
// ]

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

const Bet = ({
  initialQuantity = '',
  initialStatement = '',
  starter,
  middle,
  onConfirm
}) => {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [statement, setStatement] = useState(initialStatement)
  const canSubmit =
    quantity && quantity.length > 0 && statement && statement.length > 0

  const submit = () => {
    if (canSubmit) {
      onConfirm({ quantity, statement })
    }
  }

  return (
    <Root onKeyDown={isEnterKey(submit)}>
      <AnimateWrapperQuantity>
        <Text fontWeight="regular" size="size5">
          {starter}
        </Text>
        <Spacer top={1} />
        <Input
          fontWeight="black"
          size="size5"
          fullWidth
          onChange={event => {
            setQuantity(event.target.value)
          }}
          value={quantity}
          placeholder={'1 coffee'}
          dataQa="bet-input-quantity"
        />
      </AnimateWrapperQuantity>
      <Spacer top={2} />

      <AnimateWrapperStatement>
        <Text fontWeight="regular" size="size5">
          {middle}
        </Text>
        <Input
          italics
          fontWeight="black"
          size="size5"
          fullWidth
          onChange={event => {
            setStatement(event.target.value)
          }}
          value={statement}
          placeholder={'something'}
          dataQa="bet-input-statement"
        />
      </AnimateWrapperStatement>

      <Animate type="slideUp" delay={1} isVisible={canSubmit}>
        <Spacer top={4}>
          <Button
            size="large"
            fullWidth
            onClick={submit}
            type="level2"
            disabled={!canSubmit}
            dataQa="create-bet-button">
            Save your bet
          </Button>
        </Spacer>
      </Animate>
    </Root>
  )
}

export default Bet
