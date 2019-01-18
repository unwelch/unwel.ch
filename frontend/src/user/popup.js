import React, { Component } from 'react'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { differenceInDays } from 'date-fns'

import { goToPage } from '../navigation/actions'

import { TranslatorConsumer } from '../translations'

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
  const lastPopupShownDateString = window.localStorage.getItem('lastPopupDate')

  const today = new Date()

  if (!lastPopupShownDateString) {
    window.localStorage.setItem('lastPopupDate', today.toString())
    return false
  }

  const lastPopupShownDate = new Date(lastPopupShownDateString)

  if (have7DaysPassed(lastPopupShownDate, today)) {
    window.localStorage.setItem('lastPopupDate', today.toString())
    return true
  }

  return false
}

const have7DaysPassed = (lastPopupShownDate, today) => {
  const appearanceDays = 7
  const daysSinceLastPopup = differenceInDays(today, lastPopupShownDate)

  if (daysSinceLastPopup > appearanceDays) {
    return true
  }

  return false
}

class SaveAccountPopup extends Component {
  constructor (props) {
    super(props)

    this.checkShow = this.checkShow.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.saveAccountHandler = this.saveAccountHandler.bind(this)

    this.state = {
      isModalOpen: false
    }
  }

  checkShow () {
    const { currentUser } = this.props.data
    const isAnonymous = currentUser && currentUser.isAnonymous

    if (!currentUser) {
      setTimeout(this.checkShow, 1000)
      return
    }

    if (checkIfShouldAppear() && isAnonymous) {
      this.setState({
        isModalOpen: true
      })
    }
  }

  componentDidMount () {
    this.checkShow()
  }

  handleCloseModal () {
    this.setState({ isModalOpen: false })
  }

  saveAccountHandler () {
    this.props.goToPage('/save-account')
  }

  render () {
    const { data } = this.props

    if (data.loading) {
      return null
    }

    return (
      <TranslatorConsumer>
        {t => (
          <Modal
            isOpen={this.state.isModalOpen}
            onClose={this.handleCloseModal}
          >
            <Text size='size1'>{t('save-account-message')}</Text>
            <Spacer top={4} />
            <Button type='level2' fullWidth onClick={this.saveAccountHandler}>
              {t('create-account')}
            </Button>
            <Spacer top={1} />
            <Button size='small' type='inverted' fullWidth>
              Cancel
            </Button>
          </Modal>
        )}
      </TranslatorConsumer>
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
