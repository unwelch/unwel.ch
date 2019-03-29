import React, { Fragment } from 'react'

import styled from 'styled-components'
import { range } from 'ramda'

import Content from 'components/content'
import Spacer from 'components/spacer'
import Button from 'components/button'
import { colors } from 'components/variables'

import ListItem from './bet-list-item'
import { TranslatorConsumer } from '../../translations'

const ListWrapper = styled.div`
  border-top: 1px solid ${colors.grey3};
`

const PlaceholderItems = ({ n }) => {
  return (
    <Fragment>
      {range(0, n).map(i => (
        <ListItem key={i} placeholder />
      ))}
    </Fragment>
  )
}

const EmptyState = () => (
  <TranslatorConsumer>
    {t => (
      <div>
        <Spacer bottom={2} />
        <Content type="subtitle" fontWeight="regular">
          {t('bet-list.empty.title')}
        </Content>
        <Spacer bottom={3} />
        <Button type="level2" onClick={() => this.props.goToPage(`/bets/new`)}>
          {t('create-a-bet')}
        </Button>
      </div>
    )}
  </TranslatorConsumer>
)

export default ({ bets = [], placeholders, onBetClick, currentUser }) => {
  if (placeholders) {
    return (
      <ListWrapper>
        <PlaceholderItems n={3} />
      </ListWrapper>
    )
  }

  if (bets.length === 0) {
    return (
      <ListWrapper>
        <EmptyState />
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      {bets.map(bet => (
        <ListItem
          key={bet.id}
          id={bet.id}
          bet={bet}
          currentUser={currentUser}
          onClick={() => onBetClick(bet.id)}
        />
      ))}
    </ListWrapper>
  )
}
