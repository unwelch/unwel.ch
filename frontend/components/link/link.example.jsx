import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select, color } from '@storybook/addon-knobs'
import Link, { availableSizes, availableFontWeights } from '.'

const stories = storiesOf('Form elements|Link', module)
stories.addDecorator(withKnobs)

stories.add('default', () => (
  <Link
    href="#"
    clear={boolean('clear', false)}
    size={select('size', availableSizes, 'size0')}
    fontWeight={select('fontWeight', availableFontWeights, 'regular')}
    mono={boolean('mono', false)}
    uppercase={boolean('uppercase', false)}
    loose={boolean('loose', false)}
    color={color('color')}
    dimmed={boolean('dimmed', false)}>
    Link
  </Link>
))
