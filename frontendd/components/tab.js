import React from 'react'
import styled from 'styled-components'

const TabItem = styled.div`
  padding: 0 8px;
  border-bottom: ${p => (p.selected ? 2 : 0)}px solid black;
`

export const Tab = ({ title, selected, onClick }) => {
  return (
    <TabItem selected={selected} onClick={onClick}>
      {title}
    </TabItem>
  )
}

export const TabWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`
