import { useParams } from "react-router";
import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";
import { SettingsPages } from "../index";
import _ from "lodash";
import * as Yup from "yup";
import { password, repeatNewPassword } from "utils/validationProperties";
import { Formik, FormikProps, FormikActions } from "formik";
import { FormTextField } from "Components/Shared/TextField";
import { Box, Button, Grid } from "@material-ui/core";
import React from "react";
import { distances } from "styles";
import { useCurrentUser } from "lib/useCurrentUser";
import { firebase } from "lib/firebase";

interface FormProps {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}

const buildValidationSchema: Yup.ObjectSchema = Yup.object<FormProps>().shape({
  password,
  newPassword: password,
  repeatNewPassword
});

export const ChangePassword = () => {
  const { settingsPageKey } = useParams();
  const { currentUser } = useCurrentUser();
  const { pushSnackbar } = useSnackbar();

  const onSubmit = ({
    password,
    newPassword,
    resetForm
  }: FormProps & FormikActions<FormProps>) => {
    if (currentUser) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        _.get(currentUser, "email") || "",
        password
      );

      currentUser
        .reauthenticateWithCredential(credential)
        .then(({ user }) => {
          user &&
            user
              .updatePassword(newPassword)
              .then(() => {
                pushSnackbar("Your password has been changed.", "success");
                resetForm();
              })
              .catch(error => {
                const errorMessage = error.message;
                pushSnackbar(errorMessage, "error");
              });
        })
        .catch(error => {
          const errorMessage = error.message;

          pushSnackbar(errorMessage, "error");
        });
    }
  };

  return SettingsPages.UpdatePassword === settingsPageKey ? (
    <Formik
      onSubmit={(values, formikActions) =>
        onSubmit({ ...values, ...formikActions })
      }
      validationSchema={buildValidationSchema}
      initialValues={{
        password: "",
        newPassword: "",
        repeatNewPassword: ""
      }}
      render={({ handleSubmit }: FormikProps<FormProps>): JSX.Element => (
        <Grid item xs={8}>
          <Box display="grid" paddingTop={distances.px.medium}>
            <FormTextField
              name="password"
              fullWidth
              label="Old password"
              variant="outlined"
              type="password"
              margin="dense"
              onKeyPress={e => {
                if (e.key == "Enter") handleSubmit();
              }}
            />
            <FormTextField
              name="newPassword"
              fullWidth
              label="New password"
              variant="outlined"
              type="password"
              margin="dense"
              onKeyPress={e => {
                if (e.key == "Enter") handleSubmit();
              }}
            />
            <FormTextField
              name="repeatNewPassword"
              fullWidth
              label="Repeat new password"
              variant="outlined"
              type="password"
              margin="dense"
              onKeyPress={e => {
                if (e.key == "Enter") handleSubmit();
              }}
            />
          </Box>
          <Button
            color="primary"
            fullWidth
            variant="contained"
            size="medium"
            onClick={() => handleSubmit()}
          >
            Change password
          </Button>
        </Grid>
      )}
    />
  ) : null;
};
