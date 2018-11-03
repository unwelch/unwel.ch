import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { unit, unitize, colors, widths } from "../variables";

const applyWhenTruthy = (propName, func) => props => {
  const value = props[propName];
  return value ? func(value) : "";
};

const propsToDisplay = applyWhenTruthy(
  "inline",
  () => "display: inline-block;"
);
const propsToBackground = applyWhenTruthy(
  "backgroundColor",
  value => `background: ${colors[value] || value};`
);

const cursorTypes = {
  pointer: css`
    cursor: pointer;
  `,
  default: css`
    cursor: default;
  `,
  noEvents: css`
    pointer-events: none;
  `
};

const borderSideToPixelsMap = {
  all: "1px",
  x: "0 1px 0 1px",
  y: "1px 0 1px 0",
  top: "1px 0 0 0",
  right: "0 1px 0 0",
  bottom: "0 0 1px 0",
  left: "0 0 0 1px"
};
// TODO: move this into variables.js
const propsToBorder = ({ borderSide, borderColor }) => {
  if (!borderSide && !borderColor) return "";

  if (borderSide && !borderColor) {
    borderColor = "rgba(0,0,0,.07)";
  } else if (!borderSide && borderColor) {
    borderSide = "all";
  }

  const pixels = borderSideToPixelsMap[borderSide];
  return `
    border-width: ${pixels};
    border-style: solid;
    border-color: ${colors[borderColor] || borderColor};
  `;
};
const propsToColor = applyWhenTruthy(
  "contentColor",
  value => `color: ${colors[value] || value};`
);
const propsToPadding = ({
  pad,
  padX,
  padY,
  padTop,
  padRight,
  padBottom,
  padLeft,
  borderColor,
  borderSide
}) => {
  let values = [0, 0, 0, 0];

  // ideally these props are mutually exclusive
  // that being said we apply props in those order
  // to assure 'padding' is the most generic etc.
  if (pad) {
    if (pad instanceof Array) {
      values = pad;
    } else {
      values = [pad, pad, pad, pad];
    }
  }

  if (padX) {
    values[1] = padX;
    values[3] = padX;
  }
  if (padY) {
    values[0] = padY;
    values[2] = padY;
  }

  if (padTop) values[0] = padTop;
  if (padRight) values[1] = padRight;
  if (padBottom) values[2] = padBottom;
  if (padLeft) values[3] = padLeft;

  const hasBorder = !!(borderColor || borderSide);
  values = values.map(v => {
    return v === 0 ? "0px" : unit * v - Number(hasBorder) + "px";
  });
  return `padding: ${values.join(" ")};`;
};
const generatePropsToSize = (propName, cssProperty) => {
  cssProperty = cssProperty || propName;
  return applyWhenTruthy(propName, value => {
    if (value === "remaining") return "flex: 1;";
    if (value === "full") return `${cssProperty}: 100%;`;

    return `${cssProperty}: ${unitize(widths[value]) || value};`;
  });
};
const propsToMinHeight = generatePropsToSize("minHeight", "min-height");
const propsToHeight = generatePropsToSize("height");
const propsToWidth = generatePropsToSize("width");

const Container = styled.div`
  ${propsToDisplay} ${propsToBackground} ${propsToBorder} ${propsToColor} ${propsToPadding} ${propsToMinHeight} ${propsToHeight} ${propsToWidth} ${props =>
  cursorTypes[props.cursor]};  ;
`;
Container.borderSides = Object.keys(borderSideToPixelsMap);
Container.displayName = "Container";
Container.propTypes = {
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderSide: PropTypes.oneOf(Container.borderSides),
  contentColor: PropTypes.string,

  pad: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  padX: PropTypes.number,
  padY: PropTypes.number,
  padTop: PropTypes.number,
  padRight: PropTypes.number,
  padBottom: PropTypes.number,
  padLeft: PropTypes.number,

  minHeight: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  cursor: PropTypes.string
};

export default Container;

export const ContainerGroup = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  ${props => (props.vertical ? "flex-direction: column" : "")};
`;
