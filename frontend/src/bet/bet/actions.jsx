import React, { Component } from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-text-to-clipboard'
import ShareIcon from 'react-feather/dist/icons/share'
import TrashIcon from 'react-feather/dist/icons/trash-2'

import { betStatuses, getBetStatus } from '../bet-status'
import FinishBet from './finish-bet'
import { trackEvent, events } from '../../tracking'
import Button from 'components/button'
import Distribute from 'components/distribute'
import Text from 'components/text'
import { colors } from 'components/variables'

const BET_PAGE = `${window.location.origin}/bet`

const webShareEnabled = () => window.navigator.share

class Actions extends Component {
  static propTypes = {
    t: PropTypes.func,
    bet: PropTypes.object,
    currentUser: PropTypes.object,
    acceptBet: PropTypes.func,
    deleteBet: PropTypes.func,
    chooseLost: PropTypes.func,
    chooseWon: PropTypes.func,
    showAnnounce: PropTypes.func
  }

  componentDidMount() {
    trackEvent(events.pageLoaded, { page: 'bet' })
  }

  shareLink = (text, url) => {
    return () => {
      if (webShareEnabled()) {
        navigator
          .share({
            text,
            url
          })
          .then(() => console.log('Successful share'))
          .catch(error => console.log('Error sharing', error))
      } else {
        this.props.showAnnounce('announce.bet-url-copied')
        copy(url)
      }

      trackEvent(events.betLinkCopied, {
        betId: this.props.bet.id,
        isWebAPIShareSupported: !!webShareEnabled()
      })
    }
  }

  render() {
    const { bet, currentUser, t } = this.props
    const betStatus = getBetStatus(bet, currentUser)

    switch (betStatus) {
      case betStatuses.WAITING_FOR_OPONENT:
        return (
          <Distribute vertical space={2}>
            <Button
              type="level2"
              onClick={this.shareLink(
                t('copy-message.body', { statement: bet.statement.statement }),
                `${BET_PAGE}/${bet.id}`
              )}
              icon={<ShareIcon />}>
              {t(
                webShareEnabled() ? 'bet-actions.share' : 'bet-actions.copy-url'
              )}
            </Button>
            <Button
              type="warning"
              icon={<TrashIcon />}
              onClick={this.props.deleteBet}>
              {t('bet-actions.delete')}
            </Button>
          </Distribute>
        )
      case betStatuses.AVAILABLE_BET:
        if (
          bet.targetUser &&
          (!currentUser || bet.targetUser.id !== currentUser.id)
        ) {
          return null
        }

        return (
          <Button
            type="level2"
            onClick={this.props.acceptBet}
            dataQa="accept-bet-button">
            {t('bet-actions.accept-bet')}
          </Button>
        )
      case betStatuses.WAITING_FOR_USER_RESPONSE:
        return (
          <FinishBet
            bet={bet}
            currentUser={currentUser}
            chooseWon={this.props.chooseWon}
            chooseLost={this.props.chooseLost}
          />
        )
      case betStatuses.WAITING_FOR_OPONENT_RESPONSE:
        const opponent = bet.user.id === currentUser.id ? bet.user2 : bet.user

        return (
          <Text dimmed size="size2">
            {t('bet-status.waiting-for-opponent-response', {
              opponent: opponent.name
            })}
          </Text>
        )
      case betStatuses.LOST:
        return (
          <Text fontWeight="black" size="size2" data-qa="text-label-lost">
            {t('bet-status.lost.long')}
          </Text>
        )
      case betStatuses.WON:
        return (
          <Text
            fontWeight="black"
            color={colors.primary}
            size="size2"
            data-qa="text-label-won">
            {t('bet-status.won.long')}
          </Text>
        )
      case betStatuses.DISPUTED:
        return (
          <Text
            fontWeight="black"
            color={colors.error}
            size="size2"
            data-qa="text-label-disputed">
            {t('bet-status.dispute.long')}
          </Text>
        )
    }
  }
}

export default Actions
