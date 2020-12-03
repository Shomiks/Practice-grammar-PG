import React, { FC } from "react";
import {
  buildStyles,
  CircularProgressbar as CircularProgressbarComponent
} from "react-circular-progressbar";
import { colors } from "styles";

interface CircularProgressbarProps {
  value: number;
  isMobile?: boolean;
}

export const CircularProgressbar: FC<CircularProgressbarProps> = ({
  value
}) => (
  <CircularProgressbarComponent
    value={value}
    text={`${value}%`}
    strokeWidth={6}
    styles={buildStyles({
      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: "round",
      // Text size
      textSize: "16px",

      // How long animation takes to go from one percentage to another, in seconds
      pathTransitionDuration: 0.5,

      // Colors
      pathColor: colors.teal,
      textColor: colors.teal,
      trailColor: colors.grey50
    })}
  />
);
