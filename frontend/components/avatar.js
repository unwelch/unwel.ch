import React from 'react'
import styled from 'styled-components'
import Placeholder from 'components/placeholder'

import { unit, colors } from './variables'

const Image = styled.img`
  display: block;
  border: none;
  object-fit: cover;
  width: ${p => p.width * unit}px;
  height: ${p => p.height * unit}px;
  background: ${colors.grey1};
  border-radius: 50%;
`

const DefaultAvatar = styled.div`
  border: none;
  width: ${p => p.width * unit}px;
  height: ${p => p.height * unit}px;
  background: hsl(${props => props.hue}, 45%, 45%);
  color: white;
  font-size: ${p => p.width * unit / 1.5}px;
  line-height: ${p => p.width * unit / 1.5}px;
  font-weight: bold;
  display: flex;
  border-radius: 50%;
`

const Unknown = styled.div`
  width: ${p => p.width * unit}px;
  height: ${p => p.height * unit}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grey9};
  color: white;
  font-size: ${p => p.width * unit / 1.5}px;
  font-weight: 500;
  border-radius: 50%;
`

const hashCode = function (string) {
  let hash = 0
  let chr = ''
  if (string.length === 0) return hash
  for (let i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

const Letter = styled.span`
  align-self: center;
  width: 100%;
  text-align: center;
  margin-left: 1px;
  margin-top: 1px;
`

const Avatar = ({ placeholder, size = 8, user }) => {
  if (placeholder) {
    return <Placeholder shape='circle' width={size} height={size} />
  }

  if (!user) {
    return (
      <Unknown width={size} height={size}>
        ?
      </Unknown>
    )
  }

  if (!user.avatar) {
    return (
      <DefaultAvatar width={size} height={size} hue={hashCode(user.name) % 256}>
        <Letter>{user.name[0].toUpperCase()}</Letter>
      </DefaultAvatar>
    )
  }

  return <Image width={size} height={size} src={user.avatar} alt={user.name} />
}

Avatar.displayName = 'Avatar'

export default Avatar
