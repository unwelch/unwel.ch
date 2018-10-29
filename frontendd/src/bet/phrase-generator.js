import React from 'react'
import { toLower } from 'ramda'
import Text from 'components/text'

export const getIntroText = (
  currentUser,
  statementUser,
  accepter,
  quantity,
  statement,
  fontSize
) => {
  const isCreator = currentUser && currentUser.id === statementUser.id
  const subject = isCreator ? 'You' : statementUser.name

  return (
    <Text fontWeight='regular' size={fontSize}>
      {subject} bet{' '}
      <Text inline size={fontSize} fontWeight='bold'>
        {toLower(quantity)}
      </Text>{' '}
      that{' '}
      <Text inline size={fontSize} fontWeight='bold' italics>
        {statement}
      </Text>
    </Text>
  )
}

export const getAccepterText = (
  currentUser,
  statementUser,
  accepter,
  quantity,
  statement,
  fontSize
) => {
  let text = ''
  if (!accepter) {
    text = 'No one accepted this bet yet'
  } else {
    const isAccepter = currentUser && currentUser.id === accepter.id
    if (isAccepter) {
      text = 'You accepted this bet'
    } else {
      text = `${accepter.name} accepted this bet`
    }
  }

  return (
    <Text fontWeight='light' size={fontSize}>
      {text}
    </Text>
  )
}

export const getStatementText = (currentUser, statementUser, statement) => {
  const isCreator = currentUser && currentUser.id === statementUser.id
  const subject = isCreator ? 'You' : statementUser.name

  return `${subject} said ${statement}`
}

export const getBetText = (currentUser, creator, accepter, quantity) => {
  const isCreator = currentUser && currentUser.id === creator.id

  if (accepter == null) {
    accepter = { name: 'someone' }
  }

  if (isCreator) {
    return `If you are wrong, you will give ${accepter.name} ${toLower(
      quantity
    )}. If you are right it will be the other way around.`
  } else {
    return `If ${creator.name} is wrong, ${
      creator.name
    } will give you ${toLower(quantity)}. If ${
      creator.name
    } is right it will be the other way around.`
  }
}
