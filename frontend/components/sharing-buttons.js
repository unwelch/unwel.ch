import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/button'
import SendIcon from 'react-feather/dist/icons/send'
import MessageIcon from 'react-feather/dist/icons/message-circle'
import ShareIcon from 'react-feather/dist/icons/share'
import TrashIcon from 'react-feather/dist/icons/trash-2'

const SharingButtons = ({ text, copyLink, deleteBet }) => {
  return (
    <Fragment>
      <Button type='level2' onClick={copyLink}>
        <ShareIcon alt='Copy the URL' />
      </Button>
      <Button type='level2'>
        <a
          href={`whatsapp://send?text=${text}`}
          data-action='share/whatsapp/share'
        >
          <MessageIcon color='white' alt='Share via Whatsapp' />
        </a>
      </Button>

      <Button type='level2'>
        <a href={`tg://msg?text=${text}`}>
          <SendIcon color='white' alt='Share via Telegram' />
        </a>
      </Button>
      <Button type='warning' onClick={deleteBet}>
        <TrashIcon alt='Delete bet' />
      </Button>
    </Fragment>
  )
}

SharingButtons.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default SharingButtons
