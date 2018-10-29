import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DefaultContainer from 'components/default-container'
import BetInput from 'components/bet-input'
import Spacer from 'components/spacer'

import { saveTempStatement } from '../services'
import { showAnnounce } from './../../announce/actions'
import * as mutations from './../mutations'
import * as queries from './../bet-list/queries'
import { trackEvent, events } from '../../tracking'
import withNavigate from '../../navigation/withNavigate'
import withIsLoggedIn from '../../user/auth/withIsLoggedIn'

class NewBet extends Component {
  constructor (props) {
    super(props)

    this.onBetConfirm = this.onBetConfirm.bind(this)
  }

  componentDidMount () {
    trackEvent(events.pageLoaded, { page: 'newBet' })
  }

  async onBetConfirm (bet, statement) {
    if (!this.props.isLoggedIn) {
      saveTempStatement(statement, bet)
      await this.props.goToPage(`/anonymous-login`)
      return
    }

    this.props.showAnnounce('New bet created')
    const result = await this.props.addBet(statement, bet)
    await this.props.goToPage(`/bet/${result.data.addBet.id}`)
  }

  render () {
    return (
      <DefaultContainer>
        <Spacer top={6}>
          <BetInput
            starter='I bet'
            middle='that'
            onConfirm={this.onBetConfirm}
          />
        </Spacer>
      </DefaultContainer>
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
  graphql(mutations.addBet, {
    props: ({ mutate }) => ({
      addBet: (statement, quantity) =>
        mutate({ variables: { statement, quantity } })
    }),
    options: () => ({
      refetchQueries: [
        {
          query: queries.BET_LIST
        }
      ]
    })
  }),
  connect(null, mapDispatchToProps),
  withNavigate,
  withIsLoggedIn
)(NewBet)
