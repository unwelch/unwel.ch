import styled from 'styled-components'
import PropTypes from 'prop-types'

import { unit } from '../variables'

const ALIGN = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end'
}

const Spread = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${props => ALIGN[props.align]};
  ${props => (props.vertical ? 'height: 100%' : '')};
  ${props => (props.vertical ? 'flex-direction: column' : '')};

  & > *:not(:last-child) {
    ${props => (props.space ? `margin-right: ${props.space * unit}px` : '')};
  }
`
Spread.displayName = 'Spread'
Spread.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  vertical: PropTypes.bool,
  space: PropTypes.number
}
Spread.defaultProps = {
  align: 'start'
}
export default Spread
