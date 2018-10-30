import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/button'
import Spacer from 'components/spacer'
import ShareIcon from 'react-feather/dist/icons/share'
import TrashIcon from 'react-feather/dist/icons/trash-2'

const ButtonContent = styled.div`
  margin-left: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SharingButtons = ({ copyLink, deleteBet }) => {
  return (
    <Fragment>
      <Button type='level2' onClick={copyLink}>
        <ButtonContent>
          <ShareIcon alt='Copy the URL' />
          <Spacer left={1}>
            Copy URL
          </Spacer>
        </ButtonContent>
      </Button>
      <Button type='warning' onClick={deleteBet}>
        <ButtonContent>
          <TrashIcon alt='Delete bet' />
          <Spacer left={1}>
            Delete
          </Spacer>
        </ButtonContent>
      </Button>
    </Fragment>
  )
}

SharingButtons.propTypes = {
  copyLink: PropTypes.func,
  deleteBet: PropTypes.func
}

export default SharingButtons
