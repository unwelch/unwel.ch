import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Popover, { availablePlacements } from './popover'
import Card from 'components/card'
import Text from 'components/text'
import { colors, widths, unit } from 'components/variables'

const maxWidths = {
  md: `max-width: ${widths.md * unit}px;`,
  lg: `max-width: ${widths.lg * unit}px;`
}

const OptionsWrapper = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  min-width: ${widths.sm * unit}px;
  ${props => maxWidths[props.maxWidth]};
`
const Option = styled.div`
  padding: 6px 23px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grey1};
  }
`
const OptionsListGroup = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${colors.default};
    padding-bottom: 8px;
    margin-bottom: 8px;
  }
`

class PopoverMenu extends Component {
  render () {
    const { options, trigger, maxWidth, placement, space, ...rest } = this.props

    const renderBasicOption = (option, index) => (
      <Option
        onClick={() => {
          option.onClick && option.onClick()
          this.popover.closeContent()
        }}
        key={index}
        data-qa={option.dataQa}
        {...rest}
      >
        <Text color={option.color} ellipsis>
          {option.title}
        </Text>
      </Option>
    )

    const Options = options.map((option, index) => {
      if (option.options) {
        return (
          <OptionsListGroup key={index}>
            {option.options.map(renderBasicOption)}
          </OptionsListGroup>
        )
      }

      return renderBasicOption(option, index)
    })

    return (
      <Popover
        ref={el => (this.popover = el)}
        trigger={trigger}
        placement={placement}
        width='none'
        space={space}
        content={
          <Card shadow='shadow2' innerSpace='none'>
            <OptionsWrapper maxWidth={maxWidth}>{Options}</OptionsWrapper>
          </Card>
        }
      />
    )
  }
}

export const availableMaxWidths = Object.keys(maxWidths)
export const availablPlacements = availablePlacements

const option = PropTypes.shape({
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  dataQa: PropTypes.string,
  targetBlank: PropTypes.bool
})

const optionsGroup = PropTypes.shape({
  groupTitle: PropTypes.string,
  groupSubtitle: PropTypes.string,
  options: PropTypes.arrayOf(option)
})

PopoverMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([option, optionsGroup])),
  maxWidth: PropTypes.oneOf(availableMaxWidths),
  trigger: PropTypes.node,
  placement: PropTypes.oneOf(availablPlacements)
}

PopoverMenu.defaultProps = {
  maxWidth: 'md'
}

export default PopoverMenu
