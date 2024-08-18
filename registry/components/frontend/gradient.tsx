import { CSSProperties } from "react";

type Type = "circle" | "ellipse";

type Origin =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

interface RadialProps {
  /**
   * The type of radial gradient
   * @default circle
   * @type string
   */
  type?: Type;
  /**
   * The color to transition from
   * @default #00000000
   * @type string
   * */
  from?: string;

  /**
   * The color to transition to
   * @default #290A5C
   * @type string
   * */
  to?: string;

  /**
   * The size of the gradient in pixels
   * @default 300
   * @type number
   * */
  size?: number;

  /**
   * The origin of the gradient
   * @default center
   * @type string
   * */
  origin?: Origin;

  /**
   * The class name to apply to the gradient
   * @default ""
   * @type string
   * */
  className?: string;
}

const RadialGradient = ({
  type = "circle",
  from = "hsla(263, 80%, 20%, 1)",
  to = "hsla(0, 0%, 0%, 0)",
  size = 300,
  origin = "center",
  className,
}: RadialProps) => {
  const styles: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    inset: 0,
    backgroundImage: `radial-gradient(${type} ${size}px at ${origin}, ${from}, ${to})`,
  };

  return <div className={className} style={styles} />;
};

type Direction =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

interface LinearGradientProps {
  /**
   * The color to transition from
   * @default #00000000
   * @type string
   * */
  from?: string;

  /**
   * The color to transition to
   * @default #290A5C
   * @type string
   * */
  to?: string;

  /**
   * The width of the gradient
   * @default 100%
   * @type string
   * */
  width?: string;

  /**
   * The height of the gradient
   * @default 100%
   * @type string
   * */
  height?: string;

  /**
   * The direction of the gradient
   * @default bottom
   * @type string
   * */
  direction?: Direction;

  /**
   * The point at which the transition occurs
   * @default 50%
   * @type string
   * */
  transitionPoint?: string;

  /**
   * The class name to apply to the gradient
   * @default ""
   * @type string
   * */
  className?: string;
}

const LinearGradient = ({
  from = "#00000000",
  to = "#290A5C",
  width = "100%",
  height = "100%",
  transitionPoint = "50%",
  direction = "bottom",
  className,
}: LinearGradientProps) => {
  const styles: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    inset: 0,
    width: width,
    height: height,
    background: `linear-gradient(to ${direction}, ${from}, ${transitionPoint}, ${to})`,
  };
  return <div className={className} style={styles} />;
};

export { RadialGradient, LinearGradient };
