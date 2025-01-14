import * as yup from "yup"

export const changePasswordSchema = yup.object().shape({
  password: yup.string().required("Required").trim().min(6, "Min. 6 characters"),
  passwordConfirmation: yup.string().oneOf([yup.ref("password")], "Password must match"),
})
