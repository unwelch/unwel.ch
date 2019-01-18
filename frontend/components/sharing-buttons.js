import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/button'
import Spacer from 'components/spacer'
import Distribute from 'components/distribute'
import ShareIcon from 'react-feather/dist/icons/share'
import TrashIcon from 'react-feather/dist/icons/trash-2'

import { TranslatorConsumer } from '../src/translations'

const ButtonContent = styled.div`
  margin-left: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SharingButtons = ({ copyLink, deleteBet }) => {
  return (
    <TranslatorConsumer>
      {t => (
        <Distribute vertical space={2}>
          <Button type='level2' onClick={copyLink}>
            <ButtonContent>
              <ShareIcon alt={t('bet-actions.copy-url')} />
              <Spacer left={1}>{t('bet-actions.copy-url')}</Spacer>
            </ButtonContent>
          </Button>
          <Button type='warning' onClick={deleteBet}>
            <ButtonContent>
              <TrashIcon alt={t('bet-actions.delete')} />
              <Spacer left={1}>{t('bet-actions.delete')}</Spacer>
            </ButtonContent>
          </Button>
        </Distribute>
      )}
    </TranslatorConsumer>
  )
}

SharingButtons.propTypes = {
  copyLink: PropTypes.func,
  deleteBet: PropTypes.func
}

export default SharingButtons
