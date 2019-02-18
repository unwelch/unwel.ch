import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, boolean, color } from '@storybook/addon-knobs'
import { fontSizes, lineHeights, fontWeights, colors } from '../variables'
import Text from '.'
import Spacer from '../spacer'

const stories = storiesOf('Text', module)
stories.addDecorator(withKnobs)

stories.add('default', () => (
  <div>
    {Object.keys(fontSizes).map(size => (
      <Text size={size} key={size}>
        {fontSizes[size]}/{lineHeights[size]} — {size}
      </Text>
    ))}

    <Spacer bottom={4} />

    <Text size="sizeN1" uppercase fontWeight="black" loose>
      small caps
    </Text>

    <Spacer bottom={4} />

    <Text dimmed>Sample text</Text>

    <Spacer bottom={1} />

    <div style={{ maxWidth: 512 }}>
      <Text
        size={select('size', Object.keys(fontSizes), 'size0')}
        fontWeight={select('fontWeight', Object.keys(fontWeights), 'regular')}
        color={color('color', colors.body)}
        mono={boolean('mono', false)}
        uppercase={boolean('uppercase', false)}
        loose={boolean('loose', false)}
        dimmed={boolean('dimmed', false)}
        ellipsis={boolean('ellipsis', false)}>
        Can a fish be depressed? This question has been floating around my head
        ever since I spent a night in a hotel across from an excruciatingly
        sad-looking Siamese fighting fish. His name was Bruce Lee, according to
        a sign beneath his little bowl.
      </Text>
    </div>
  </div>
))
