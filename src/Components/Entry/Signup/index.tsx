import { Box, Button, Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Formik, FormikProps } from "formik";
import _ from "lodash";
import React, { FC } from "react";
import { navigateTo } from "lib/routing";
import { colors, distances } from "styles";
import styled from "styled-components";
import * as Yup from "yup";
import { FormTextField } from "Components/Shared/TextField";
import { RightSide, LeftSide, Container } from "../StyledEntry";
import { useSignup } from "./useSignup";
import {
  email,
  name,
  password,
  repeatPassword
} from "utils/validationProperties";

export interface FormProps {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
}

export const buildValidationSchema: Yup.ObjectSchema = Yup.object<
  FormProps
>().shape({
  email,
  name,
  password,
  repeatPassword
});

const SignInContainer = styled.div`
  display: inline-flex;
  text-align: left;
  margin-top: ${distances.px.xlarge};
  color: ${colors.fullWhite};
  text-decoration: none;
  cursor: pointer;
`;

export const Signup: FC = () => {
  const { signup, isLoading } = useSignup();

  return (
    <Formik
      onSubmit={values => signup(_.omit(values, ["repeatPassword"]))}
      validationSchema={buildValidationSchema}
      initialValues={{
        email: "",
        name: "",
        password: "",
        repeatPassword: ""
      }}
      render={({ handleSubmit }: FormikProps<FormProps>) => (
        <Container container>
          <Grid item xs={12} md={6}>
            <LeftSide>
              <Box mb={8} textAlign="left" color={colors.fullWhite}>
                <Typography variant={"h3"}>Welcome,</Typography>
                <Typography variant={"h5"}>
                  please signup to use the app.
                </Typography>
              </Box>
              <Box mb={3} display="grid" color={colors.fullWhite}>
                <Typography variant={"subtitle2"}>NAME</Typography>
                <FormTextField
                  name="name"
                  fullWidth
                  placeholder="Name"
                  variant="outlined"
                  onKeyPress={e => {
                    if (e.key == "Enter") handleSubmit();
                  }}
                />
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
                <Typography variant={"subtitle2"}>REPEAT PASSWORD</Typography>
                <FormTextField
                  name="repeatPassword"
                  fullWidth
                  placeholder="Repeat password"
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
                disabled={isLoading}
                onClick={() => handleSubmit()}
              >
                {isLoading ? (
                  <CircularProgress
                    size={25}
                    thickness={5}
                    color={"secondary"}
                  />
                ) : (
                  "Sign up"
                )}
              </Button>
              <SignInContainer
                onClick={() => {
                  navigateTo("/login");
                }}
              >
                <Typography variant={"body2"}>
                  Already have an account? <b>Sign in here.</b>
                </Typography>
              </SignInContainer>
            </LeftSide>
          </Grid>
          <RightSide item md={6} />
        </Container>
      )}
    />
  );
};
