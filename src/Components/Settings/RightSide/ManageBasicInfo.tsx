import { Formik, FormikProps } from "formik";
import { Box, Button, Grid } from "@material-ui/core";
import { FormTextField } from "Components/Shared/TextField";
import React from "react";
import _ from "lodash";
import { useParams } from "react-router";
import { SettingsPages } from "Components/Settings";
import { useCurrentUser } from "lib/useCurrentUser";
import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";
import * as Yup from "yup";
import { name } from "utils/validationProperties";
import { distances } from "styles";

interface FormProps {
  name: string;
}

const buildValidationSchema: Yup.ObjectSchema = Yup.object<FormProps>().shape({
  name
});

export const ManageBasicInfo = () => {
  const { settingsPageKey } = useParams();
  const { currentUser } = useCurrentUser();
  const { pushSnackbar } = useSnackbar();

  const onSubmit = ({ name }: FormProps) => {
    if (currentUser) {
      currentUser
        .updateProfile({ displayName: name })
        .then(() => {
          pushSnackbar("Your name has been changed.", "success");
        })
        .catch(error => {
          const errorMessage = error.message;
          pushSnackbar(errorMessage, "error");
        });
    }
  };

  return SettingsPages.UpdateBasicInfo === settingsPageKey ? (
    <Formik
      onSubmit={onSubmit}
      validationSchema={buildValidationSchema}
      initialValues={{
        name: _.get(currentUser, "displayName") || "",
        email: _.get(currentUser, "email") || ""
      }}
      render={({ handleSubmit }: FormikProps<FormProps>): JSX.Element => (
        <Grid item xs={8}>
          <Box display="grid" marginTop={distances.px.medium}>
            <FormTextField
              name="name"
              fullWidth
              label="Name"
              variant="outlined"
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
            Save changes
          </Button>
        </Grid>
      )}
    />
  ) : null;
};
