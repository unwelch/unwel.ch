import styledNormalize from 'styled-normalize'
import styled, { injectGlobal } from 'styled-components'
import { fontSizes, lineHeights, fontFamily, colors } from '../variables'

import CeraLightEot from '../../src/assets/fonts/Cera/Cera-Light.eot'
import CeraLightWoff from '../../src/assets/fonts/Cera/Cera-Light.woff'
import CeraMediumEot from '../../src/assets/fonts/Cera/Cera-Medium.eot'
import CeraMediumWoff from '../../src/assets/fonts/Cera/Cera-Medium.woff'
import CeraBlackEot from '../../src/assets/fonts/Cera/Cera-Black.eot'
import CeraBlackWoff from '../../src/assets/fonts/Cera/Cera-Black.woff'
import CeraBlackItalicEot
  from '../../src/assets/fonts/Cera/Cera-BlackItalic.eot'
import CeraBlackItalicWoff
  from '../../src/assets/fonts/Cera/Cera-BlackItalic.woff'

injectGlobal`
  ${styledNormalize}

  @font-face {
      font-family: 'Cera';
      src: url('${CeraLightEot}');
      src: url('${CeraLightEot}?#iefix') format('embedded-opentype'),
          url('${CeraLightWoff}') format('woff');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Cera';
      src: url('${CeraMediumEot}');
      src: url('${CeraMediumEot}?#iefix') format('embedded-opentype'),
          url('${CeraMediumWoff}') format('woff');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
  }
  @font-face {
      font-family: 'Cera';
      src: url('${CeraBlackEot}');
      src: url('${CeraBlackEot}?#iefix') format('embedded-opentype'),
          url('${CeraBlackWoff}') format('woff');
      font-weight: 800;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Cera';
      src: url('${CeraBlackItalicEot}');
      src: url('${CeraBlackItalicEot}?#iefix') format('embedded-opentype'),
          url('${CeraBlackItalicWoff}') format('woff');
      font-weight: 800;
      font-style: italic;
      font-display: swap;
  }


  body {
    background: ${colors.background};
  }

  #root {
    height: 100%;
    width: 100%;
  }
`

const BaseStyles = styled.div`
  font-family: ${fontFamily};
  font-variant-numeric: lining-nums;
  font-size: ${fontSizes.size0}px;
  line-height: ${lineHeights.size0}px;
  color: ${colors.body};
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  height: 100%;

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
  }
`

BaseStyles.displayName = 'BaseStyles'

export default BaseStyles
