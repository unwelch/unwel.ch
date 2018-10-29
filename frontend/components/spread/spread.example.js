import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select, number } from '@storybook/addon-knobs'
import Text from '../text'
import Spread from '.'
import Button from '../button'
import Checkbox from '../checkbox'
import DemoBox from '../demos/demo-box'
import StoryDocs from '../demos/story-docs'

const docsUseCase = (
  <Spread align='center'>
    <div>Some text</div>
    <Checkbox type='toggle' />
  </Spread>
)

const docsUseCase2 = (
  <Spread align='center' space={4}>
    <Text ellipsis>
      Can a fish be depressed? This question has been floating around my head
      ever since I spent a night in a hotel across from an excruciatingly
      sad-looking Siamese fighting fish. His name was Bruce Lee, according to a
      sign beneath his little bowl. There we were trying to enjoy a
      complimentary bloody mary on the last day of our honeymoon and there was
      Bruce Lee, totally still, his lower fin grazing the clear faux rocks on
      the bottom of his home. When he did finally move, just slightly, I got the
      sense that he would prefer to be dead.
    </Text>
    <Button>Button</Button>
  </Spread>
)

const stories = storiesOf('Spread', module)
stories.addDecorator(withKnobs).add('default', () => (
  <StoryDocs
    docsUseCase={docsUseCase}
    docsUseCaseTitle2='Use space prop to make sure there is space between element in case one of them grows'
    docsUseCase2={docsUseCase2}
    useCaseTitle='Use Spread to push elements far apart from each other'
  >
    <DemoBox width='full' noBg>
      <Spread
        vertical={boolean('vertical', false)}
        align={select('align', ['start', 'center', 'end'], 'center')}
        space={number('space')}
      >
        <DemoBox size='lg' />
        <DemoBox size='md' />
      </Spread>
    </DemoBox>
  </StoryDocs>
))
