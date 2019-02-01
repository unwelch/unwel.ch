import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import copy from 'copy-text-to-clipboard'
import { graphql } from 'react-apollo'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ShareIcon from 'react-feather/dist/icons/share'
import TrashIcon from 'react-feather/dist/icons/trash-2'

import { saveTempAccept } from '../services'
import {
  ACCEPT_BET_MUTATION,
  CHOOSE_WINNER_MUTATION,
  DELETE_BET_MUTATION
} from './../mutations'
import * as queries from './queries'
import { BET_LIST } from '../bet-list/queries'
import { showAnnounce } from '../../announce/actions'
import { betStatuses, getBetStatus } from '../bet-status'
import { getIntroText, getAccepterText } from '../phrase-generator'
import FinishBet from './finish-bet'
import { trackEvent, events } from '../../tracking'
import withNavigation from '../../navigation/withNavigate'

import { TranslatorConsumer } from '../../translations'

import Button from 'components/button'
import DefaultContainer from 'components/default-container'
import Distribute from 'components/distribute'
import Avatar from 'components/avatar'
import Text from 'components/text'
import Spacer from 'components/spacer'
import Placeholder from 'components/placeholder'
import { colors } from 'components/variables'

const BET_PAGE = `${window.location.origin}/bet`

const webShareEnabled = () => window.navigator.share

class BetPage extends Component {
  constructor (props) {
    super(props)

    this.acceptBet = this.acceptBet.bind(this)
    this.deleteBet = this.deleteBet.bind(this)
    this.shareLink = this.shareLink.bind(this)
    this.chooseWon = this.chooseWon.bind(this)
    this.chooseLost = this.chooseLost.bind(this)
  }

  componentDidMount () {
    trackEvent(events.pageLoaded, { page: 'bet' })
  }

