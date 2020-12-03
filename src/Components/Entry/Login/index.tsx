import { navigateTo } from "lib/routing";
import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";
import { colors, distances } from "styles";
import styled from "styled-components";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography
} from "@material-ui/core";
import { Formik, FormikProps } from "formik";
import React, { FC } from "react";
import * as Yup from "yup";
import { RightSide, LeftSide, Container } from "../StyledEntry";
import ArrowLeftIcon from "@material-ui/icons/ArrowBack";
import { email, password } from "utils/validationProperties";
import { FormTextField } from "Components/Shared/TextField";
import { useLogin } from "./useLogin";

export interface FormProps {
  email: string;
  password: string;
}

export const buildValidationSchema: Yup.ObjectSchema = Yup.object<
  FormProps
>().shape({
  email,
  password
});

const BackToWebsite = styled.a`
  position: absolute;
  top: ${distances.px.xxlarge};
  color: ${colors.fullWhite};
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Company = styled.a`
  position: absolute;
  bottom: ${distances.px.large};
  color: ${colors.fullWhite};
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const ForgotPassword = styled.a`
  display: inline-flex;
  flex-direction: column;
  text-align: left;
  margin-top: ${distances.px.xlarge};
  color: ${colors.fullWhite};
  text-decoration: none;
  cursor: pointer;
`;

export const Login: FC = () => {
  const {
    signInAnonymously,
    signInAnonymouslyLoading,
    signInWithEmailAndPassword,
    signInWithEmailAndPasswordLoading,
    isSignedInAnonymouslyOnce
  } = useLogin();

  const { pushSnackbar } = useSnackbar();

  return (
    <Formik
      onSubmit={signInWithEmailAndPassword}
      validationSchema={buildValidationSchema}
      initialValues={{
        email: "",
        password: ""
      }}
      render={({ handleSubmit }: FormikProps<FormProps>) => (
        <Container container>
          <Grid item xs={12} md={6}>
            <LeftSide>
              <BackToWebsite href={"https://practicegrammar.co"}>
                <ArrowLeftIcon style={{ fontSize: 16, marginRight: 4 }} />
                <Typography variant={"body1"}>Back to website</Typography>
              </BackToWebsite>

              <Box mb={8} textAlign="left" color={colors.fullWhite}>
                <Typography variant={"h3"} gutterBottom>
                  Welcome,
                </Typography>
                <Typography variant={"body1"}>
                  please login to use Practice Grammar or try it for free.
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
                <Typography variant={"subtitle2"}>PASSWORD</Typography>
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
              <Button
                color="primary"
                variant="contained"
                size="large"
                disabled={signInAnonymouslyLoading}
                onClick={() => handleSubmit()}
              >
                {signInWithEmailAndPasswordLoading ? (
                  <CircularProgress size={24} color={"secondary"} />
                ) : (
                  "Sign in"
                )}
              </Button>
              <Box
                p={2}
                textAlign="center"
                justifyContent="center"
                color={colors.fullWhite}
              >
                <Typography variant={"body2"}>Or</Typography>
              </Box>
              <Button
                color="inherit"
                variant="contained"
                size="large"
                disabled={signInAnonymouslyLoading}
                onClick={() => {
                  isSignedInAnonymouslyOnce
                    ? pushSnackbar(
                        "You can only use this option once. Please signup here to reaccess the app.",
                        "info",
                        {
                          label: "Sign up for free",
                          onClick: () => navigateTo("/signup")
                        }
                      )
                    : signInAnonymously();
                }}
              >
                {signInAnonymouslyLoading ? (
                  <CircularProgress size={24} color={"secondary"} />
                ) : (
                  "I don't have an account"
                )}
              </Button>
              <ForgotPassword>
                <Typography
                  variant={"body2"}
                  onClick={() => {
                    navigateTo("/signup");
                  }}
                >
                  {`Don't have an account?`} <b>Sign up.</b>
                </Typography>
                <Typography
                  variant={"body2"}
                  style={{ marginTop: distances.px.small }}
                  onClick={() => {
                    navigateTo("/forgotPassword");
                  }}
                >
                  Forgot password? <b>Reset password.</b>
                </Typography>
              </ForgotPassword>

              <Company>
                <Typography variant={"caption"}>
                  © 2019 Practice Grammar
                </Typography>
              </Company>
            </LeftSide>
          </Grid>
          <RightSide item md={6} />
        </Container>
      )}
    />
  );
};
