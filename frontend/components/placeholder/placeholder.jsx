import PropTypes from 'prop-types'
import styled from 'styled-components'

import { unit, colors } from '../variables'

const shapeToBorderRadius = shape => {
  switch (shape) {
    case 'circle':
      return '0'
    case 'square':
      return '0'
  }
}

const Placeholder = styled.div`
  height: ${p => p.height * unit}px;
  width: ${p => p.width * unit}px;
  background: ${colors.grey2};
  border-radius: ${p => shapeToBorderRadius(p.shape)};
  ${p => p.fullWidth && 'width: 100%'};
`

Placeholder.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  shape: PropTypes.oneOf(['circle', 'square']),
  fullWidth: PropTypes.bool
}

Placeholder.defaultProps = {
  width: 2,
  height: 2,
  shape: 'square'
}

export default Placeholder
