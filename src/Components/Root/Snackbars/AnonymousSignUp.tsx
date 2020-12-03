import { Button, Snackbar } from "@material-ui/core";
import { navigateTo } from "lib/routing";
import React, { FC } from "react";

export const AnonymousSignUp: FC = () => (
  <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    message="This is a demo. Please sign up if you want to unlock all features."
    action={
      <Button
        color="primary"
        size="small"
        onClick={() => navigateTo("/signup")}
      >
        Signup now
      </Button>
    }
    open={true}
  />
);
