import React from 'react'
import styled from 'styled-components'

import { colors } from 'components/variables'

const Root = styled.div`
  background: rgba(100, 100, 100, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  opacity: ${props => (props.isOpen ? '1' : '0')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1)
    ${props => (props.isOpen ? '0s' : '0.5s')};
`

const ModalWrapper = styled.div`
  padding: 16px;
  margin: 16px;
  background: ${colors.background};

  border-radius: 6px;
  box-shadow: 0px 4px 80px rgba(0, 0, 0, 0.35);

  opacity: ${props => (props.isOpen ? '1' : '0')};
  transform: translateY(${props => (props.isOpen ? '0' : '120')}px)
    scaleY(${props => (props.isOpen ? '1' : '1.6')});
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};

  transition: all ${props => (props.isOpen ? '0.35s' : '0.5s')}
    ${props =>
      props.isOpen
        ? 'cubic-bezier(0.55, 1.5, 0.55, 0.9)'
        : 'cubic-bezier(0.8, 0, 0.8, 0)'}
    ${props => (props.isOpen ? '0.1s' : '0s')};
`

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Modal = ({ children, onClose, isOpen }) => (
  <Root onClick={onClose} isOpen={isOpen}>
    <ModalWrapper isOpen={isOpen}>
      <ChildrenWrapper isOpen={isOpen}>{children}</ChildrenWrapper>
    </ModalWrapper>
  </Root>
)

Modal.displayName = 'Modal'

export default Modal
