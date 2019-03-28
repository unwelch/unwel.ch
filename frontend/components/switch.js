import React, { Component, Fragment } from 'react'
import Switch from 'react-switch'

import { colors } from 'components/variables'

export default ({ checked, onChange, checkedIcon, uncheckedIcon }) => (
  <Switch
    checked={checked}
    onChange={onChange}
    handleDiameter={28}
    offColor={colors.gray4}
    onColor={colors.primary}
    offHandleColor={colors.black}
    onHandleColor={colors.white}
    height={40}
    width={80}
    uncheckedIcon={uncheckedIcon}
    checkedIcon={checkedIcon}
  />
)
