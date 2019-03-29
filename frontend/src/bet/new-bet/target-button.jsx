import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Text from 'components/text'
import Avatar from 'components/avatar'
import Distribute from 'components/distribute'

import { colors } from 'components/variables'

import ChooseFriendModal from './choose-friend-modal'

import { TranslatorConsumer } from '../../translations'

export const USER_QUERY = gql`
  query($userId: String!) {
    user(id: $userId) {
      id
      name
      avatar
    }
  }
`

const Root = styled.div`
  background: ${colors.grey2};
  padding: 0 12px;
  border-radius: 3px;
  height: 40px;
  display: flex;
  align-items: center;
`

const TargetName = ({ user, t }) => (
  <Distribute align="center" position="end" space={1}>
    <div>
      <Text inline size="size1">
        {t('versus') + ' '}
      </Text>
      <Text
        inline
        size="size1"
        fontWeight="black"
        data-qa={user ? 'target-name' : 'target-anonymous'}>
        {user ? user.name : t('anyone')}
      </Text>
    </div>
    {user && <Avatar size={3} user={user} />}
  </Distribute>
)

const TargetButton = ({ currentUserId, targetUserId, onFriendSelect }) => {
  const [showModal, setShowModal] = useState(false)

  if (!currentUserId) return null

  return (
    <TranslatorConsumer>
      {t => (
        <Fragment>
          <ChooseFriendModal
            userId={currentUserId}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onFriendSelect={onFriendSelect}
          />
          <Root data-qa="target-button" onClick={() => setShowModal(true)}>
            {targetUserId == null && <TargetName t={t} />}
            {targetUserId != null && (
              <Query query={USER_QUERY} variables={{ userId: targetUserId }}>
                {({ loading, error, data }) => {
                  if (loading || error) {
                    return null
                  }
                  const user = data.user

                  return <TargetName t={t} user={user} />
                }}
              </Query>
            )}
          </Root>
        </Fragment>
      )}
    </TranslatorConsumer>
  )
}

export default TargetButton
