import React, { Component } from "react";
import styled, { css } from "styled-components";

import { colors } from "../variables";

const placeholder = css`
  position: relative;

  &:after{
    content: '${p => p.placeholder}';
    position: absolute;
    width: 100%;
    text-decoration: underline;
    display: inline-block;
    z-index: -1;
    opacity: 0.5;
    color: ${colors.primary};
    left: 0;
  }
`;

const Root = styled.div`
  display: ${p => (p.flex ? "flex" : "block")};
`;

const Prefix = styled.span`
  color: ${colors.body};
  white-space: nowrap;
  margin-right: 0.2em;
`;

const InputWrapper = styled.span`
  ${p => p.isPlaceholder && placeholder};
  flex: 1;
  display: ${p => (p.flex ? "flex" : "inline")};
`;

const InputSpan = styled.span`
  outline: none;
  font-weight: inherit;
  font-family: inherit;
  line-height: inherit;
  cursor: pointer;
  color: ${colors.primary};
  flex: 1;
  display: ${p => (p.block ? "inline-block" : "inline")};
  min-width: ${p => (p.block ? "100%" : "100px")};
`;

class Input extends Component {
  constructor(props) {
    super(props);

    this.emitChange = this.emitChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    const code = e.keyCode ? e.keyCode : e.which;

    // Prevent new lines on enter
    if (code === 13) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  componentDidMount() {
    this.ref.innerHTML = this.props.html;
  }

  emitChange() {
    const html = this.ref.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }

  render() {
    return (
      <InputSpan
        innerRef={node => {
          this.ref = node;
        }}
        onKeyDown={this.onKeyDown}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        block={this.props.block}
        data-qa={this.props.dataQa}
      />
    );
  }
}

const FancyInput = ({ prefix, value, onChange, placeholder, dataQa }) => {
  const empty = value == null || value === "";

  return (
    <Root flex={empty}>
      <Prefix>{prefix}</Prefix>
      <InputWrapper
        flex={empty}
        placeholder={placeholder}
        isPlaceholder={empty}
      >
        <Input html={value} block={empty} onChange={onChange} dataQa={dataQa} />
      </InputWrapper>
    </Root>
  );
};

FancyInput.displayName = "FancyInput";

export default FancyInput;
