import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { saveTempAccept } from '../services'
import {
  ACCEPT_BET_MUTATION,
  CHOOSE_WINNER_MUTATION,
  DELETE_BET_MUTATION
} from '../mutations'
import * as queries from './queries'
import { BET_LIST } from '../bet-list/queries'
import { showAnnounce } from '../../announce/actions'
import { betStatuses, getBetStatus } from '../bet-status'
import { getIntroText, getAccepterText } from '../phrase-generator'
import Actions from './actions'
import { trackEvent, events } from '../../tracking'
import withNavigation from '../../navigation/withNavigate'

import { TranslatorConsumer } from '../../translations'

import DefaultContainer from 'components/default-container'
import Distribute from 'components/distribute'
import Avatar from 'components/avatar'
import Text from 'components/text'
import Spacer from 'components/spacer'
import Placeholder from 'components/placeholder'

class BetPage extends Component {
  componentDidMount() {
    trackEvent(events.pageLoaded, { page: 'bet' })
  }

  acceptBet = () => {
    const { currentUser } = this.props.data
    trackEvent(events.acceptBetClick, { betId: this.props.betId })

    if (currentUser) {
      this.props.acceptBet(this.props.betId)
      this.props.showAnnounce('announce.bet-accepted')
      trackEvent(events.betAccepted, { betId: this.props.betId })
    } else {
      saveTempAccept(this.props.betId)
      this.props.goToPage('/login')
    }
  }

  chooseWon = () => {
    this.props.chooseWinner(this.props.betId, true)
    this.props.showAnnounce('announce.bet-marked-won')
  }

  chooseLost = () => {
    this.props.chooseWinner(this.props.betId, false)
    this.props.showAnnounce('announce.bet-marked-lost')
  }

  deleteBet = () => {
    if (window.confirm('Are you sure you want to delete this bet?')) {
      this.props.deleteBet(this.props.betId)
      trackEvent(events.betDeleted, { betId: this.props.betId })
      this.props.goToPage('/bets')
    }
  }

  render() {
    const { showAnnounce } = this.props
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
            <DefaultContainer data-qa="bet-page">
              <Spacer inner top={6} />
              <Text size="size3" textAlign="center">
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
          <DefaultContainer data-qa="bet-page">
            <Spacer inner top={6} />
            <Distribute space={1} align="center">
              <Link to={`/profiles/${bet.user.id}`}>
                <Avatar user={bet.user} />
              </Link>
              <Text size="size4" fontWeight="black" italics>
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
              bet.targetUser,
              bet.quantity,
              bet.statement.statement,
              'size2',
              t
            )}
            <Spacer top={4} />

            {isCurrentUserTheCreator && canEditBet ? (
              <Link to={`/bet/${bet.id}/edit`} />
            ) : null}

            <Spacer bottom={20}>
              <Actions
                t={t}
                bet={bet}
                currentUser={currentUser}
                showAnnounce={showAnnounce}
                acceptBet={this.acceptBet}
                deleteBet={this.deleteBet}
                chooseLost={this.chooseLost}
                chooseWon={this.chooseWon}
              />
            </Spacer>
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