  shareLink (title, text, url) {
    return () => {
      if (webShareEnabled()) {
        navigator
          .share({
            title,
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
        betId: this.props.betId,
        isWebAPIShareSupported: !!webShareEnabled()
      })
    }
  }

  acceptBet () {
    const { currentUser } = this.props.data
    trackEvent(events.acceptBetClick, { betId: this.props.betId })

    if (currentUser) {
      this.props.acceptBet(this.props.betId)
      this.props.showAnnounce('announce.bet-accepted')
      trackEvent(events.betAccepted, { betId: this.props.betId })
    } else {
      saveTempAccept(this.props.betId)
      this.props.goToPage('/anonymous-login')
    }
  }

  chooseWon () {
    this.props.chooseWinner(this.props.betId, true)
    this.props.showAnnounce('announce.bet-marked-won')
  }

  chooseLost () {
    this.props.chooseWinner(this.props.betId, false)
    this.props.showAnnounce('announce.bet-marked-lost')
  }

  deleteBet () {
    if (window.confirm('Are you sure you want to delete this bet?')) {
      this.props.deleteBet(this.props.betId)
      trackEvent(events.betDeleted, { betId: this.props.betId })
      this.props.goToPage('/bets')
    }
  }

  renderActions (t) {
    const { currentUser, bet } = this.props.data

    const betStatus = getBetStatus(bet, currentUser)

    switch (betStatus) {
      case betStatuses.WAITING_FOR_OPONENT:
        return (
          <Distribute vertical space={2}>
            <Button
              type='level2'
              onClick={this.shareLink(
                t('copy-message.body'),
                t('copy-message.title'),
                `${BET_PAGE}/${this.props.betId}`
              )}
              icon={<ShareIcon />}
            >
              {t(
                webShareEnabled() ? 'bet-actions.share' : 'bet-actions.copy-url'
              )}
            </Button>
            <Button
              type='warning'
              icon={<TrashIcon />}
              onClick={this.deleteBet}
            >
              {t('bet-actions.delete')}
            </Button>
          </Distribute>
        )
      case betStatuses.AVAILABLE_BET:
        return (
          <Button
            type='level2'
            onClick={this.acceptBet}
            dataQa='accept-bet-button'
          >
            {t('bet-actions.accept-bet')}
          </Button>
        )
      case betStatuses.WAITING_FOR_USER_RESPONSE:
        return (
          <FinishBet
            bet={bet}
            currentUser={currentUser}
            chooseWon={this.chooseWon}
            chooseLost={this.chooseLost}
          />
        )
      case betStatuses.WAITING_FOR_OPONENT_RESPONSE:
        const opponent = bet.user.id === currentUser.id ? bet.user2 : bet.user

        return (
          <Text dimmed size='size2'>
            {t('bet-status.waiting-for-opponent-response', {
              opponent: opponent.name
            })}
          </Text>
        )
      case betStatuses.LOST:
        return (
          <Text fontWeight='black' size='size2'>
            {t('bet-status.lost.long')}
          </Text>
        )
      case betStatuses.WON:
        return (
          <Text fontWeight='black' color={colors.primary} size='size2'>
            {t('bet-status.won.long')}
          </Text>
        )
      case betStatuses.DISPUTED:
        return (
          <Text fontWeight='black' color={colors.error} size='size2'>
            {t('bet-status.dispute.long')}
          </Text>
        )
    }
  }

  render () {
    const { bet, currentUser, loading } = this.props.data

    if (loading) {
      return (
        <DefaultContainer>
          <Distribute space={2}>
            <Avatar placeholder />
          </Distribute>
          <Spacer top={4} bottom={2}>
            <Spacer bottom={1 / 2}>
              <Spacer bottom={2}>
                <Placeholder width={10} height={2} />
              </Spacer>
              <Placeholder width={20} height={4} />
            </Spacer>
          </Spacer>
        </DefaultContainer>
      )
    }

    if (!bet) {
      return (
        <TranslatorConsumer>
          {t => (
            <DefaultContainer data-qa='bet-page'>
              <Spacer inner top={6} />
              <Text size='size3' textAlign='center'>
                {t('bet-404')}
              </Text>
            </DefaultContainer>
          )}
        </TranslatorConsumer>
      )
    }

    const isCurrentUserTheCreator =
      currentUser && bet.user.id === currentUser.id
    const betStatus = getBetStatus(bet, currentUser)
    const canEditBet = betStatus === betStatuses.WAITING_FOR_OPONENT

    return (
      <TranslatorConsumer>
        {t => (
          <DefaultContainer data-qa='bet-page'>
            <Spacer inner top={6} />
            <Distribute space={1} align='center'>
              <Link to={`/profiles/${bet.user.id}`}>
                <Avatar user={bet.user} />
              </Link>
              <Text size='size4' fontWeight='black' italics>
                vs
              </Text>
              {bet.user2 ? (
                <Link to={`/profiles/${bet.user2.id}`}>
                  <Avatar user={bet.user2} />
                </Link>
              ) : (
                <Avatar unknown />
              )}
            </Distribute>

            <Spacer top={3} />

            {getIntroText(
              currentUser,
              bet.statement.user,
              bet.user2,
              bet.quantity,
              bet.statement.statement,
              'size3',
              t
            )}

            <Spacer top={3} />

            {getAccepterText(
              currentUser,
              bet.statement.user,
              bet.user2,
              bet.quantity,
              bet.statement.statement,
              'size2',
              t
            )}
            <Spacer top={4} />

            {isCurrentUserTheCreator && canEditBet ? (
              <Link to={`/bet/${bet.id}/edit`} />
            ) : null}

            <Spacer bottom={20}>{this.renderActions(t)}</Spacer>
          </DefaultContainer>
        )}
      </TranslatorConsumer>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showAnnounce
    },
    dispatch
  )
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withNavigation,
  graphql(queries.BET_INFO, {
    options: () => ({
      pollInterval: 5000
    })
  }),
  graphql(ACCEPT_BET_MUTATION, {
    props: ({ mutate }) => ({
      acceptBet: id => mutate({ variables: { id } })
    }),
    options: props => ({
      refetchQueries: [
        {
          query: queries.BET_INFO,
          variables: { betId: props.betId }
        }
      ]
    })
  }),
  graphql(CHOOSE_WINNER_MUTATION, {
    props: ({ mutate }) => ({
      chooseWinner: (id, winner) => mutate({ variables: { id, winner } })
    }),
    options: props => ({
      refetchQueries: [
        {
          query: queries.BET_INFO,
          variables: { betId: props.betId }
        }
      ]
    })
  }),
  graphql(DELETE_BET_MUTATION, {
    props: ({ mutate }) => ({
      deleteBet: id => mutate({ variables: { id } })
    }),
    options: () => ({
      refetchQueries: [
        {
          query: BET_LIST
        }
      ]
    })
  })
)(BetPage)
