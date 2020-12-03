import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";
import { Button, Snackbar } from "@material-ui/core";
import React, { FC } from "react";
import { useCurrentUser } from "lib/useCurrentUser";

export const VerifyEmail: FC = () => {
  const { pushSnackbar } = useSnackbar();
  const { currentUser } = useCurrentUser();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      message="Please verify your email address."
      action={
        <Button
          color="primary"
          size="small"
          onClick={() => {
            currentUser &&
              currentUser
                .sendEmailVerification()
                .then(() => {
                  pushSnackbar(
                    "We've sent an email with a confirmation link to your email address.",
                    "success"
                  );
                })
                .catch(() => {
                  pushSnackbar(
                    "We've already sent you an email. Please check your inbox.",
                    "error"
                  );
                });
          }}
        >
          Send email
        </Button>
      }
      open={true}
    />
  );
};
