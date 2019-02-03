import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import Content, { availableTypes } from '.'
import StoryDocs from '../demos/story-docs'
import { exampleText } from '../../utils'
import Spacer from '../spacer'

const docsUseCase = (
  <div>
    <Spacer bottom={1}>
      <Content type="title">{exampleText.title}</Content>
    </Spacer>

    <Spacer bottom={2}>
      <Content type="subtitle">{exampleText.short}</Content>
    </Spacer>

    <Spacer bottom={1}>
      <Content type="sectionTitle">{exampleText.title2}</Content>
    </Spacer>

    <Content type="body">{exampleText.long}</Content>
  </div>
)

const stories = storiesOf('App specific|Content', module)
stories.addDecorator(withKnobs).add('default', () => (
  <StoryDocs
    useCaseTitle="Use Content for specific type of text: title, subtitle, section title and body"
    docsUseCase={docsUseCase}>
    <Content type={select('type', availableTypes, 'body')}>
      {exampleText.long}
    </Content>
  </StoryDocs>
))
