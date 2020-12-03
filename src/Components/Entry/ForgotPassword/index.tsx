import { Box, Button, Grid, Typography } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowBack";
import { Formik, FormikProps } from "formik";
import React, { FC } from "react";
import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";
import styled from "styled-components";
import * as Yup from "yup";
import { navigateTo } from "lib/routing";
import { FormTextField } from "Components/Shared/TextField";
import { RightSide, LeftSide, Container } from "../StyledEntry";
import { colors, distances } from "styles";
import { email } from "utils/validationProperties";
import { firebase } from "lib/firebase";

interface FormProps {
  email: string;
}

const buildValidationSchema: Yup.ObjectSchema = Yup.object<FormProps>().shape({
  email
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

export const ForgotPassword: FC = () => {
  const { pushSnackbar } = useSnackbar();

  const onSubmit = ({ email }: FormProps) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        pushSnackbar(
          "We've just sent you an email to reset your password.",
          "success"
        );
      })
      .catch(() => {
        pushSnackbar(
          "Sorry, something went wrong there. Please try again.",
          "error"
        );
      });
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={buildValidationSchema}
      initialValues={{
        email: ""
      }}
      render={({ handleSubmit }: FormikProps<FormProps>) => (
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
                <Typography variant={"subtitle2"}>EMAIL</Typography>
                <FormTextField
                  name="email"
                  fullWidth
                  placeholder="Email"
                  variant="outlined"
                  type="email"
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
                  onClick={() => handleSubmit()}
                >
                  Request a new password
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
