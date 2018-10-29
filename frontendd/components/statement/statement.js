import React from 'react'
import PropTypes from 'prop-types'
import Text from '../text'
import { colors } from '../variables'

import styled from 'styled-components'

const StatementWrapper = styled.span`
  color: ${colors.primary};
`

const Statement = ({ betIntro, betStatement }) =>
  <div>
    <Text size='size5' fontWeight='bold'>
      {betIntro}
      <StatementWrapper>
        {betStatement}
      </StatementWrapper>
    </Text>
  </div>

Statement.propTypes = {
  betIntro: PropTypes.string,
  betStatement: PropTypes.string
}

export default Statement
