import React from 'react'

import Distribute from '../distribute'
import Button from '../button'

const LoginProviderButtons = ({ onClickGoogle }) => {
  return (
    <Distribute space={2}>
      <Button size="large" type="level2" onClick={onClickGoogle}>
        Login with Google
      </Button>
    </Distribute>
  )
}

LoginProviderButtons.displayName = 'LoginProviderButtons'

export default LoginProviderButtons
