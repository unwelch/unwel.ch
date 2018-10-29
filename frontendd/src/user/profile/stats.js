import React from 'react'
import styled from 'styled-components'

import { ResponsivePie } from '@nivo/pie'

import Distribute from 'components/distribute'
import Text from 'components/text'

import { colors } from 'components/variables'

const BasicStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const BasicStats = ({ stats }) => (
  <BasicStatsWrapper>
    <Distribute vertical align='center'>
      <Text size='size5' fontWeight='bold'>
        {stats.betsCreated}
      </Text>
      <Text size='size1'>Created</Text>
    </Distribute>
    <Distribute vertical align='center'>
      <Text size='size5' fontWeight='bold'>
        {stats.betsAccepted}
      </Text>
      <Text size='size1'>Accepted</Text>
    </Distribute>
    <Distribute vertical align='center'>
      <Text color={colors.error} size='size5' fontWeight='bold'>
        {stats.betsDisputed}
      </Text>
      <Text color={colors.error} size='size1'>
        Disputes
      </Text>
    </Distribute>
  </BasicStatsWrapper>
)

const WonLostBarWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  background: ${colors.grey2};
  align-items: center;
  justify-content: center;
`

const WonLostBarSection = styled.div`
  flex: ${p => p.weight};
  background: ${p => p.color};
  height: 100%;

  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
`

export const WonLostBar = ({ stats }) => {
  if (stats.betsWon + stats.betsLost <= 0) {
    return (
      <WonLostBarWrapper>
        <Text dimmed>No finished bets</Text>
      </WonLostBarWrapper>
    )
  }

  return (
    <WonLostBarWrapper>
      <WonLostBarSection color={colors.primary} weight={stats.betsWon}>
        {stats.betsWon} won
      </WonLostBarSection>
      <WonLostBarSection color={colors.error} weight={stats.betsLost}>
        {stats.betsLost} lost
      </WonLostBarSection>
    </WonLostBarWrapper>
  )
}

const WonLostPieWrapper = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  border-radius: 6px;
  overflow: hidden;

  align-items: center;
  justify-content: center;
`

export const WonLostPie = ({ stats }) => {
  if (stats.betsWon + stats.betsLost + stats.betsDisputed <= 0) {
    return null
  }

  const data = [
    {
      id: 'won',
      label: 'Won',
      value: stats.betsWon,
      color: colors.primary
    },
    {
      id: 'disputed',
      label: 'Disputed',
      value: stats.betsDisputed,
      color: colors.error
    },
    {
      id: 'lost',
      label: 'Lost',
      value: stats.betsLost,
      color: '#000000'
    }
  ].filter(datum => datum.value > 0)

  return (
    <WonLostPieWrapper>
      <ResponsivePie
        data={data}
        margin={{
          top: 40,
          right: 40,
          bottom: 40,
          left: 40
        }}
        innerRadius={0.4}
        padAngle={3}
        cornerRadius={6}
        colorBy={data => data.color}
        borderColor='inherit'
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor='#070707'
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={8}
        radialLabelsLinkHorizontalLength={8}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor='inherit'
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor='#FFFFFF'
        animate={false}
        isInteractive={false}
        theme={{ labels: { text: { fontSize: 14, fontWeight: 'bold' } } }}
      />
    </WonLostPieWrapper>
  )
}
