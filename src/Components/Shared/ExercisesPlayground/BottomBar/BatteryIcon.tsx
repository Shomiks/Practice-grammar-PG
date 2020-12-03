import React, { FC } from "react";
import {
  Battery20,
  Battery30,
  Battery50,
  Battery60,
  Battery80,
  Battery90,
  BatteryFull,
  BatteryAlert,
  BatteryUnknown
} from "@material-ui/icons";

interface BatteryIconProps {
  percentage: number | string;
}

const BatteryIcon: FC<BatteryIconProps> = ({ percentage }) => {
  if (percentage === 0) return <BatteryAlert />;
  if (percentage <= 20) return <Battery20 />;
  if (percentage <= 30) return <Battery30 />;
  if (percentage <= 50) return <Battery50 />;
  if (percentage <= 60) return <Battery60 />;
  if (percentage <= 80) return <Battery80 />;
  if (percentage <= 90) return <Battery90 />;
  if (percentage <= 100) return <BatteryFull />;
  return <BatteryUnknown />;
};

export { BatteryIcon };
