import React from 'react'
import { storiesOf, action } from '@storybook/react'
import { withKnobs, boolean, select, text, color } from '@storybook/addon-knobs'
import Button, { availableSizes } from '.'
import Distribute from '../distribute'

const stories = storiesOf('Button', module)
stories.addDecorator(withKnobs)

stories.add('default', () => (
  <Distribute space={4} vertical>
    <Distribute space={2}>
      <Button type="level0" onClick={action('onClick')}>
        He has right
      </Button>

      <Button type="level1" onClick={action('onClick')}>
        I was right
      </Button>

      <Button type="level2" onClick={action('onClick')}>
        Damn, he has right
      </Button>

      <Button type="warning" onClick={action('onClick')}>
        Damn boy
      </Button>
    </Distribute>

    <div>
      <Button
        backgroundColor={color('backgroundColor')}
        contentColor={color('contentColor')}
        size={select('size', availableSizes, 'large')}
        fullWidth={boolean('fullWidth', false)}
        onClick={action('onClick')}
        disabled={boolean('disabled', false)}
        type={select(
          'type',
          ['level0', 'level1', 'level2', 'warning'],
          'level2'
        )}>
        {text('children', 'You were right')}
      </Button>
    </div>
  </Distribute>
))
