import { Formik, FormikProps } from "formik";
import React, { FC } from "react";
import { useLogin } from "Components/Entry/Login/useLogin";
import { navigateTo } from "lib/routing";
import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";
import { distances } from "styles";
import styled from "styled-components";
import { colors } from "styles/colors";
import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { buildValidationSchema, FormProps } from "Components/Entry/Login";
import logo from "./login_logo.png";

import { FormTextField } from "Components/Shared/TextField";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${distances.px.xxlarge} ${distances.px.xxlarge};
`;

const Logo = styled.div`
  width: 100%;
  padding: 16% 0 8% 0;
  display: flex;
  justify-content: left;
`;
const Title = styled.div`
  width: 100%;
  text-align: left;
  padding-bottom: 20%;
`;
const Form = styled.div`
  width: 100%;
  display: grid;
`;

const LogoImage = styled.img.attrs({
  src: logo
})`
  width: 92px;
  height: 92px;
`;

const TitleTypography = styled(Typography)`
  && {
    font-weight: bold;
  }
`;

export const Login: FC = () => {
  const {
    signInWithEmailAndPassword,
    signInWithEmailAndPasswordLoading,
    signInAnonymously,
    signInAnonymouslyLoading,
    isSignedInAnonymouslyOnce
  } = useLogin();

  const { pushSnackbar } = useSnackbar();

  return (
    <Container>
      <Logo>
        <LogoImage />
      </Logo>
      <Title>
        <Typography variant={"h5"}>Proceed with your</Typography>
        <TitleTypography variant={"h4"}>Login</TitleTypography>
      </Title>

      <Formik
        onSubmit={signInWithEmailAndPassword}
        validationSchema={buildValidationSchema}
        initialValues={{
          email: "",
          password: ""
        }}
        render={({ handleSubmit }: FormikProps<FormProps>) => (
          <Form>
            <Typography variant={"subtitle2"}>EMAIL</Typography>
            <FormTextField
              name="email"
              fullWidth
              placeholder="Email"
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
              type="password"
              onKeyPress={e => {
                if (e.key == "Enter") handleSubmit();
              }}
            />
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={() => handleSubmit()}
            >
              {signInWithEmailAndPasswordLoading ? (
                <CircularProgress size={24} color={"secondary"} />
              ) : (
                "Login"
              )}
            </Button>
            <Box
              display={"flex"}
              justifyContent={"center"}
              pt={"8%"}
              color={colors.grey300}
            >
              <Typography
                onClick={() => navigateTo("/signup")}
                variant={"subtitle1"}
              >
                {`Don't have an account? `}
                <b>Sign up</b>.
              </Typography>
            </Box>
            <br />
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
          </Form>
        )}
      />
    </Container>
  );
};
