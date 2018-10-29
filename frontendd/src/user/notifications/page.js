import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { prop, map, compose, always } from 'ramda'

import { NOTIFICATIONS_QUERY } from './queries'
import {
  MARK_NOTIFICATIONS_VIEWED_MUTATION,
  MARK_NOTIFICATIONS_VISITED_MUTATION
} from './mutations'
import { goToPage } from './../../navigation/actions'

import Distribute from 'components/distribute'
import DefaultContainer from 'components/default-container'
import Split from 'components/split'
import Content from 'components/content'
import Placeholder from 'components/placeholder'
import Spacer from 'components/spacer'
import Text from 'components/text'
import Notification from 'components/notification'
import { colors } from 'components/variables'

import { trackEvent, events } from '../../tracking'

const List = styled.div`
  flex: 1;
`

const ListItem = styled.div`
  min-height: 40px;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  & + & {
    border-top: 1px solid #e6e6e6;
  }
`

const Root = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

class Notifications extends Component {
  componentDidMount () {
    trackEvent(events.pageLoaded, { page: 'notifications' })
  }

  renderPlaceholderItems () {
    return [1, 2].map(key => (
      <ListItem key={key}>
        <Placeholder fullWidth height={2} />
      </ListItem>
    ))
  }

  renderNotification (notifications) {
    return (
      notifications &&
      notifications.map(notification => (
        <Notification
          onClick={() => {
            this.props.markNotificationsAsVisited(notification.id)
            this.props.goToPage(`bet/${notification.bet.id}`)
          }}
          key={notification.id}
          id={notification.id}
          sender={notification.sender}
          message={notification.message}
          bet={notification.bet}
          viewed={notification.viewed}
          visited={notification.visited}
          createdAt={notification.createdAt}
        />
      ))
    )
  }

  componentDidUpdate () {
    const { data, markNotificationsAsViewed } = this.props
    if (!data.loading && data.notifications) {
      const notificationsId = data.notifications.map(prop('id'))
      markNotificationsAsViewed(notificationsId)
    }
  }

  render () {
    const { loading } = this.props.data
    const { notifications } = this.props.data

    let items = []
    if (loading) {
      items = this.renderPlaceholderItems()
    } else {
      items = this.renderNotification(notifications)
    }

    return (
      <Root>
        <DefaultContainer>
          <Spacer inner top={3} />
          <Text size='size3' fontWeight='light'>
            Notifications
          </Text>

          <Spacer inner top={3} />

          {items.length > 0 ? (
            <List>
              <Distribute vertical space={1}>
                {items}
              </Distribute>
            </List>
          ) : (
            <Text dimmed>You have no notifications</Text>
          )}
        </DefaultContainer>
      </Root>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      goToPage
    },
    dispatch
  )
}

export default compose(
  connect(
    always({}),
    mapDispatchToProps
  ),
  graphql(NOTIFICATIONS_QUERY, {
    options: () => {
      return {
        fetchPolicy: 'network-only'
      }
    }
  }),
  graphql(MARK_NOTIFICATIONS_VIEWED_MUTATION, {
    props: ({ mutate }) => ({
      markNotificationsAsViewed: ids => mutate({ variables: { ids } })
    }),
    options: () => ({
      refetchQueries: [
        {
          query: NOTIFICATIONS_QUERY
        }
      ]
    })
  }),
  graphql(MARK_NOTIFICATIONS_VISITED_MUTATION, {
    props: ({ mutate }) => ({
      markNotificationsAsVisited: id => mutate({ variables: { id } })
    }),
    options: () => ({
      refetchQueries: [
        {
          query: NOTIFICATIONS_QUERY
        }
      ]
    })
  })
)(Notifications)
