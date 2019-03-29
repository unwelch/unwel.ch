import React, { Component } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Text from 'components/text'
import Spacer from 'components/spacer'
import Modal from 'components/modal'
import Avatar from 'components/avatar'
import { colors } from 'components/variables'

import { TranslatorConsumer } from '../../translations'

export const USER_FRIENDS_QUERY = gql`
  query($userId: String!) {
    user(id: $userId) {
      id
      friends {
        id
        name
        avatar
      }
    }
  }
`

const Root = styled.div`
  width: 60vw;
  max-width: 400px;
  max-height: 600px;
  height: 50vh;
  display: flex;
  flex-direction: column;
`

const FriendList = styled.div`
  flex: 1;
  overflow-y: auto;
  border-top: 1px solid ${colors.grey3};
`

const FriendWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid ${colors.grey3};
  height: 56px;
  padding: 0 16px;
`

class ChooseFriendModal extends Component {
  render() {
    const { userId, onFriendSelect, isOpen, onClose } = this.props

    return (
      <TranslatorConsumer>
        {t => (
          <Modal isOpen={isOpen} onClose={onClose} padding={0}>
            <Query query={USER_FRIENDS_QUERY} variables={{ userId }}>
              {({ loading, error, data }) => {
                if (loading) return null
                if (error) return null
                const user = data.user

                return (
                  <Root>
                    <FriendList>
                      <FriendWrapper onClick={() => onFriendSelect(null)}>
                        <Text size="size2" fontWeight="bold">
                          {t('anyone')}
                        </Text>
                      </FriendWrapper>
                      {user.friends.map(friend => (
                        <FriendWrapper
                          onClick={() => onFriendSelect(friend.id)}
                          key={friend.id}>
                          <Avatar size={4} user={friend} />
                          <Spacer left={2}>
                            <Text size="size2" fontWeight="bold">
                              {friend.name}
                            </Text>
                          </Spacer>
                        </FriendWrapper>
                      ))}
                    </FriendList>
                  </Root>
                )
              }}
            </Query>
          </Modal>
        )}
      </TranslatorConsumer>
    )
  }
}

export default ChooseFriendModal
