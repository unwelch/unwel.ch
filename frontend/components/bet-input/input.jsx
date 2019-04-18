import React from 'react'
import NativeInput from '../input'
// import IdeaDropdown from './idea-dropdown'

const Input = ({
  fontWeight,
  size,
  fullWidth,
  value,
  placeholder,
  dataQa,
  onChange
}) => {
  const handleInputChange = evt => {
    onChange(evt)
  }

  return (
    <div style={{ position: 'relative' }}>
      <NativeInput
        fontWeight={fontWeight}
        size={size}
        fullWidth={fullWidth}
        onChange={handleInputChange}
        value={value}
        placeholder={placeholder}
        data-qa={dataQa}
      />
    </div>
  )
}

export default Input