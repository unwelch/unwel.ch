import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import Animate from './animate'

const stories = storiesOf('Animate', module)
stories.addDecorator(withKnobs).add('default', () => (
  <Animate isVisible={boolean('isVisble', true)} fade={boolean('fade', true)}>
    <div>Hello</div>
  </Animate>
))
