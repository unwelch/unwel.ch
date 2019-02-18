import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import {
  fontSizes,
  lineHeights,
  fontMono,
  fontWeights,
  colors
} from '../variables'

const linkStyles = {
  withoutStyle: css`
    color: inherit;

    &:hover,
    &:visited,
    &:visited:hover,
    &:active {
      color: inherit;
    }
  `,
  withStyle: css`
    color: ${props => props.color};
    cursor: pointer;
    box-shadow: inset 0 -1px 0 0 ${props => props.color};

    &:hover,
    &:visited,
    &:visited:hover,
    &:active {
      color: ${props => props.color};
      box-shadow: inset 0 -1px 0 0 ${props => props.color};
    }
  `
}

const Link = styled.a`
  ${props =>
    props.size &&
    `
    font-size: ${fontSizes[props.size]}px;
    line-height: ${lineHeights[props.size]}px;
  `} ${props =>
  props.mono &&
  `
    font-family: ${fontMono};
  `} ${props =>
  props.fontWeight &&
  `
    font-weight: ${fontWeights[props.fontWeight]};
  `} ${props =>
  props.uppercase &&
  `
    text-transform: uppercase;
  `} ${props =>
  props.loose &&
  `
    letter-spacing: .1em;
  `} ${props =>
  props.dimmed &&
  `
    opacity: 0.6;
  `};
  ${props => (props.clear ? linkStyles.withoutStyle : linkStyles.withStyle)};
`

export const availableSizes = Object.keys(fontSizes)
export const availableFontWeights = Object.keys(fontWeights)

Link.propTypes = {
  size: PropTypes.oneOf(availableSizes),
  fontWeight: PropTypes.oneOf(availableFontWeights),
  mono: PropTypes.bool,
  uppercase: PropTypes.bool,
  loose: PropTypes.bool,
  color: PropTypes.string,
  dimmed: PropTypes.bool,
  clear: PropTypes.bool
}
Link.defaultProps = {
  color: colors.primary
}

export default Link
