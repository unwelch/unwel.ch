import React, { Fragment, Component } from 'react'
import styled from 'styled-components'

import Button from 'components/button'
import Text from 'components/text'
import Spacer from 'components/spacer'
import Modal from 'components/modal'

const Root = styled.div``

const BetActionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  & > * {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`

class FinishBet extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)

    this.state = { showModal: false }
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  handleOpen() {
    this.setState({ showModal: true })
  }

  renderActions() {
    const { bet, currentUser, chooseWon, chooseLost } = this.props

    if (!currentUser) return null

    if (bet.user.id === currentUser.id) {
      return (
        <BetActionWrapper>
          <Button
            type="level2"
            onClick={chooseWon}
            fullWidth
            dataQa="choose-won-button">
            I was right
          </Button>
          <Button
            type="level1"
            onClick={chooseLost}
            fullWidth
            dataQa="choose-lost-button">
            I was wrong
          </Button>
        </BetActionWrapper>
      )
    }

    return (
      <BetActionWrapper space={3 / 2} align="center">
        <Button
          type="level2"
          onClick={chooseLost}
          fullWidth
          dataQa="choose-lost-button">
          {bet.user.name} was right
        </Button>
        <Button
          type="level1"
          onClick={chooseWon}
          fullWidth
          dataQa="choose-won-button">
          {bet.user.name} was wrong
        </Button>
      </BetActionWrapper>
    )
  }

  render() {
    return (
      <Fragment>
        <Modal isOpen={this.state.showModal} onClose={this.handleClose}>
          <Text size="size2">Bet has finished?</Text>
          <Text size="size2">Choose who won!</Text>
          <Spacer top={2} />
          {this.renderActions()}
        </Modal>
        <Root>
          <Button dataQa="decide-who-won-button" onClick={this.handleOpen}>
            Choose winner
          </Button>
        </Root>
      </Fragment>
    )
  }
}

export default FinishBet
