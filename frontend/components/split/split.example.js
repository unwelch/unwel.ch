import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  select,
  boolean,
  number,
  text
} from '@storybook/addon-knobs'
import Split, {
  SplitItem,
  availableSplitWidths,
  availableSplitItemWidths,
  availableSplitItemHeights,
  availableAlignments
} from '.'
import DemoBox from '../demos/demo-box'
import StoryDocs from '../demos/story-docs'
import Text from '../text'
import { colors } from '../../variables'
import Container from '../container'

const docsUseCase = (
  <Split>
    <SplitItem width="remaining">
      <Container borderSide="all" padX={2} padY={1}>
        Content
      </Container>
    </SplitItem>
    <SplitItem width="remaining">
      <Container borderSide="all" padX={2} padY={1}>
        Content
      </Container>
    </SplitItem>
    <SplitItem width="remaining">
      <Container borderSide="all" padX={2} padY={1}>
        Content
      </Container>
    </SplitItem>
  </Split>
)

const docsUseCase2 = (
  <Split>
    <SplitItem>
      <Container padRight={2} borderSide="right" borderColor={colors.grey4}>
        Content
      </Container>
    </SplitItem>
    <SplitItem padLeft={2} width="remaining">
      Content
    </SplitItem>
  </Split>
)

const docsUseCase3 = (
  <Split align="center">
    <SplitItem padRight={2}>
      <Container
        backgroundColor={colors.grey1}
        borderColor={colors.grey2}
        borderSide="all"
        width="xsm"
        height="xsm"
      />
    </SplitItem>
    <SplitItem width="remaining">
      <Container borderSide="all" pad={1}>
        <Text ellipsis>
          Can a fish be depressed? This question has been floating around my
          head ever since I spent a night in a hotel across from an
          excruciatingly sad-looking Siamese fighting fish. His name was Bruce
          Lee, according to a sign beneath his little bowl. There we were trying
          to enjoy a complimentary bloody mary on the last day of our honeymoon
          and there was Bruce Lee, totally still, his lower fin grazing the
          clear faux rocks on the bottom of his home. When he did finally move,
          just slightly, I got the sense that he would prefer to be dead.
        </Text>
      </Container>
    </SplitItem>
  </Split>
)

const docsUseCase4 = (
  <Split>
    <SplitItem width="sm">
      <Container borderSide="all" padX={2} padY={1} height="full">
        Content
      </Container>
    </SplitItem>
    <SplitItem width="remaining">
      <Split vertical>
        <SplitItem>
          <Container borderSide="all" padX={2} padY={1}>
            Content
          </Container>
        </SplitItem>
        <SplitItem>
          <Container borderSide="all" padX={2} padY={1}>
            Content
          </Container>
        </SplitItem>
      </Split>
    </SplitItem>
  </Split>
)

const availableSplitItemWidthsWithString = [
  '',
  ...availableSplitItemWidths,
  '160px'
]
const availableSplitItemHeightsWithString = [
  '',
  ...availableSplitItemHeights,
  '160px'
]
const availableSplitWidthsWithString = ['', ...availableSplitWidths, '560px']

const stories = storiesOf('Split', module)
stories.addDecorator(withKnobs).add('default', () => (
  <StoryDocs
    docsUseCaseTitle="Any number of columns each taking the same amount of space"
    docsUseCase={docsUseCase}
    docsUseCaseTitle2="One fixed sized column wirh another one that takes the remaining space"
    docsUseCase2={docsUseCase2}
    docsUseCaseTitle3="An element and text with ellipsis"
    docsUseCase3={docsUseCase3}
    useCaseTitle="Use Split with SplitItem to build layouts"
    docsUseCase4={docsUseCase4}>
    <DemoBox width="full" noBg>
      <Split
        width={select('width(Split)', availableSplitWidthsWithString, 'full')}
        height={text('height(Split)')}
        align={select('align', availableAlignments, 'center')}
        vertical={boolean('vertical')}>
        <SplitItem
          padX={number('padX(SplitItem1)')}
          padY={number('padY(SplitItem1)')}
          padTop={number('padTop(SplitItem1)')}
          padBottom={number('padBottom(SplitItem1)')}
          padLeft={number('padLeft(SplitItem1)')}
          padRight={number('padRight(SplitItem1)')}
          width={select(
            'width(SplitItem1)',
            availableSplitItemWidthsWithString,
            'md'
          )}
          height={select(
            'height(SplitItem1)',
            availableSplitItemHeightsWithString,
            'md'
          )}>
          <DemoBox width="full">
            SplitItem 1 -
            <br />
            with more content
          </DemoBox>
        </SplitItem>
        <SplitItem
          width={select(
            'width(SplitItem2)',
            availableSplitItemWidthsWithString,
            'remaining'
          )}>
          <DemoBox width="full">SplitItem 2</DemoBox>
        </SplitItem>
      </Split>
    </DemoBox>
  </StoryDocs>
))
