import React from 'react'
import PropTypes from 'prop-types'
import Popover, { availablePlacements } from './popover'
import Card from './../card'
import styled from 'styled-components'
import { widths, unit } from './../variables'

const cardWidths = {
  md: `width: ${widths.md * unit}px;`,
  lg: `width: ${widths.lg * unit}px;`,
  none: `width: initial;`
}

const CardWrapper = styled.div`
  ${props => cardWidths[props.width]};
`

const PopoverCard = ({
  trigger,
  placement,
  width,
  children,
  openOnHover,
  space
}) => (
  <Popover
    trigger={trigger}
    openOnHover={openOnHover}
    space={space}
    animate={openOnHover}
    content={
      <CardWrapper width={width}>
        <Card size='none'>{children}</Card>
      </CardWrapper>
    }
    placement={placement}
  />
)

export const availableCardPlacements = availablePlacements
export const availableWidths = Object.keys(cardWidths)

PopoverCard.propTypes = {
  placement: PropTypes.oneOf(availableCardPlacements),
  width: PropTypes.oneOf(availableWidths)
}

PopoverCard.defaultProps = {
  width: 'md'
}

export default PopoverCard
