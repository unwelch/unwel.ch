import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Animate from '../animate'

const placements = {
  'top-left': css`
    left: 0;
    bottom: 100%;
    ${props => `margin-bottom: ${props.space * 8}px`};
  `,
  'top-center': css`
    left: 50%;
    transform: translateX(-50%);
    bottom: 100%;
    ${props => `margin-bottom: ${props.space * 8}px`};
  `,
  'top-right': css`
    right: 0;
    bottom: 100%;
    ${props => `margin-bottom: ${props.space * 8}px`};
  `,
  'bottom-left': css`
    left: 0;
    top: 100%;
    ${props => `margin-top: ${props.space * 8}px`};
  `,
  'bottom-center': css`
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    ${props => `margin-top: ${props.space * 8}px`};
  `,
  'bottom-right': css`
    right: 0;
    top: 100%;
    ${props => `margin-top: ${props.space * 8}px`};
  `,
  'right-top': css`
    top: 0;
    left: 100%;
    ${props => `margin-left: ${props.space * 8}px`};
  `,
  'right-center': css`
    left: 100%;
    transform: translateY(-50%);
    top: 50%;
    ${props => `margin-left: ${props.space * 8}px`};
  `,
  'right-bottom': css`
    bottom: 0;
    left: 100%;
    ${props => `margin-left: ${props.space * 8}px`};
  `,
  'left-top': css`
    right: 100%;
    top: 0;
    ${props => `margin-right: ${props.space * 8}px`};
  `,
  'left-center': css`
    right: 100%;
    transform: translateY(-50%);
    top: 50%;
    ${props => `margin-right: ${props.space * 8}px`};
  `,
  'left-bottom': css`
    right: 100%;
    bottom: 0;
    ${props => `margin-right: ${props.space * 8}px`};
  `
}

const Wrapper = styled.div`
  position: relative;
  ${props => (props.triggerInline ? 'display: inline-block' : '')};
`
const Trigger = styled.div`
  cursor: pointer;
  user-select: none;
`
const Content = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 1200;
  ${props => placements[props.placement]};
`

class Popover extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }

    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    if (typeof window === 'undefined') return
    window.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') return
    window.removeEventListener('click', this.handleClickOutside)
  }

  toggleContent() {
    this.setState({ open: !this.state.open })
  }

  openContent() {
    this.setState({
      open: true
    })
  }

  closeContent() {
    this.setState({
      open: false
    })
  }

  handleClickOutside(evt) {
    if (ReactDOM.findDOMNode(this).contains(evt.target)) return // eslint-disable-line
    if (this.state.open) {
      this.closeContent()
    }
  }

  handleMouseLeave() {
    if (!this.props.openOnHover) {
      return
    }

    this.closeTimeout = setTimeout(() => {
      this.closeContent()
    }, 200)
  }

  handleMouseOver() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout)
    }
    if (this.props.openOnHover) {
      this.openContent()
    }
  }

  render() {
    const { triggerInline, openOnHover, ...rest } = this.props

    const ContentWrapper = this.props.animate ? Animate : 'div'

    const contentWrapperProps = this.props.animate
      ? { isVisible: true, type: 'fade' }
      : {}
    return (
      <Wrapper
        triggerInline={triggerInline}
        onMouseLeave={this.handleMouseLeave}
        onMouseOver={() => this.handleMouseOver()}
        {...rest}>
        <Trigger onClick={() => !openOnHover && this.toggleContent()}>
          {this.props.trigger}
        </Trigger>
        <ContentWrapper {...contentWrapperProps}>
          {this.state.open ? (
            <Content placement={this.props.placement} space={this.props.space}>
              {this.props.content}
            </Content>
          ) : null}
        </ContentWrapper>
      </Wrapper>
    )
  }
}

export const availablePlacements = Object.keys(placements)

Popover.propTypes = {
  triggerInline: PropTypes.bool,
  placement: PropTypes.oneOf(availablePlacements),
  trigger: PropTypes.node,
  content: PropTypes.node,
  animate: PropTypes.bool
}

Popover.defaultProps = {
  triggerInline: true,
  placement: 'bottom-left',
  animate: false
}

export default Popover
