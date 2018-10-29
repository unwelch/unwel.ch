import styled from 'styled-components'
import PropTypes from 'prop-types'
import { widths, unit } from '../variables'

export const unitize = quantity => (quantity ? `${quantity * unit}px` : null)

const alignments = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end'
}

const splitItemWidths = {
  xsm: `width: ${widths.xsm * 8}px`,
  sm: `width: ${widths.sm * 8}px`,
  md: `width: ${widths.md * 8}px`,
  lg: `width: ${widths.lg * 8}px`,
  xlg: `width: ${widths.xlg * 8}px`,
  full: `width: 100%;`,
  remaining: `flex: 1;`,
}

const Split = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: ${props => (props.vertical ? 'column' : 'row')};
  ${props => props.align && `align-items: ${alignments[props.align]}`};
`
Split.displayName = 'Split'

export const SplitItem = styled.div`
  ${props => splitItemWidths[props.width]};
  min-width: 0;
  flex-shrink: 0;
  ${props => props.pad && `padding: ${unitize(props.pad)}`};
  ${props =>
    props.padX &&
    `padding-left: ${unitize(props.padX)}; padding-right: ${unitize(
      props.padX
    )}`};
  ${props =>
    props.padY &&
    `padding-top: ${unitize(props.padY)}; padding-bottom: ${unitize(
      props.padY
    )}`};
  ${props => props.padTop && `padding-top: ${unitize(props.padTop)}`};
  ${props => props.padBottom && `padding-bottom: ${unitize(props.padBottom)}`};
  ${props => props.padLeft && `padding-left: ${unitize(props.padLeft)}`};
  ${props => props.padRight && `padding-right: ${unitize(props.padRight)}`};
`
SplitItem.displayName = 'SplitItem'

export const availableWidths = Object.keys(splitItemWidths)
export const availableAlignments = Object.keys(alignments)

Split.propTypes = {
  width: PropTypes.oneOf(availableWidths),
  align: PropTypes.oneOf(availableAlignments),
  vertical: PropTypes.bool
}

export default Split
