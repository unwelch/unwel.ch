import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontSizes, lineHeights, fontMono, fontWeights } from '../variables'
import { withBreakpoint } from '../responsive-provider'

export const availableTextSizes = [
  'size6',
  'size5',
  'size4',
  'size3',
  'size2',
  'size1',
  'size0',
  'sizeN1',
  'sizeN2'
]

export const breakpointToTextSize = (textSize = 'size0', breakpoint) => {
  const index = availableTextSizes.indexOf(textSize)
  const increment = breakpoint === 'sm' ? 1 : 0

  const newSize = Math.min(index + increment, availableTextSizes.length - 1)
  return availableTextSizes[newSize]
}

const Text = styled.div`
  ${props => (props.italics ? 'font-style: italic' : '')};
  ${props => (props.inline ? 'display: inline' : '')};
  ${props => (props.breakWord ? 'word-break: break-word' : '')};

  text-align: ${props => props.textAlign};

  ${props => props.size && `
    font-size: ${fontSizes[breakpointToTextSize(props.size, props.breakpoint)]}px;
    line-height: ${props.shortLineHeight ? fontSizes[breakpointToTextSize(props.size, props.breakpoint)] : lineHeights[breakpointToTextSize(props.size, props.breakpoint)]}px;
  `}; ${props => props.color && `
    color: ${props.color};
  `} ${props => props.mono && `
    font-family: ${fontMono};
  `} ${props => props.fontWeight && `
    font-weight: ${fontWeights[props.fontWeight]};
  `} ${props => props.uppercase && `
    text-transform: uppercase;
  `} ${props => props.loose && `
    letter-spacing: .1em;
  `} ${props => props.dimmed && `
    opacity: 0.6;
  `} ${props => props.capitalize && `
    &:first-letter{ text-transform: uppercase; }
  `}
  ${props => props.ellipsis && `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`};
`

Text.defaultProps = {
  size: 'size0',
  fontWeight: 'regular',
  textAlign: 'left'
}

Text.propTypes = {
  size: PropTypes.oneOf(Object.keys(fontSizes)),
  fontWeight: PropTypes.oneOf(Object.keys(fontWeights)),
  mono: PropTypes.bool,
  uppercase: PropTypes.bool,
  loose: PropTypes.bool,
  color: PropTypes.string,
  dimmed: PropTypes.bool,
  inline: PropTypes.bool,
  italics: PropTypes.bool,
  ellipsis: PropTypes.bool,
  capitalize: PropTypes.bool,
  breakWord: PropTypes.bool,
  shortLineHeight: PropTypes.bool,
  textAlign: PropTypes.string
}

export default withBreakpoint(Text)
