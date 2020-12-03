import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { useSnackbar as useNotistack, VariantType } from "notistack";
import React from "react";

type Action = {
  label: string;
  onClick(): void;
};

export const useSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useNotistack();

  const pushSnackbar = (
    message: string,
    variant: VariantType,
    action?: Action
  ) => {
    enqueueSnackbar(message, {
      preventDuplicate: true,
      autoHideDuration: 3000,
      variant,
      action: key => (
        <>
          {action && (
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          <IconButton
            key={key}
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar(key)}
          >
            <CloseIcon />
          </IconButton>
        </>
      ),
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
      }
    });
  };

  return {
    pushSnackbar
  };
};
