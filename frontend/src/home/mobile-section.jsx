import React from 'react'
import styled from 'styled-components'
import Spacer from 'components/spacer'
import Content from 'components/content'
import Distribute from 'components/distribute'
import { colors } from 'components/variables'

import WaypointAnimate from './waypoint-animate'

const Half = styled.div`
  flex: 1;
`
const Image = styled.img`
  width: 100%;
  min-width: 150px;
  min-height: 260px;
`

const MobileSection = ({
  flipped,
  isBigScreen,
  title,
  description,
  src,
  alt
}) => {
  return (
    <Spacer top={8} bottom={8}>
      <Distribute space={2} align='center' flipped={flipped}>
        <Half>
          <Spacer top={-3} left={isBigScreen ? 0 : 2}>
            <WaypointAnimate
              direction='down'
              topOffset='0%'
              bottomOffset='0%'
              distance={10}
            >
              <Spacer bottom={1} top={-1}>
                <Content
                  type='subtitle'
                  fontWeight='regular'
                  align={flipped ? 'left' : 'right'}
                >
                  {title}
                </Content>
              </Spacer>
              <Content
                type='heading'
                color={colors.grey8}
                fontWeight='regular'
                align={flipped ? 'left' : 'right'}
              >
                {description}
              </Content>
            </WaypointAnimate>
          </Spacer>
        </Half>
        <Half>
          <WaypointAnimate
            direction={flipped ? 'left' : 'right'}
            topOffset='0%'
            bottomOffset='0%'
            distance={20}
          >
            <Spacer
              top={isBigScreen ? 4 : 0}
              bottom={isBigScreen ? 4 : 0}
              left={isBigScreen ? 4 : 0}
              right={isBigScreen ? 4 : 0}
            >
              <Image alt={alt} src={src} />
            </Spacer>
          </WaypointAnimate>
        </Half>
      </Distribute>
    </Spacer>
  )
}

export default MobileSection
