import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from '../container'
import Link from '../link'
import Animate from '../animate'

const DialogWrapper = styled(Container)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 500;
  box-sizing: border-box;
  background: white;
`

const CloseButton = styled(Link)`
  position: absolute;
  top: 24px;
  right: 24px;
`

const Dialog = ({ children, onClose, isVisible }) => (
  <Animate type='fade' isVisible={isVisible}>
    <DialogWrapper>
      {onClose ? <CloseButton onClick={onClose}>Close</CloseButton> : null}
      {children}
    </DialogWrapper>
  </Animate>
)

Dialog.defaultProps = {
  backgroundColor: 'rgba(237,237,237,.8)'
}
Dialog.propTypes = {
  backgroundColor: PropTypes.string,
  onClose: PropTypes.func
}

export default Dialog
