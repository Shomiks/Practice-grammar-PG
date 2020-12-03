import { Box, Button, Grid, Typography } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowBack";
import { Formik } from "formik";
import { parse } from "query-string";
import React, { FC, useState } from "react";
import { useLocation } from "react-router";
import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";
import styled from "styled-components";
import * as Yup from "yup";
import { navigateTo } from "lib/routing";
import { FormTextField } from "Components/Shared/TextField";
import { RightSide, LeftSide, Container } from "../StyledEntry";
import { colors, distances } from "styles";
import { firebase } from "lib/firebase";
import { password, repeatPassword } from "utils/validationProperties";

interface FormProps {
  email: string;
}

const buildValidationSchema: Yup.ObjectSchema = Yup.object<FormProps>().shape({
  password,
  repeatPassword
});

const BackToLogin = styled.div`
  position: absolute;
  top: ${distances.px.xxxlarge};
  color: ${colors.fullWhite};
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

export const ResetPassword: FC = () => {
  const [disableButton, setDisableButton] = useState(false);
  const { pushSnackbar } = useSnackbar();

  const location = useLocation();
  const { oobCode } = parse(location.search);

  const onSubmit = ({ password }: { password: string }) => {
    setDisableButton(true);
    firebase
      .auth()
      .confirmPasswordReset(oobCode as string, password)
      .then(() => {
        pushSnackbar(
          "Your password has been changed successfully! Please login to continue.",
          "success"
        );

        setTimeout(() => {
          navigateTo("/login");
        }, 5000);
      })
      .catch(() => {
        pushSnackbar(
          "Sorry, something went wrong there. Please try again.",
          "error"
        );
      })
      .finally(() => setDisableButton(false));
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={buildValidationSchema}
      initialValues={{
        password: "",
        repeatPassword: ""
      }}
      render={({ handleSubmit }) => (
        <Container container>
          <Grid item xs={12} md={6}>
            <LeftSide>
              <BackToLogin onClick={() => navigateTo("/login")}>
                <ArrowLeftIcon style={{ fontSize: 16, marginRight: 4 }} />
                <Typography variant={"body1"}>Back to sign in page</Typography>
              </BackToLogin>

              <Box mb={5} textAlign="left" color={colors.fullWhite}>
                <Typography variant={"h3"} gutterBottom>
                  Reset your password
                </Typography>
                <Typography variant={"body1"}>
                  We are going to send you an email with further instructions
                  after the request has been submitted.
                </Typography>
              </Box>
              <Box mb={3} display="grid" color={colors.fullWhite}>
                <Typography variant={"subtitle2"}>NEW PASSWORD</Typography>
                <FormTextField
                  name="password"
                  fullWidth
                  placeholder="Password"
                  variant="outlined"
                  type="password"
                  onKeyPress={e => {
                    if (e.key == "Enter") handleSubmit();
                  }}
                />
              </Box>
              <Box mb={3} display="grid" color={colors.fullWhite}>
                <Typography variant={"subtitle2"}>
                  CONFIRM NEW PASSWORD
                </Typography>
                <FormTextField
                  name="repeatPassword"
                  fullWidth
                  placeholder="Confirm password"
                  variant="outlined"
                  type="password"
                  onKeyPress={e => {
                    if (e.key == "Enter") handleSubmit();
                  }}
                />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  size="large"
                  disabled={disableButton}
                  onClick={() => handleSubmit()}
                >
                  Reset password
                </Button>
              </Box>
            </LeftSide>
          </Grid>
          <RightSide item md={6} />
        </Container>
      )}
    />
  );
};
