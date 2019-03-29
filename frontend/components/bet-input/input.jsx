import React, { useState } from 'react'
import NativeInput from '../input'
import IdeaDropdown from './idea-dropdown'

const Input = ({
  fontWeight,
  size,
  fullWidth,
  value,
  placeholder,
  ideas,
  ideaColumns,
  dataQa,
  onChange
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleInputFocus = () => {
    if (value === '') {
      setShowDropdown(true)
    }
  }

  const handleInputBlur = () => {
    // TODO fix: this causes a state chenge after unmounting
    setTimeout(() => setShowDropdown(false), 300)
  }

  const handleInputChange = evt => {
    onChange(evt)
    setShowDropdown(evt.target.value === '')
  }

  const handleIdeaClick = idea => {
    setShowDropdown(false)
    onChange({ target: { value: idea } })
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
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <IdeaDropdown
        visible={showDropdown}
        ideas={ideas}
        onIdeaClick={handleIdeaClick}
        columns={ideaColumns}
      />
    </div>
  )
}

export default Input
