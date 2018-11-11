import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Color from 'color'
import variables from '../variables'

const buttonTypes = {
  level0: {
    backgroundColor: variables.colors.grey2,
    contentColor: variables.colors.body
  },
  level1: {
    backgroundColor: variables.colors.body,
    contentColor: variables.colors.white
  },
  level2: {
    backgroundColor: variables.colors.primary,
    contentColor: variables.colors.white
  },
  warning: {
    backgroundColor: variables.colors.error,
    contentColor: variables.colors.white
  },
  inverted: {
    backgroundColor: variables.colors.white,
    contentColor: variables.colors.body
  }
}

const buttonSmall = css`
  padding: 8px 16px;
  font-size: ${variables.fontSizes.size0}px;
  line-height: ${variables.lineHeights.sizeN1}px;
`
const buttonMedium = css`
  padding: 8px 24px;
  font-size: ${variables.fontSizes.size1}px;
  line-height: ${variables.lineHeights.size1}px;
`
const buttonLarge = css`
  padding: 8px 32px;
  font-size: ${variables.fontSizes.size2}px;
  line-height: ${variables.lineHeights.size2}px;
`

const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.contentColor};
  font-family: inherit;
  border: 0;
  transition: 0.4s;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 600;
  border-radius: 3px;

  ${props => (props.size === 'small' ? buttonSmall : '')};
  ${props => (props.size === 'medium' ? buttonMedium : '')};
  ${props => (props.size === 'large' ? buttonLarge : '')};

  ${props => (props.fullWidth ? 'width: 100%' : '')};

  &:hover {
    background-color: ${props => (props.backgroundColor ? Color(
        props.backgroundColor
      )
        .mix(Color('black'), 0.1)
        .toString() : 'transparent')};
    transition: 0.2s;
  }

  &:active {
    background-color: ${props => (props.backgroundColor ? Color(
        props.backgroundColor
      )
        .mix(Color('black'), 0.05)
        .toString() : 'transparent')};
    transition: 0.2s;
  }

  &:focus {
    background-color: ${props => (props.backgroundColor ? Color(
        props.backgroundColor
      )
        .mix(Color('black'), 0.1)
        .toString() : 'transparent')};
    transition: 0.2s;
    outline: 0;
  }

  ${props => (props.disabled ? `background-color: ${variables.colors.grey2}; color: ${variables.colors.grey5}; pointer-events: none` : '')};
`
ButtonWrapper.displayName = 'ButtonWrapper'

export const availableSizes = ['large', 'medium', 'small']

const Button = ({
  type,
  size,
  contentColor = buttonTypes[type].contentColor,
  backgroundColor = buttonTypes[type].backgroundColor,
  fullWidth,
  children,
  disabled,
  onClick,
  dataQa
}) => {
  return (
    <ButtonWrapper
      data-qa={dataQa}
      size={size}
      contentColor={contentColor}
      backgroundColor={backgroundColor}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonWrapper>
  )
}

Button.propTypes = {
  size: PropTypes.oneOf(availableSizes),
  contentColor: PropTypes.string,
  dataQa: PropTypes.string,
  backgroundColor: PropTypes.string,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(buttonTypes)),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
}

Button.defaultProps = {
  size: 'medium',
  fullWidth: false,
  type: 'level0',
  disabled: false,
  onClick: () => {}
}

export default Button
