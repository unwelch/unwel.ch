import styled from 'styled-components'
import { colors, fontSizes, lineHeights, fontWeights } from './variables'
import { breakpointToTextSize } from './text'
import { withBreakpoint } from './responsive-provider'

const Input = styled.input`
  background: ${colors.background};
  outline: none;
  border: none;
  border-radius: 0;
  font-family: inherit;
  line-height: inherit;
  cursor: pointer;
  color: ${colors.body};
  flex: 1;
  border-bottom: 2px solid ${colors.body};
  font-size: ${props =>
    fontSizes[breakpointToTextSize(props.size, props.breakpoint)]}px;
  line-height: ${props =>
    lineHeights[breakpointToTextSize(props.size, props.breakpoint)]}px;
  font-weight: ${props => fontWeights[props.fontWeight]};
  font-style: ${props => (props.italics ? 'italic' : 'inherit')};
  ${props => (props.fullWidth ? 'width: 100%' : '')};

  &::placeholder {
    color: ${colors.body};
    opacity: 0.2;
  }

  transition: border 0.2s ease;
  &:focus {
    border-bottom: 2px solid ${colors.primary};
  }
`

Input.defaultProps = {
  size: 'size0'
}

export default withBreakpoint(Input)
