/* eslint react/display-name: 0 */
import React, { Component } from "react";
import { screenSizes } from "./variables";

const INITIAL_SIZE_CONTEXT = {
  width: 600,
  breakpoint: "md"
};

const Context = React.createContext(INITIAL_SIZE_CONTEXT);

const widthToBreakpoint = width => {
  if (width <= screenSizes.sm) {
    return "sm";
  }
  if (width <= screenSizes.md) {
    return "md";
  }
  return "lg";
};

class ResponsiveProvider extends Component {
  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const { children } = this.props;

    const width = this.state.width;

    return (
      <Context.Provider
        value={{
          width,
          breakpoint: widthToBreakpoint(width)
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

export const withBreakpoint = WrappedComponent => props => (
  <ResponsiveConsumer>
    {({ breakpoint }) => (
      <WrappedComponent {...props} breakpoint={breakpoint} />
    )}
  </ResponsiveConsumer>
);

export const withGlobalSize = WrappedComponent => props => (
  <ResponsiveConsumer>
    {({ width }) => <WrappedComponent {...props} globalWidth={width} />}
  </ResponsiveConsumer>
);

export const ResponsiveConsumer = Context.Consumer;
export default ResponsiveProvider;
