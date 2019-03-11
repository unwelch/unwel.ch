import React, { Fragment, Component } from 'react'
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
  padding: 0 16px;
  border-radius: 3px;
  height: 48px;
  display: flex;
  align-items: center;
`

class TargetButton extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)

    this.state = { showModal: false }
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  handleOpen() {
    this.setState({ showModal: true })
  }

  render() {
    const { currentUserId, targetUserId, onFriendSelect } = this.props

    if (!currentUserId) return null

    return (
      <TranslatorConsumer>
        {t => (
          <Fragment>
            <ChooseFriendModal
              userId={currentUserId}
              isOpen={this.state.showModal}
              onClose={this.handleClose}
              onFriendSelect={onFriendSelect}
            />
            <Root onClick={this.handleOpen}>
              <Query query={USER_QUERY} variables={{ userId: targetUserId }}>
                {({ loading, error, data }) => {
                  if (loading || error) {
                    return (
                      <Distribute align="center" position="end" space={1}>
                        <div>
                          <Text inline size="size1">
                            {t('versus') + ' '}
                          </Text>
                          <Text
                            inline
                            size="size1"
                            fontWeight="black"
                            data-qa="target-name">
                            {t('anyone')}
                          </Text>
                        </div>
                      </Distribute>
                    )
                  }
                  const user = data.user

                  return (
                    <Distribute align="center" position="end" space={1}>
                      <div>
                        <Text inline size="size1">
                          {t('versus') + ' '}
                        </Text>
                        <Text
                          inline
                          size="size1"
                          fontWeight="black"
                          data-qa="target-name">
                          {user.name}
                        </Text>
                      </div>
                      <Avatar size={4} user={user} />
                    </Distribute>
                  )
                }}
              </Query>
            </Root>
          </Fragment>
        )}
      </TranslatorConsumer>
    )
  }
}

export default TargetButton
