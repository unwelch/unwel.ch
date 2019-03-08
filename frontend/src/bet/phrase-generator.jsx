import React from 'react'
import { toLower } from 'ramda'
import Text from 'components/text'

export const getIntroText = (
  currentUser,
  statementUser,
  accepter,
  quantity,
  statement,
  fontSize,
  t = a => a
) => {
  const isCreator = currentUser && currentUser.id === statementUser.id
  const subject = isCreator ? t('you') : statementUser.name

  return (
    <Text fontWeight="regular" size={fontSize}>
      {subject} {t('bet-phrase.verb')}{' '}
      <Text inline size={fontSize} fontWeight="black">
        {toLower(quantity)}
      </Text>{' '}
      {t('bet-phrase.preposition')}{' '}
      <Text inline size={fontSize} fontWeight="black" italics>
        {statement}
      </Text>
    </Text>
  )
}

export const getAccepterText = (
  currentUser,
  statementUser,
  accepter,
  target,
  quantity,
  statement,
  fontSize,
  t = a => a
) => {
  let text = ''
  if (!accepter) {
    if (target) {
      if (target.id === currentUser.id) {
        text = t('bet-status.waiting-for-you')
      } else {
        text = t('bet-status.waiting-for-target-opponent', {
          userName: target.name
        })
      }
    } else {
      text = t('bet-status.waiting-for-opponent')
    }
  } else {
    const isAccepter = currentUser && currentUser.id === accepter.id
    if (isAccepter) {
      text = t('bet-status.accepted-by-you')
    } else {
      text = t('bet-status.accepted-by-user', { user: accepter.name })
    }
  }

  return (
    <Text fontWeight="regular" size={fontSize}>
      {text}
    </Text>
  )
}
