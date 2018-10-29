import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getIsLoggedIn } from './selectors'

const withIsLoggedIn = component => {
  const mapStateToProps = (state, ownProps) => {
    return {
      isLoggedIn: getIsLoggedIn(state),
      ...ownProps
    }
  }

  const enhanced = connect(mapStateToProps, null)(component)

  enhanced.propTypes = {
    ...component.propTypes,
    isLoggedIn: PropTypes.bool
  }

  enhanced.displayName = `withIsLoggedIn(${component.displayName})`

  return enhanced
}

export default withIsLoggedIn
