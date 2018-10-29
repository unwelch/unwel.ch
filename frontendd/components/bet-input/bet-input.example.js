import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Box from './../default-container'

import BetInput from '.'

const stories = storiesOf('Bet Input', module)
stories.addDecorator(withKnobs).add('default', () => {
  return (
    <Box>
      <BetInput
        starter='I bet'
        middle='that'
        items={['a bitcoin', 'a dinner', 'a beer']}
        onConfirm={console.log}
      />
    </Box>
  )
})
