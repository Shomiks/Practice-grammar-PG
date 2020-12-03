import * as Yup from "yup";

export const email = Yup.string()
  .email("Please enter correct email address")
  .required("The field is required.");
export const password = Yup.string()
  .min(8, "The password must be at least 8 characters long.")
  .max(200, "The password cannot contain more than 200 characters.")
  .required("The field is required.");
export const name = Yup.string()
  .min(2, "Name must be at least 2 characters long.")
  .max(100, "Name cannot contain more than 100 characters.")
  .required("The field is required.");
export const repeatPassword = Yup.string()
  .min(8, "The password must be at least 8 characters long.")
  .max(200, "The password cannot contain more than 200 characters.")
  .oneOf(
    [Yup.ref("password"), null],
    "The entered passwords are not identical."
  )
  .required("The field is required.");
export const repeatNewPassword = Yup.string()
  .min(8, "The password must be at least 8 characters long.")
  .max(200, "The password cannot contain more than 200 characters.")
  .oneOf(
    [Yup.ref("newPassword"), null],
    "The entered passwords are not identical."
  )
  .required("The field is required.");
