import React from 'react'
import styled from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import FirstChild from '../first-child'

const fadeCSS = `
  .fade-enter {
    opacity: 0.01;
  }
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }
  .fade-leave {
    opacity: 1;
  }
  .fade-leave.fade-leave-active {
    opacity: 0.01;
    transition: opacity 200ms;
  }
`

const slideUpCSS = `
  .slideUp-enter {
    opacity: 0.01;
    transform: translateY(16px);
  }
  .slideUp-enter.slideUp-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 200ms cubic-bezier(0,0,0,1);
  }
  .slideUp-leave {
    opacity: 1;
    transform: translateY(0);
  }
  .slideUp-leave.slideUp-leave-active {
    opacity: 0.01;
    transition: all 200ms cubic-bezier(0,0,0,1);
  }
`

const Wrapper = styled.div`
  ${props => (props.type === 'fade' ? fadeCSS : '')};
  ${props => (props.type === 'slideUp' ? slideUpCSS : '')};

  /* to increase specificity we chain a selector with itself in order to
  override translation definition on each kind of animation */
  [class*='enter-active'][class*='enter-active'] {
    ${props => (props.delay ? `transition-delay: ${props.delay * 200}ms` : '')};
  }
`

const Animate = ({ isVisible, type, delay, children, dataQa, ...rest }) => (
  <Wrapper type={type} delay={delay} data-qa={dataQa} {...rest}>
    <ReactCSSTransitionGroup
      component={FirstChild}
      transitionName={type}
      transitionEnterTimeout={200 + delay * 200}
      transitionLeaveTimeout={200}
    >
      {isVisible ? children : null}
    </ReactCSSTransitionGroup>
  </Wrapper>
)

Animate.defaultProps = {
  delay: 0
}

export const availableTypes = ['fade', 'slideUp']
export default Animate
