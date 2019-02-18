import PropTypes from 'prop-types'
import styled from 'styled-components'

const Spacer = styled.div`
  ${props =>
    !props.inner && props.top ? 'margin-top: ' + props.top * 8 + 'px' : ''};
  ${props =>
    !props.inner && props.right
      ? 'margin-right: ' + props.right * 8 + 'px'
      : ''};
  ${props =>
    !props.inner && props.bottom
      ? 'margin-bottom: ' + props.bottom * 8 + 'px'
      : ''};
  ${props =>
    !props.inner && props.left ? 'margin-left: ' + props.left * 8 + 'px' : ''};

  ${props =>
    props.inner && props.top ? 'padding-top: ' + props.top * 8 + 'px' : ''};
  ${props =>
    props.inner && props.right
      ? 'padding-right: ' + props.right * 8 + 'px'
      : ''};
  ${props =>
    props.inner && props.bottom
      ? 'padding-bottom: ' + props.bottom * 8 + 'px'
      : ''};
  ${props =>
    props.inner && props.left ? 'padding-left: ' + props.left * 8 + 'px' : ''};

  ${props => (props.inline ? 'display: inline-block' : '')};
`

Spacer.displayName = 'Spacer'

Spacer.propTypes = {
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  inline: PropTypes.bool,
  inner: PropTypes.bool
}

Spacer.defaultProps = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  inline: false
}

export default Spacer
