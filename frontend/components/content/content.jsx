import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { fontSizes, lineHeights, fontWeights, colors } from '../variables'

const types = {
  title: css`
    font-size: ${fontSizes['size5']}px;
    line-height: ${lineHeights['size5']}px;

    @media (min-width: 425px) {
      font-size: ${fontSizes['size6']}px;
      line-height: ${lineHeights['size6']}px;
    }
  `,
  subtitle: css`
    font-size: ${fontSizes['size2']}px;
    line-height: ${lineHeights['size2']}px;

    @media (min-width: 425px) {
      font-size: ${fontSizes['size3']}px;
      line-height: ${lineHeights['size3']}px;
    }
  `,
  heading: css`
    font-size: ${fontSizes['size1']}px;
    line-height: ${lineHeights['size1']}px;
  `,
  body: css`
    font-size: ${fontSizes['size0']}px;
    line-height: ${lineHeights['size0']}px;
  `,
  hint: css`
    font-size: ${fontSizes['size0']}px;
    line-height: ${lineHeights['size0']}px;
    opacity: 0.7;
  `
}

const Content = styled.div`
  color: ${props => props.color};
  font-weight: ${props => fontWeights[props.fontWeight]};
  ${props => types[props.type]};
  ${props => (props.align ? `text-align: ${props.align};` : '')}
`

export const availableTypes = Object.keys(types)

Content.propTypes = {
  align: PropTypes.string,
  fontWeight: PropTypes.oneOf(Object.keys(fontWeights)),
  type: PropTypes.oneOf(availableTypes),
  color: PropTypes.string
}

Content.defaultProps = {
  color: colors.body,
  fontWeight: 'regular',
  type: 'body'
}

export default Content
