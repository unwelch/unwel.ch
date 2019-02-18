import React, { Component } from 'react'
import { keyframes } from 'styled-components'
import { colors } from 'components/variables'

const animationLength = 0.6
const nLetters = 7
const delay = 0.5

const totalLength = delay * nLetters

const animation = keyframes`
  0% {
    color: black;
    transform: translate(0%, 0%) scaleY(1);
  }
  ${(animationLength / totalLength) * 20}% {
    transform: translate(0%, 20%) scaleY(0.8);
    animation-timing-function: ease-in;
  }
  ${(animationLength / totalLength) * 25}% {
    transform: translate(0%, 0%) scaleY(1);
    animation-timing-function: ease-out;
  }
  ${(animationLength / totalLength) * 50}% {
    transform: translate(0%, -100%) scaleY(1.05);
    animation-timing-function: ease-in;
  }
  ${(animationLength / totalLength) * 75}% {
    transform: translate(0%, 0%) scaleY(1);
    animation-timing-function: ease-out;
    color: ${colors.body};
  }
  ${(animationLength / totalLength) * 80}% {
    color: ${colors.primary};
    transform: translate(0%, 20%) scaleY(0.8);
  }
  ${(animationLength / totalLength) * 100}% {
    transform: translate(0%, 0%) scaleY(1);
  }

  50% {
    transform: translate(0%, 0%) scaleY(1);
  }

  ${50 + (animationLength / totalLength) * 20}% {
    transform: translate(0%, 20%) scaleY(0.8);
    animation-timing-function: ease-in;
  }
  ${50 + (animationLength / totalLength) * 25}% {
    transform: translate(0%, 0%) scaleY(1);
    animation-timing-function: ease-out;
  }
  ${50 + (animationLength / totalLength) * 50}% {
    transform: translate(0%, -100%) scaleY(1.05);
    animation-timing-function: ease-in;
  }
  ${50 + (animationLength / totalLength) * 75}% {
    transform: translate(0%, 0%) scaleY(1);
    animation-timing-function: ease-out;
    color: ${colors.primary};
  }
  ${50 + (animationLength / totalLength) * 80}% {
    color: ${colors.body};
    transform: translate(0%, 20%) scaleY(0.8);
  }
  ${50 + (animationLength / totalLength) * 100}% {
    transform: translate(0%, 0%) scaleY(1);
  }

  100% {
    transform: translate(0%, 0%) scaleY(1);
  }
`

class Logo extends Component {
  render() {
    return (
      <svg
        width="154px"
        height="30px"
        viewBox="0 0 254 49"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}>
        <g fill="#000" fillRule="evenodd">
          <path
            style={{
              animation: `${animation} ${totalLength * 2}s ease ${delay *
                0}s infinite`
            }}
            d="M31.6 33c0 2.5-.4 4.6-1.2 6.6A14.6 14.6 0 0 1 16 48.8c-2.3 0-4.3-.4-6.3-1.2a14.4 14.4 0 0 1-8.2-8C.7 37.6.3 35.5.3 33V16h11v18c0 1.3.5 2.5 1.3 3.3 1 1 2 1.4 3.4 1.4a4.5 4.5 0 0 0 4.6-4.7V16h11v17z"
          />
          <path
            style={{
              animation: `${animation} ${totalLength * 2}s ease ${delay *
                1}s infinite`
            }}
            d="M57.6 15.2c1.9 0 3.6.3 5.1 1 1.5.6 2.8 1.5 3.8 2.6 1 1.2 1.9 2.5 2.5 4.1.5 1.6.8 3.4.8 5.4V48h-11V29.9c0-1.5-.4-2.6-1.3-3.5-.9-.8-2-1.2-3.3-1.2-1.4 0-2.5.4-3.4 1.2-.8.9-1.3 2-1.3 3.5V48h-11V16h10v2.6a13 13 0 0 1 9.1-3.4z"
          />
          <path
            style={{
              animation: `${animation} ${totalLength * 2}s ease ${delay *
                2}s infinite`
            }}
            d="M110 30.5l6.5-14.5H128l-15.7 32.8h-3.5l-8.2-15.3-8.1 15.3H89L73.3 16h11.6l6.6 15L99 15.2h3.5z"
          />
          <path
            style={{
              animation: `${animation} ${totalLength * 2}s ease ${delay *
                3}s infinite`
            }}
            d="M147.3 15.2c2.4 0 4.5.4 6.4 1.2a14.4 14.4 0 0 1 7.9 8.2c.7 1.8 1 3.8 1 5.8a22 22 0 0 1-.7 5.4h-20.5a5.8 5.8 0 0 0 2.8 2.8c1.2.6 2.7.9 4.4.9 1.6 0 3-.2 4.4-.7a18 18 0 0 0 4-1.8l4 7.5a20.7 20.7 0 0 1-25.7-.5 15.5 15.5 0 0 1-3.7-5.3c-1-2-1.4-4.3-1.4-6.7a16.8 16.8 0 0 1 5-12 16.8 16.8 0 0 1 12.1-4.8zM147 24c-1.4 0-2.6.4-3.6 1.2-1 .9-1.8 2-2.2 3.6h11.1c0-1.5-.6-2.7-1.7-3.5-1-.9-2.2-1.3-3.6-1.3z"
          />
          <path
            style={{
              animation: `${animation} ${totalLength * 2}s ease ${delay *
                4}s infinite`
            }}
            d="M179.2 48h-11V0h11z"
          />
          <path
            style={{
              animation: `${animation} ${totalLength * 2}s ease ${delay *
                5}s infinite`
            }}
            d="M202.2 15.2c3.4 0 6.3.8 8.8 2.4 2.4 1.5 4.3 3.6 5.6 6.2l-7.6 5.8c-.8-1.2-1.7-2.2-2.7-3a6 6 0 0 0-4-1.3 6 6 0 0 0-4.6 1.9A6.8 6.8 0 0 0 196 32c0 2 .6 3.6 1.7 4.8a6 6 0 0 0 4.7 1.9c1.6 0 2.9-.4 3.9-1.3 1-.8 1.9-1.8 2.7-3l7.6 5.8a15.2 15.2 0 0 1-14.4 8.6A18.3 18.3 0 0 1 190 44a16.8 16.8 0 0 1-5.1-12 16 16 0 0 1 5-12 18.3 18.3 0 0 1 12.4-4.8z"
          />
          <path
            style={{
              animation: `${animation} ${totalLength * 2}s ease ${delay *
                6}s infinite`
            }}
            d="M232.8 18.2a12 12 0 0 1 8.3-3c1.8 0 3.4.3 4.9 1a11 11 0 0 1 3.7 2.6 12 12 0 0 1 2.5 4.1c.6 1.6.9 3.4.9 5.4V48h-11V29.9c0-1.5-.5-2.6-1.4-3.5-.8-.8-2-1.2-3.3-1.2-1.4 0-2.5.4-3.3 1.2-.9.9-1.3 2-1.3 3.5V48h-11V0h11v18.2z"
          />
        </g>
      </svg>
    )
  }
}

export default Logo
