import { Paper } from "@material-ui/core";
import React, { FC } from "react";

export const ContentCard: FC = ({ children }) => (
  <Paper
    elevation={5}
    style={{
      height: "475px",
      position: "relative",
      width: "800px"
    }}
  >
    {children}
  </Paper>
);
