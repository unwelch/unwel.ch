import React, { Component } from 'react'
import { compose, propEq, filter, length } from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import ListIcon from 'react-feather/dist/icons/list'
import UserIcon from 'react-feather/dist/icons/user'
import BellIcon from 'react-feather/dist/icons/bell'

import DefaultContainer from 'components/default-container'
import Text from 'components/text'
import { colors } from 'components/variables'

const QUERY = gql`
  query {
    currentUser {
      id
      name
    }

    notifications {
      id
      visited
      viewed
    }
  }
`

const Nav = styled.nav`
  height: 100%;
  width: 100%;
`

const Label = styled.div`
  transition: all 200ms ease;
  opacity: ${p => (p.selected ? 1 : 0)};
  height: ${p => (p.selected ? '18px' : 0)};
`

const IconWrapper = styled.div`
  position: relative;
  color: inherit;
  display: flex;
`

const List = styled.div`
  height: 54px;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  justify-content: space-between;
`

const ListItem = styled(({ vertical, ...rest }) => <Link {...rest} />)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 12px;

  color: ${p => (p.selected ? colors.primary : colors.body)};

  * + * {
    margin-left: ${p => (p.vertical ? '0' : '8px')};
  }

  flex-direction: ${p => (p.vertical ? 'column' : 'row')};
`

const NotificationsBadge = styled.div`
  color: #fff;
  position: absolute;
  right: -2px;
  top: -2px;
  background-color: #e63946;
  font-size: 10px;
  line-height: 16px;
  height: 15px;
  width: 15px;
  text-align: center;
  font-weight: 500;
  border-radius: 34px;
`

const Root = styled.div``

class Navigation extends Component {
  render () {
    const { verticalLabels } = this.props
    const { currentUser, loading, notifications } = this.props.data

    if (loading) return <div />
    if (!currentUser) return <div />

    const haveUnviewedNotifications = propEq('viewed', false)
    const unViewedNotifications =
      notifications && length(filter(haveUnviewedNotifications, notifications))

    return (
      <Root>
        <DefaultContainer>
          <Nav>
            <List>
              <ListItem
                to='/bets'
                selected={window.location.href.includes('bet')}
                onClick={this.props.onSelectLink}
                vertical={verticalLabels}
              >
                <IconWrapper>
                  <ListIcon />
                </IconWrapper>
                <Label selected={window.location.href.includes('bet')}>
                  <Text size='size0' fontWeight='regular'>
                    Bets
                  </Text>
                </Label>
              </ListItem>
              <ListItem
                to={`/profiles/${currentUser.id}`}
                selected={window.location.href.includes('profile')}
                onClick={this.props.onSelectLink}
                vertical={verticalLabels}
              >
                <IconWrapper>
                  <UserIcon />
                </IconWrapper>
                <Label selected={window.location.href.includes('profile')}>
                  <Text size='size0' fontWeight='regular'>
                    Profile
                  </Text>
                </Label>
              </ListItem>
              <ListItem
                to='/notifications'
                selected={window.location.href.includes('notifications')}
                onClick={this.props.onSelectLink}
                vertical={verticalLabels}
              >
                <IconWrapper>
                  <BellIcon />
                  {unViewedNotifications > 0 &&
                    <NotificationsBadge>
                      {unViewedNotifications}
                    </NotificationsBadge>}
                </IconWrapper>
                <Label
                  selected={window.location.href.includes('notifications')}
                >
                  <Text size='size0' fontWeight='regular'>
                    Notifications
                  </Text>
                </Label>
              </ListItem>
            </List>
          </Nav>
        </DefaultContainer>
      </Root>
    )
  }
}

export default compose(graphql(QUERY))(Navigation)
