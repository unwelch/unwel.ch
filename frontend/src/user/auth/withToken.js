import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getToken } from './selectors'

const withToken = component => {
  const mapStateToProps = (state, ownProps) => {
    return {
      token: getToken(state),
      ...ownProps
    }
  }

  const enhanced = connect(
    mapStateToProps,
    null
  )(component)

  enhanced.propTypes = {
    ...component.propTypes,
    token: PropTypes.string
  }

  enhanced.displayName = `withToken(${component.displayName})`

  return enhanced
}

export default withToken
