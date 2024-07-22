import { Field, FormikProps, Form, Formik, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

import s from "./LoginPage.module.scss";
import Logo from "../../images/icons/logo.svg";

import Password from "../../components/Icons/PasswordIcon";
import Email from "../../components/Icons/EmailIcon";

import { loginThunk } from "../../redux/auth/operations";
import { loginFormSchema } from "../../schemas/validatorLogin";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = (FormikProps<LoginFormValues>) => {
  const dispatch = useDispatch();

  const handleSubmit = (dispatch: any, values: LoginFormValues) => {
    dispatch(loginThunk(values));
  };

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <div className={s.main}>
      <div className={s.wrapper}>
        <div className={s.title_wrap}>
          <img src={Logo} alt="logo" className={s.logo} />
          <h1 className={s.title}>Money Guard</h1>
        </div>

        <div className={s.formik}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginFormSchema}
            onSubmit={handleSubmit}
          >
            <Form className={s.form}>
              <ul className={s.list}>
                <li>
                  <div className={s.input_wrap}>
                    <label className={s.label}>
                      <div className={s.icon}>
                        <Email  />
                      </div>
                    </label>
                    <div className={s.error_wrap}>
                      <Field
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        className={s.input}
                      />
                      <ErrorMessage
                        className={s.error}
                        name="email"
                        component="span"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className={s.input_wrap}>
                    <label className={s.label}>
                      <div className={s.icon}>
                        <Password />
                      </div>
                    </label>
                    <div className={s.error_wrap}>
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={s.input}
                      />
                      <ErrorMessage
                        className={s.error}
                        name="password"
                        component="span"
                      />
                    </div>
                  </div>
                </li>
              </ul>

              <div className={s.btn_wrapper}>
                <button type="submit" className={s.login_btn}>
                  LOG IN
                </button>
                <Link className={s.register_btn} to="/register">
                  REGISTER
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
