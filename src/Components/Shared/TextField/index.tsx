import React, { FC } from "react";

import { withStyles } from "@material-ui/core";
import TextFieldMui, { TextFieldProps } from "@material-ui/core/TextField";
import { formMaterialField } from "./FormTextField";
import { colors } from "styles";

const StyledTextField = withStyles({
  root: {
    "& fieldset": {
      background: colors.fullWhite
    },
    "& input": {
      zIndex: 1
    }
  }
})(TextFieldMui);

export const TextField: FC<TextFieldProps> = props => (
  <StyledTextField {...props} />
);

export const FormTextField = formMaterialField(TextField);
