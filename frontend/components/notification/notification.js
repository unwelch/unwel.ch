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

import timeAgo from '../../src/utils/time-ago'

const ListItem = styled.div`
  min-height: 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  cursor: pointer;

  overflow: hidden;

  background: ${props => (props.colored ? '#fdf7e8' : 'transparent')};
  opacity: ${props => (props.dimmed ? '0.5' : '1')};

  align-items: center;

  transition: background 3s cubic-bezier(1, -0.03, 0.88, 0.61);

  padding: 16px 0px;
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
          <Link to={`bet/${bet.id}`} alt={bet.statement} id={bet.id}>
            {removeHyperLink(word)}
          </Link>
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
        <Spacer left={2}>
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
