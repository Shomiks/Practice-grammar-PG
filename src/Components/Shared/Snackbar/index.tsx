import React, { SyntheticEvent } from "react";
import { colors, distances } from "styles";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SnackbarMUI from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const StyledSnackbarContent = styled(SnackbarContent)`
  && {
    background-color: ${({ variant }: { variant: string }): string => {
      if (variant === "success") return colors.green500;
      if (variant === "warning") return colors.manz800;
      if (variant === "error") return colors.warningRed600;
      return colors.teal300;
    }}
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${distances.px.small};
  opacity: 0.9;
`;

export interface Props {
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
}

function MySnackbarContentWrapper(props: Props) {
  const { message, onClose, variant } = props;
  const Icon = variantIcon[variant];

  return (
    <StyledSnackbarContent
      variant={variant}
      aria-describedby="client-snackbar"
      message={
        <Content>
          <IconContainer>
            <Icon />
          </IconContainer>
          {message}
        </Content>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}

export const Snackbar = () => {
  const [open, setOpen] = React.useState(true);

  // @ts-ignore
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return null;

    setOpen(false);
  };

  return (
    <SnackbarMUI
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MySnackbarContentWrapper
        onClose={handleClose}
        variant="info"
        message="This is a success message!"
      />
    </SnackbarMUI>
  );
};
