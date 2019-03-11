import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import queryString from 'query-string'

import DefaultContainer from 'components/default-container'
import BetInput from 'components/bet-input'
import Spacer from 'components/spacer'
import Distribute from 'components/distribute'

import TargetButton from './target-button'

import { saveTempBet } from '../services'
import { showAnnounce } from '../../announce/actions'
import { showSaveAccountPopup } from '../../user/actions'
import { ADD_BET_MUTATION } from '../mutations'
import * as queries from '../bet-list/queries'
import { trackEvent, events } from '../../tracking'
import withNavigate from '../../navigation/withNavigate'
import withIsLoggedIn from '../../user/auth/withIsLoggedIn'
import { TranslatorConsumer } from '../../translations'

export const USER_QUERY = gql`
  query($userId: String!) {
    user(id: $userId) {
      id
      name
      avatar
    }
  }
`

export const QUERY = gql`
  query {
    currentUser {
      id
      name
      isAnonymous
      avatar
    }
  }
`

class NewBet extends Component {
  constructor(props) {
    super(props)

    this.state = {
      targetUserId: queryString.parse(window.location.search).targetUserId
    }

    this.handleBetConfirm = this.handleBetConfirm.bind(this)
  }

  componentDidMount() {
    trackEvent(events.pageLoaded, { page: 'newBet' })
  }

  handleFriendSelect = friendUserId => {
    this.setState({ targetUserId: friendUserId })
  }

  async handleBetConfirm(bet) {
    if (!this.props.isLoggedIn) {
      saveTempBet(bet)
      await this.props.goToPage(`/login`)
      return
    }

    // this.props.showSaveAccountPopup()
    this.props.showAnnounce('announce.new-bet-created')
    const result = await this.props.addBet(
      bet.statement,
      bet.quantity,
      this.getTargetUserId()
    )
    await this.props.goToPage(`/bet/${result.data.addBet.id}`)
  }

  render() {
    const targetUserId = this.state.targetUserId

    return (
      <TranslatorConsumer>
        {t => (
          <DefaultContainer>
            <Spacer top={6}>
              <BetInput
                starter={t('new-bet-phrase.verb')}
                middle={t('new-bet-phrase.preposition')}
                onConfirm={this.handleBetConfirm}
              />
            </Spacer>
            <Spacer top={3}>
              <Distribute position="end">
                <TargetButton
                  onFriendSelect={this.handleFriendSelect}
                  targetUserId={targetUserId}
                  currentUserId={
                    this.props.data &&
                    this.props.data.currentUser &&
                    this.props.data.currentUser.id
                  }
                />
              </Distribute>
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
      showAnnounce,
      showSaveAccountPopup
    },
    dispatch
  )
}

export default compose(
  graphql(ADD_BET_MUTATION, {
    props: ({ mutate }) => ({
      addBet: (statement, quantity, targetUserId) =>
        mutate({ variables: { statement, quantity, targetUserId } })
    }),
    options: () => ({
      refetchQueries: [
        {
          query: queries.BET_LIST
        }
      ]
    })
  }),
  graphql(QUERY, {
    options: () => {
      return {
        fetchPolicy: 'cache-and-network'
      }
    }
  }),
  connect(
    null,
    mapDispatchToProps
  ),
  withNavigate,
  withIsLoggedIn
)(NewBet)
