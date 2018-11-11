import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Distribute from 'components/distribute'
import Text from 'components/text'
import styled from 'styled-components'

const LogoWrapper = styled(Distribute)`
  font-weight: 800;
  font-size: 24px;
  margin-top: 2px;
  display: flex;
  align-items: center;
`

class Logo extends Component {
  static propTypes = {
    color: PropTypes.string
  }

  static defaultProps = {
    color: 'black'
  }

  componentDidMount () {
    this.interval = setInterval(() => this.forceUpdate(), 2000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <LogoWrapper space={1}>
        <Text
          color={this.props.color}
          size='size4'
          fontWeight='black'
          inline
          shortLineHeight
        >
          unwelch
        </Text>
      </LogoWrapper>
    )
  }
}

export default Logo
