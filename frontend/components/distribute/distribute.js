import styled from 'styled-components'
import PropTypes from 'prop-types'

const ALIGN = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end'
}

const Distribute = styled.div`
  display: flex;
  ${props => (props.align ? `align-items: ${ALIGN[props.align]}` : '')};
  ${props =>
    props.position ? `justify-content: ${ALIGN[props.position]}` : ''};

  & > * {
    flex: 0 0 auto;

    &:not(:last-child) {
      ${props =>
    props.vertical
      ? 'margin-bottom:' + props.space * 8 + 'px'
      : 'margin-right:' + props.space * 8 + 'px'};
    }
  }

  ${props => (props.vertical ? 'flex-direction: column' : '')};
  ${props => (props.flipped ? 'flex-direction: row-reverse' : '')};
`

Distribute.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  position: PropTypes.oneOf(['start', 'center', 'end']),
  vertical: PropTypes.bool,
  flipped: PropTypes.bool,
  space: PropTypes.number
}

Distribute.displayName = 'Distribute'

export default Distribute
