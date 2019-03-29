import React from 'react'
import Switch from 'react-switch'

import { colors } from 'components/variables'

const CustomSwitch = ({ checked, onChange, checkedIcon, uncheckedIcon }) => (
  <Switch
    checked={checked}
    onChange={onChange}
    handleDiameter={28}
    offColor={colors.gray4}
    onColor={colors.primary}
    offHandleColor={colors.white}
    onHandleColor={colors.white}
    height={36}
    width={68}
    uncheckedIcon={uncheckedIcon}
    checkedIcon={checkedIcon}
  />
)

export default CustomSwitch
