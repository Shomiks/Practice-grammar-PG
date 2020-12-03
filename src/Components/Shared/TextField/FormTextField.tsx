import { FormControl, FormHelperText } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import { Field, FieldProps } from "formik";
import React, { FC } from "react";

const formMaterialField = (Component: FC<TextFieldProps>) => {
  const wrapper = ({
    name = "",
    required,
    ...componentProps
  }: TextFieldProps) => (
    <Field
      name={name}
      render={({ form }: FieldProps) => {
        const isError = !!(form.errors[name] && form.touched[name]);
        return (
          <FormControl variant="outlined" margin="dense" error={isError}>
            <Component
              name={name}
              value={form.values[name]}
              error={isError}
              onChange={event => {
                form.setFieldValue(name, event.target.value);
                form.setFieldTouched(name);
              }}
              {...componentProps}
            />

            <FormHelperText data-cy={`inputError-${name}`}>
              {isError && form.errors[name]}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );

  return wrapper;
};

export { formMaterialField };
