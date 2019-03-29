import React, { Component } from 'react'
import styled from 'styled-components'

import Text from 'components/text'

import { trackEvent, events } from './tracking'

const Root = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

class NotFound extends Component {
  componentDidMount() {
    trackEvent(events.pageLoaded, { page: 'notFound' })
  }

  render() {
    return (
      <Root>
        <Text size="size6" fontWeight="black">
          404
        </Text>
        <Text size="size2" fontWeight="regular">
          Not found
        </Text>
      </Root>
    )
  }
}

export default NotFound
