import * as Yup from "yup";

const regPattern = /^\w+(.\w+)?@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;

export const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required!")
    .matches(regPattern, "Email must consist only english of letters!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .max(40, "Password must be less than 40 characters!")

    .required("Password is required!"),
});

export const registerFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Name must be at least 3 characters!")
    .max(20, "Name must be less than 20 characters!")
    // .matches(/^[A-Za-z]+$/, "Name must consist only of letters!")
    .required("Name is required!"),
  email: Yup.string()
    .required("Email is required!")
    .matches(regPattern, "Email must consist only english of letters!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .max(40, "Password must be less than 40 characters!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must be the same")
    .required("Is required!"),
});
