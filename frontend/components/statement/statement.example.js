import React from 'react'
import { storiesOf } from '@storybook/react'

import Statement from '.'

storiesOf('Statement', module)
  .add('with two players', () =>
    <Statement
      betIntro='You said to Marçal '
      betStatement='Neymar will score the next match'
    />
  )
  .add('with one players', () =>
    <Statement
      betIntro='You said '
      betStatement='Neymar will score the next match'
    />
  )
