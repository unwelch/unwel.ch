import React, { Component } from 'react'
import NativeInput from '../input'
import IdeaDropdown from './idea-dropdown'

class Input extends Component {
  state = { showDropdown: false }

  handleInputFocus = () => {
    if (this.props.value === '') {
      this.setState({ showDropdown: true })
    }
  }

  handleInputBlur = () => {
    setTimeout(() => this.setState({ showDropdown: false }), 300)
  }

  handleInputChange = evt => {
    this.props.onChange(evt)
    this.setState({ showDropdown: evt.target.value === '' })
  }

  handleIdeaClick = idea => {
    this.setState({ showDropdown: false })
    this.props.onChange({ target: { value: idea } })
  }

  render () {
    const {
      fontWeight,
      size,
      fullWidth,
      value,
      placeholder,
      ideas,
      ideaColumns,
      dataQa
    } = this.props
    return (
      <div style={{ position: 'relative' }}>
        <NativeInput
          fontWeight={fontWeight}
          size={size}
          fullWidth={fullWidth}
          onChange={this.handleInputChange}
          value={value}
          placeholder={placeholder}
          data-qa={dataQa}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
        />
        <IdeaDropdown
          visible={this.state.showDropdown}
          ideas={ideas}
          onIdeaClick={this.handleIdeaClick}
          columns={ideaColumns}
        />
      </div>
    )
  }
}

export default Input
