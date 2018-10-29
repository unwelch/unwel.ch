import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Link = styled.a`

`

const SharingButtons = props => {
  return (
    <Fragment>
      <a
        href={`https://facebook.com/sharer/sharer.php?u=${props.url}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label=''
      >
        Facebook Icon here
      </a>

      <a
        href={`https://twitter.com/intent/tweet/?text=${props.text}&amp;url=${props.url}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label=''
      >
        Twitter Icon here
      </a>

      <a
        href={`mailto:?subject=${props.text}&amp;body=${props.url}`}
        target='_self'
        aria-label=''
      >
        Mail Icon here
      </a>
    </Fragment>
  )
}

SharingButtons.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default SharingButtons
