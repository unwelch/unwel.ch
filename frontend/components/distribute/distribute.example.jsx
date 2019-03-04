import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select, number } from '@storybook/addon-knobs'
import Text from '../text'
import Distribute from '.'

const stories = storiesOf('Distribute', module)
stories.addDecorator(withKnobs).add('default', () => (
  <Distribute
    vertical={boolean('vertical', false)}
    position={select('position', ['start', 'center', 'end'], 'start')}
    align={select('align', ['start', 'center', 'end'], 'center')}
    space={number('space', 1)}>
    <Text size="size2">A</Text>
    <Text size="size0">B</Text>
    <Text size="sizeN2">C</Text>
  </Distribute>
))
