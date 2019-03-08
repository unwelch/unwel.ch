import styledNormalize from 'styled-normalize'
import styled, { injectGlobal } from 'styled-components'
import { fontSizes, lineHeights, fontFamily, colors } from '../variables'

import CeraBoldEot from '../../src/assets/fonts/Cera/Cera-Bold.eot'
import CeraBoldWoff from '../../src/assets/fonts/Cera/Cera-Bold.woff'
import CeraMediumEot from '../../src/assets/fonts/Cera/Cera-Medium.eot'
import CeraMediumWoff from '../../src/assets/fonts/Cera/Cera-Medium.woff'
import CeraBlackEot from '../../src/assets/fonts/Cera/Cera-Black.eot'
import CeraBlackWoff from '../../src/assets/fonts/Cera/Cera-Black.woff'
import CeraBlackItalicEot from '../../src/assets/fonts/Cera/Cera-BlackItalic.eot'
import CeraBlackItalicWoff from '../../src/assets/fonts/Cera/Cera-BlackItalic.woff'

injectGlobal`
  ${styledNormalize}

  @font-face {
      font-family: 'Cera';
      src: url('${CeraBoldEot}');
      src: url('${CeraBoldEot}?#iefix') format('embedded-opentype'),
          url('${CeraBoldWoff}') format('woff');
      font-weight: 600;
      font-style: normal;
      font-display: block;
  }

  @font-face {
      font-family: 'Cera';
      src: url('${CeraMediumEot}');
      src: url('${CeraMediumEot}?#iefix') format('embedded-opentype'),
          url('${CeraMediumWoff}') format('woff');
      font-weight: 500;
      font-style: normal;
      font-display: block;
  }
  @font-face {
      font-family: 'Cera';
      src: url('${CeraBlackEot}');
      src: url('${CeraBlackEot}?#iefix') format('embedded-opentype'),
          url('${CeraBlackWoff}') format('woff');
      font-weight: 800;
      font-style: normal;
      font-display: block;
  }

  @font-face {
      font-family: 'Cera';
      src: url('${CeraBlackItalicEot}');
      src: url('${CeraBlackItalicEot}?#iefix') format('embedded-opentype'),
          url('${CeraBlackItalicWoff}') format('woff');
      font-weight: 800;
      font-style: italic;
      font-display: block;
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
  overflow-x: hidden;
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
