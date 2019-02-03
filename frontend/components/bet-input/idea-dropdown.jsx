import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import Text from '../text'

const fadeIn = keyframes`
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

const Root = styled.div`
  transition: all 0.3s ease;
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'auto' : 'none')};
  position: absolute;
  width: 100%;
  z-index: 1000;
`

const Dropdown = styled.div`
  border-radius: 0 0 8px 8px;
  box-shadow: 0 1px 3px rgba(60, 64, 67, 0.3),
    0 4px 8px 3px rgba(60, 64, 67, 0.15);
  background: white;
  padding: 8px;
  display: grid;
  grid-template-columns: ${props =>
    Array.from(Array(props.columns).keys())
      .map(() => '1fr')
      .join(' ')};
  grid-gap: 8px;
`

const Idea = styled.div`
  height: 64px;
  border-radius: 5px;
  background: #CCC;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
	padding 0 8px;
	cursor: pointer;
`

const IdeaDropdown = ({ onIdeaClick, ideas, visible, columns }) => {
  return (
    <Root visible={visible}>
      <Dropdown columns={columns}>
        {ideas.map(idea => (
          <Idea key={idea} onClick={onIdeaClick.bind(null, idea)}>
            <Text size="size3" textAlign="center" shortLineHeight>
              {idea}
            </Text>
          </Idea>
        ))}
      </Dropdown>
    </Root>
  )
}

IdeaDropdown.propTypes = {
  onIdeaClick: PropTypes.func,
  ideas: PropTypes.array.isRequired
}

IdeaDropdown.defaultProps = {
  onIdeaClick: () => {}
}

export default IdeaDropdown
