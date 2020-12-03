import { Formik, FormikProps } from "formik";
import React, { FC } from "react";
import { useSignup } from "Components/Entry/Signup/useSignup";
import { FormProps, buildValidationSchema } from "Components/Entry/Signup";
import { navigateTo } from "lib/routing";
import styled from "styled-components";
import { colors } from "styles/colors";
import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { distances } from "styles";

import { FormTextField } from "Components/Shared/TextField";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: ${distances.px.xxxlarge} ${distances.px.xxlarge}
    ${distances.px.xxlarge};
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

const TitleTypography = styled(Typography)`
  && {
    font-weight: bold;
  }
`;

export const Signup: FC = () => {
  const { signup, isLoading } = useSignup();

  return (
    <Container>
      <Title>
        <Typography variant={"h5"}>Proceed with your</Typography>
        <TitleTypography variant={"h4"}>Signup</TitleTypography>
      </Title>

      <Formik
        onSubmit={signup}
        validationSchema={buildValidationSchema}
        initialValues={{
          email: "",
          name: "",
          password: "",
          repeatPassword: ""
        }}
        render={({ handleSubmit }: FormikProps<FormProps>) => (
          <Form>
            <Typography variant={"subtitle2"}>NAME</Typography>
            <FormTextField
              name="name"
              fullWidth
              placeholder="Name"
              onKeyPress={e => {
                if (e.key == "Enter") handleSubmit();
              }}
            />
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
            <Typography variant={"subtitle2"}>REPEAT PASSWORD</Typography>
            <FormTextField
              name="repeatPassword"
              fullWidth
              placeholder="Repeat password"
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
              {isLoading ? (
                <CircularProgress size={24} color={"secondary"} />
              ) : (
                "Sign up"
              )}
            </Button>
            <Box
              display={"flex"}
              justifyContent={"center"}
              pt={"8%"}
              color={colors.grey300}
            >
              <Typography
                onClick={() => navigateTo("/login")}
                variant={"subtitle1"}
              >
                Already have an account? <b>Sign in</b>
              </Typography>
            </Box>
          </Form>
        )}
      />
    </Container>
  );
};
