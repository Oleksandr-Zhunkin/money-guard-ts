import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import PasswordStrengthBar from "react-password-strength-bar-with-style-item";

import s from "./RegisterPage.module.scss";
import Logo from "../../images/icons/logo.svg";

import User from "../../components/Icons/UserIcon";
import Email from "../../components/Icons/EmailIcon";
import Password from "../../components/Icons/PasswordIcon";

import { registerThunk } from "../../redux/auth/operations";
import { registerFormSchema } from "../../schemas/validatorLogin";
import { useState } from "react";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    const credentials = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    dispatch(registerThunk(credentials));
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
            onSubmit={handleSubmit}
            validationSchema={registerFormSchema}
          >
            {({ handleChange }) => (
              <Form className={s.form}>
                <ul className={s.list}>
                  <li className={s.item}>
                    <div className={s.input_wrap}>
                      <label className={s.label}>
                        <div className={s.icon}>
                          <User />
                        </div>
                        <div className={s.error_wrap}>
                          <Field
                            name="username"
                            type="name"
                            placeholder="Name"
                            className={s.input}
                          />
                          <ErrorMessage
                            className={s.error}
                            name="username"
                            component="span"
                          />
                        </div>
                      </label>
                    </div>
                  </li>
                  <li className={s.item}>
                    <div className={s.input_wrap}>
                      <label className={s.label}>
                        <div className={s.icon}>
                          <Email />
                        </div>
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
                      </label>
                    </div>
                  </li>
                  <li className={s.item}>
                    <div className={s.input_wrap}>
                      <label className={s.label}>
                        <div className={s.icon}>
                          <Password />
                        </div>
                        <div className={s.error_wrap}>
                          <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={s.input}
                            onChange={(e) => {
                              handleChange(e);
                              setPassword(e.target.value);
                            }}
                            // onBlur={handleBlur}
                          />
                          <ErrorMessage
                            className={s.error}
                            name="password"
                            component="span"
                          />
                        </div>
                      </label>
                    </div>
                  </li>
                  <li className={s.item}>
                    <div className={s.input_wrap}>
                      <label className={s.label}>
                        <div className={s.icon}>
                          <Password />
                        </div>
                        <div className={s.error_wrap}>
                          <Field
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            className={s.input}
                            required
                          />
                          <ErrorMessage
                            className={s.error_confirm}
                            name="confirmPassword"
                            component="span"
                          />
                        </div>
                      </label>
                    </div>
                    <PasswordStrengthBar password={password} className="bar" />
                  </li>
                </ul>

                <ul className={s.btn_wrapper}>
                  <li>
                    <button type="submit" className={s.register_btn}>
                      REGISTER
                    </button>
                  </li>

                  <li>
                    <Link className={s.login_btn} to="/login">
                      LOG IN
                    </Link>
                  </li>
                </ul>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
