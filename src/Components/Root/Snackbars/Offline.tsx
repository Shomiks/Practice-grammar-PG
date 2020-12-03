import React, { FC } from "react";
import { Snackbar } from "@material-ui/core";

export const Offline: FC = () => (
  <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    message="You are currently offline. Please check your internet connection."
    open={true}
  />
);
