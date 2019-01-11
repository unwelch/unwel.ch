import React, { Component } from 'react'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { differenceInDays } from 'date-fns'

import { goToPage } from './../navigation/actions'

import Text from 'components/text'
import Spacer from 'components/spacer'
import Button from 'components/button'
import Modal from 'components/modal'

const QUERY = gql`
  query {
    currentUser {
      id
      name
      isAnonymous
    }
  }
`

const checkIfShouldAppear = () => {
  const lastPopupShownDate = new Date(
    window.localStorage.getItem('lastPopupDate')
  )
  const today = new Date()

  if (have7DaysPassed(lastPopupShownDate, today)) {
    window.localStorage.setItem('lastPopupDate', today.toString())
    return true
  }

  return false
}

const have7DaysPassed = (lastPopupShownDate, today) => {
  const appearanceDays = 7
  const daysSinceLastPopup = differenceInDays(lastPopupShownDate, today)

  if (daysSinceLastPopup > appearanceDays) {
    return true
  }

  return false
}

class SaveAccountPopup extends Component {
  state = {
    isModalOpen: false
  }

  componentDidMount () {
    const { currentUser } = this.props.data
    const isAnonymous = currentUser && currentUser.isAnonymous

    if (checkIfShouldAppear() && isAnonymous) {
      this.setState({
        isModalOpen: true
      })
    }
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  saveAccountHandler = () => {
    this.props.goToPage('/save-account')
  }

  render () {
    const { data } = this.props

    if (data.loading) {
      return null
    }

    return (
      <Modal isOpen={this.state.isModalOpen} onClose={this.handleCloseModal}>
        <Text size='size1'>
          You are using a temporal account on this device. Create an account to
          access unwelch from anywhere.
        </Text>
        <Spacer top={4} />
        <Button type='level2' fullWidth onClick={this.saveAccountHandler}>
          Create account
        </Button>
        <Spacer top={1} />
        <Button size='small' type='inverted' fullWidth>
          Cancel
        </Button>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      goToPage
    },
    dispatch
  )
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  graphql(QUERY)
)(SaveAccountPopup)
