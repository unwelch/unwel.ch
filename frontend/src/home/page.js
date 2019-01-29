import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose } from 'ramda'
import Github from 'react-feather/dist/icons/github'
import { makePopup } from '@typeform/embed'

import DefaultContainer from 'components/default-container'
import Spacer from 'components/spacer'
import Link from 'components/link'
import Text from 'components/text'
import Content from 'components/content'
import Distribute from 'components/distribute'
import { withBreakpoint } from 'components/responsive-provider'
import Button from 'components/button'
import Logo from 'components/logo'
import { colors } from 'components/variables'

import withNavigate from './../navigation/withNavigate'
import withIsLoggedIn from './../user/auth/withIsLoggedIn'
import { getTempBet, getTempAccept } from './../bet/services'
import { ACCEPT_BET_MUTATION, ADD_BET_MUTATION } from './../bet/mutations'
import { trackEvent, events } from '../tracking'
import { canInstall, promptInstall } from './../pwa'
import WaypointAnimate from './waypoint-animate'
import MobileSection from './mobile-section'

import IPHONE_NEW_BET from './assets/iphone-x-new-bet@2x.png'
import IPHONE_WHATSAPP from './assets/iphone-x-whatsapp@2x.png'
import IPHONE_WHO_IS_RIGHT from './assets/iphone-x-who-is-right@2x.png'

import 'ric'

const TYPEFORM_URL = 'https://unwelchers.typeform.com/to/efbovO'

const Flex = styled.div`
  flex: 1;
`

const DistributeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > * {
    flex: 0 0 auto;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const Hero = styled.div`
  width: 100%;
  background-color: #ffeeba;
  padding-top: 16px;
  padding-bottom: 40px;
`

const ConversationWrapper = styled.div`
  display: flex;
  align-items: center;

  flex-direction: ${props => (props.vertical ? 'column' : 'row')};

  > * {
    flex: 1;

    &:not(:last-child) {
      ${props =>
    props.vertical
      ? 'margin-bottom:' + props.space * 8 + 'px'
      : 'margin-right:' + props.space * 8 + 'px'};
    }
  }
`

const Root = styled.div``

const Footer = styled.footer`
  width: 100%;
  padding: 32px;
  min-height: 200px;
  position: relative;
  background-color: #272727;
`

const SubFooter = styled.div`
  width: 100%;
  padding: 20px 32px;
  background-color: ${colors.black};
`

const OpenSourceSection = styled.div`
  width: 100%;
  padding: 32px;
  min-height: 200px;
  position: relative;
  background: #ffeeba;
`

class Home extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    addBet: PropTypes.func,
    acceptBet: PropTypes.func
  }

  onLogin = () => {
    this.props.goToPage('/login')
  }

  handleGithubClick = () => {
    trackEvent(events.githubClick, { page: 'landing' })
    window.open('https://github.com/unwelch/unwel.ch', '_blank')
  }

  handleFeedbackClick = () => {
    trackEvent(events.feedbackOpened, { timeout: 5000 })
    this.typeformPopup.open()
  }

  onCreateBet = () => {
    this.props.goToPage('/bets/new')
  }

  componentDidMount () {
    trackEvent(events.pageLoaded, { page: 'landing' })

    if (this.props.isLoggedIn) {
      const bet = getTempBet()
      const betId = getTempAccept()
      if (bet) {
        this.props.addBet(bet.statement, bet.quantity)
        this.props.goToPage('/bets')
        return
      } else if (betId) {
        this.props.acceptBet(betId)
        trackEvent(events.betAccepted, { betId: betId, beforeLogin: true })
        this.props.goToPage(`/bet/${betId}`)
        return
      }
      this.props.goToPage('/bets')
    }

    requestIdleCallback(() => {
      this.typeformPopup = makePopup(TYPEFORM_URL, {
        mode: 'popup',
        autoClose: 3,
        hideScrollbars: true,
        onSubmit: () => {
          trackEvent(events.feedbackSubmitted)
        }
      })
    })
  }

  render () {
    const { breakpoint } = this.props
    const isBigScreen = breakpoint === 'lg'

    return (
      <Root>
        <Hero>
          <DefaultContainer>
            <DistributeWrapper>
              <Logo />
              <Button onClick={this.onLogin} type='inverted' size='small'>
                Log in
              </Button>
            </DistributeWrapper>
            <Spacer top={8} bottom={isBigScreen ? 8 : 4}>
              <Distribute space={4} vertical position='center' align='center'>
                <Spacer bottom={10}>
                  <WaypointAnimate
                    topOffset='0%'
                    direction='down'
                    distance={10}
                  >
                    <Content align='center' type='title' fontWeight='bold'>
                      Friendly betting
                    </Content>
                  </WaypointAnimate>
                </Spacer>
                <WaypointAnimate topOffset='0%' direction='down' distance={10}>
                  <Content align='center' type='heading' fontWeight='regular'>
                    Challenge your friends by <b>betting on anything</b> that
                    you disagree on.
                  </Content>
                  <Spacer top={3}>
                    <Content align='center' type='heading' fontWeight='regular'>
                      Keep track of who
                      {"'"}s the best.
                    </Content>
                  </Spacer>
                </WaypointAnimate>
              </Distribute>
            </Spacer>
          </DefaultContainer>
        </Hero>

        <Spacer top={-3}>
          <Distribute position='center'>
            <Button
              onClick={this.onCreateBet}
              type='level2'
              size='large'
              dataQa='make-bet-button'
            >
              Make a new Bet
            </Button>
          </Distribute>
        </Spacer>

        <Spacer top={8} bottom={4}>
          <Text textAlign='center' size='size4' fontWeight='bold'>
            Just 3 easy steps
          </Text>

          <DefaultContainer>
            <MobileSection
              isBigScreen={isBigScreen}
              title={'Create a bet'}
              description={
                'Bet on anything you want. Choose wisely which words to use...'
              }
              alt='iPhone X New Bet'
              src={IPHONE_NEW_BET}
            />
          </DefaultContainer>

          <DefaultContainer>
            <MobileSection
              flipped
              isBigScreen={isBigScreen}
              title={'Share the bet'}
              description={'So your friend can accept it and become your rival'}
              alt='iPhone X WhatsApp Bet on marathon'
              src={IPHONE_WHATSAPP}
            />
          </DefaultContainer>

          <DefaultContainer>
            <MobileSection
              isBigScreen={isBigScreen}
              title={'Decide who won!'}
              description={
                'Try to not lie, otherwise you would have a dicorded bet!'
              }
              alt='iPhone X Decide who is right'
              src={IPHONE_WHO_IS_RIGHT}
            />
          </DefaultContainer>
        </Spacer>

        <DefaultContainer notPadded={!isBigScreen}>
          <ConversationWrapper
            space={isBigScreen ? 3 : 1}
            vertical={!isBigScreen}
          >
            <Spacer top={3} bottom={5}>
              <Content align='center' type='heading' fontWeight='regular'>
                Your friends don’t believe in you?
                <br />
                <strong>Make them bet a dinner on it!</strong>
              </Content>
            </Spacer>
          </ConversationWrapper>
        </DefaultContainer>

        <Spacer top={1} bottom={6}>
          <Distribute position='center'>
            <Button type='level2'>Create your first bet!</Button>
          </Distribute>
        </Spacer>

        <OpenSourceSection>
          <DefaultContainer>
            <Spacer
              inner
              top={isBigScreen ? 8 : 4}
              bottom={isBigScreen ? 8 : 4}
            >
              <Distribute vertical={!isBigScreen} align='center'>
                <Flex>
                  <Spacer bottom={2}>
                    <Content type='subtitle' fontWeight='bold'>
                      Open Source
                    </Content>
                  </Spacer>
                  <Content type='heading' fontWeight='regular'>
                    We believe in transparency, so we made unwelch open source.
                    Be part of it and help improve it.
                  </Content>
                </Flex>
                <Spacer top={isBigScreen ? 0 : 3}>
                  <Button
                    onClick={this.handleGithubClick}
                    fullWidth={!isBigScreen}
                  >
                    <Distribute align='center'>
                      <Text>Fork on GitHub</Text>
                      <Spacer left={2}>
                        <Distribute>
                          <Github size={20} />
                        </Distribute>
                      </Spacer>
                    </Distribute>
                  </Button>
                </Spacer>
              </Distribute>
            </Spacer>
          </DefaultContainer>
        </OpenSourceSection>

        <Footer>
          <DefaultContainer>
            <Distribute vertical>
              <Spacer bottom={2}>
                <Logo color={colors.grey2} />
              </Spacer>
              <Text size='size0' color={colors.grey3}>
                We hate sport
                {"'"}s betting online but we love it doing it with a friend.
                <br />
                {!isBigScreen ? <br /> : null}
                We are creating this small Web Application to easy manage them.
              </Text>
              {canInstall() ? (
                <Spacer top={3} bottom={3}>
                  <Button
                    onClick={() => {
                      promptInstall()
                    }}
                    size='small'
                    type='level2'
                  >
                    Add to your Homescreen
                  </Button>
                </Spacer>
              ) : null}

              <Spacer top={2} bottom={1}>
                <Link
                  size={'size0'}
                  color={colors.grey3}
                  onClick={this.handleFeedbackClick}
                >
                  Send us your thoughts
                </Link>
              </Spacer>
            </Distribute>
          </DefaultContainer>
        </Footer>

        <SubFooter>
          <DefaultContainer>
            <Text
              size={isBigScreen ? 'size0' : 'sizeN1'}
              color={colors.grey3}
              fontWeight='regular'
            >
              Created by{' '}
              <Link
                href='https://gerard.sh'
                rel='noopener noreferrer'
                target='_blank'
              >
                <b>Gerard Abelló</b>
              </Link>{' '}
              and{' '}
              <Link
                href='https://twitter.com/davesnx'
                rel='noopener noreferrer'
                target='_blank'
              >
                <b>David Sancho</b>
              </Link>
            </Text>
          </DefaultContainer>
        </SubFooter>
      </Root>
    )
  }
}

export default compose(
  graphql(ACCEPT_BET_MUTATION, {
    props: ({ mutate }) => ({
      acceptBet: id => mutate({ variables: { id } })
    })
  }),
  graphql(ADD_BET_MUTATION, {
    props: ({ mutate }) => ({
      addBet: (statement, quantity) =>
        mutate({ variables: { statement, quantity } })
    })
  }),
  withNavigate,
  withIsLoggedIn,
  withBreakpoint
)(Home)
