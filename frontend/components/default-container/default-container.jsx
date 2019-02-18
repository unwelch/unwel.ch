import styled from 'styled-components'

export default styled.div`
  flex: 1;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${props => (props.notPadded ? '0px' : '16px')};
  padding-right: ${props => (props.notPadded ? '0px' : '16px')};
`
