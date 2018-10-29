import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, boolean } from '@storybook/addon-knobs'
import Spacer from '.'
import styled from 'styled-components'

const Demo = styled.span`
  box-shadow: 0 0 0 1px pink;
  display: inline-block;
`
Demo.displayName = 'Demo'

const stories = storiesOf('Spacer', module)
stories.addDecorator(withKnobs)

stories.add('default', () =>
  <div>
    <Spacer
      top={number('top', 0)}
      right={number('right', 4)}
      bottom={number('bottom', 3)}
      left={number('left', 0)}
      inline={boolean('inline', false)}
    >
      <Demo>content</Demo>
    </Spacer>

    <Demo>content</Demo>
  </div>
)
