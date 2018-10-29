import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { goToPage } from './actions'

const withNavigate = component => {
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        goToPage
      },
      dispatch
    )
  }

  const enhanced = connect(null, mapDispatchToProps)(component)

  enhanced.propTypes = {
    ...component.propTypes,
    goToPage: PropTypes.func
  }

  enhanced.displayName = `withNavigate(${component.displayName})`

  return enhanced
}

export default withNavigate
