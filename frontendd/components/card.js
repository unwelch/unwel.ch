import * as React from 'react'
import styled from 'styled-components'
import { colors, shadows } from './variables'

const CardWrapper = styled.div`
  background: white;
  box-shadow: ${shadows.shadow2};
  border-radius: 4px;
  ${props => (props.height ? `height: ${props.height}` : '')};
  ${props => (props.expanded ? `height: ${props.expandedHeight}` : '')};
  transition: 0.4s;
  display: flex;
  flex-direction: column;
`

export const CardHeader = styled.div`
  ${props => (props.expandible ? 'padding: 16px 32px' : '')};
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    height: 24px;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0));
    opacity: ${props => (props.expandible && props.expanded ? '1' : '0')};
    transform: ${props => (props.expandible && props.expanded ? 'scaleY(1)' : 'scaleY(0)')};
    transform-origin: top;
    transition: 0.4s;
    z-index: 1;
  }
`

const ExpandAction = styled.div`
  padding: 8px 32px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.grey5};
`

const ExpandActionsSection = styled.div`
  position: relative;
  cursor: pointer;
  flex-shrink: 0;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 100%;
    left: 0;
    height: 24px;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.03));
    opacity: 1;
    transition: 0.3s;
  }
`

const SIZES = {
  medium: '24px 32px',
  small: '12px 16px',
  none: '0px'
}

export const CardContent = styled.div`
  position: relative;
  flex-grow: 1;
  ${props => props => `padding ${SIZES[props.sizes]}`};
  ${props => (props.expandible && props.expanded ? 'overflow: auto;' : '')} ${props => (props.expandible && !props.expanded ? 'overflow: hidden;' : '')};
`

const Card = ({
  height,
  expandible,
  expanded,
  expandAction,
  collapseAction,
  headerContent,
  size,
  children,
  ...rest
}) => (
  <CardWrapper height={height} expanded={expanded} {...rest}>
    <CardHeader expanded={expanded} expandible={expandible}>
      {headerContent}
    </CardHeader>
    <CardContent expanded={expanded} expandible={expandible} size={size}>
      {children}
    </CardContent>
  </CardWrapper>
)

Card.defaultProps = {
  expanded: false,
  expandible: false,
  size: 'medium'
}

export default Card
