import React, { Component } from 'react'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { differenceInDays } from 'date-fns'

import { goToPage } from '../navigation/actions'
import { showSaveAccountPopup } from '../user/actions'

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

  if (haveDaysPassed(lastPopupShownDate, today)) {
    window.localStorage.setItem('lastPopupDate', today.toString())
    return true
  }

  return false
}

const haveDaysPassed = (lastPopupShownDate, today) => {
  const appearanceDays = 5
  const daysSinceLastPopup = differenceInDays(today, lastPopupShownDate)

  if (daysSinceLastPopup > appearanceDays) {
    return true
  }

  return false
}

class SaveAccountPopup extends Component {
  constructor (props) {
    super(props)

    this.checkRecurrentShow = this.checkRecurrentShow.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.saveAccountHandler = this.saveAccountHandler.bind(this)

    this.state = {
      alreadyShown: false
    }
  }

  checkRecurrentShow () {
    const { currentUser } = this.props.data
    const isAnonymous = currentUser && currentUser.isAnonymous

    if (!currentUser) {
      setTimeout(this.checkRecurrentShow, 1000)
      return
    }

    if (checkIfShouldAppear() && isAnonymous) {
      this.props.showSaveAccountPopup()
    }
  }

  componentDidMount () {
    this.checkRecurrentShow()
  }

  handleCloseModal () {
    this.setState({ alreadyShown: true })
  }

  saveAccountHandler () {
    this.props.goToPage('/save-account')
  }

  render () {
    const { data, showPopup } = this.props

    if (data.loading) {
      return null
    }

    return (
      <TranslatorConsumer>
        {t => (
          <Modal
            isOpen={showPopup && !this.state.alreadyShown}
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

const mapStateToProps = state => {
  return {
    showPopup: state.user.showSaveAccountPopup
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      goToPage,
      showSaveAccountPopup
    },
    dispatch
  )
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(QUERY)
)(SaveAccountPopup)
