import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Waypoint from 'react-waypoint'

const up = css`
  transform: translateY(${p => (p.isVisible ? 0 : `-${p.distance}px`)});
`

const down = css`
  transform: translateY(${p => (p.isVisible ? 0 : `${p.distance}px`)});
`

const right = css`
  transform: translateX(${p => (p.isVisible ? 0 : `${p.distance}px`)});
`

const left = css`
  transform: translateX(${p => (p.isVisible ? 0 : `-${p.distance}px`)});
`

const Target = styled.div`
  ${p => p.direction === 'down' && down}
  ${p => p.direction === 'left' && left}
  ${p => p.direction === 'right' && right}
  ${p => p.direction === 'up' && up}

  opacity: ${p => (p.isVisible ? 1 : 0)};
  transition: transform 1s cubic-bezier(0, 0, 0.15, 1), opacity 1s ease;
`

class WaypointAnimate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isVisible: false
    }
  }

  static propTypes = {
    children: PropTypes.node,
    direction: PropTypes.string,
    distance: PropTypes.number,
    topOffset: PropTypes.string,
    bottomOffset: PropTypes.string
  }

  static defaultProps = {
    distance: 150,
    topOffset: '30%',
    bottomOffset: '30%'
  }

  handleEnter = () => {
    this.setState({ isVisible: true })
  }

  render () {
    const {
      children,
      direction,
      distance,
      topOffset,
      bottomOffset
    } = this.props
    return (
      <Waypoint
        onEnter={this.handleEnter}
        topOffset={topOffset}
        bottomOffset={bottomOffset}
      >
        <Target
          isVisible={this.state.isVisible}
          direction={direction}
          distance={distance}
        >
          {children}
        </Target>
      </Waypoint>
    )
  }
}

export default WaypointAnimate
