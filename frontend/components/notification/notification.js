import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
  and,
  intersperse,
  startsWith,
  endsWith,
  split,
  compose,
  map,
  replace
} from 'ramda'

import Text from 'components/text'
import Avatar from 'components/avatar'
import Spacer from 'components/spacer'

import { colors } from 'components/variables'

import timeAgo from '../../src/utils/time-ago'

const ListItem = styled.div`
  min-height: 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  padding: 24px 0;
  overflow: hidden;

  border-bottom: 1px solid ${colors.grey3};

  background: ${props => (props.colored ? '#fdf7e8' : 'transparent')};
  opacity: ${props => (props.dimmed ? '0.5' : '1')};

  align-items: center;

  transition: background 3s cubic-bezier(1, -0.03, 0.88, 0.61);
`

class Notification extends Component {
  render () {
    const { id, sender, bet, message, viewed, visited, createdAt } = this.props

    const isHyperLinkFormat = and(startsWith('{{'), endsWith('}}'))
    const removeHyperLink = compose(
      replace(/{{/, ''),
      replace(/}}/, '')
    )

    const msg = split(' ', message)

    const generateLinks = word => {
      if (isHyperLinkFormat(word)) {
        return (
          <Link
            to={`bet/${bet.id}`}
            alt={bet.statement}
            children={removeHyperLink(word)}
            id={bet.id}
          />
        )
      }

      return word
    }

    const newMessage = map(generateLinks, msg)

    return (
      <ListItem
        key={id}
        onClick={this.props.onClick}
        colored={!viewed}
        dimmed={visited}
      >
        <br />
        <Avatar size={4} user={sender} />
        <Spacer left={1}>
          <Text size='size1'>{intersperse(' ', newMessage)}</Text>
          <Text size='size0' dimmed>
            {timeAgo(new Date(createdAt))}
          </Text>
        </Spacer>
      </ListItem>
    )
  }
}

export default Notification
