import React from "react";
import styled, { keyframes } from "styled-components";

import { colors } from "components/variables";

const appear = keyframes`
  0% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(0px);
  }
`;

const disolve = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

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
  animation: ${disolve} 1s ease;
`;

const ModalWrapper = styled.div`
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.background};

  animation: ${appear} 1s ease;
  border-radius: 6px;
  box-shadow: 0px 4px 80px rgba(0, 0, 0, 0.35);
`;

const Modal = ({ children, onClose }) => (
  <Root onClick={onClose}>
    <ModalWrapper>{children}</ModalWrapper>
  </Root>
);

Modal.displayName = "Modal";

export default Modal;
