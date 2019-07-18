import React from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

function LoginForm({ values, errors, touched, isSubmitting }) {
  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);
  console.log("isSubmitting", isSubmitting);
  return (
    <Form>
      <div>
        <Field type="text" name="username" placeholder="Username" />
        <p className="error-text">{touched.username && errors.username}</p>
      </div>
      <div>
        <Field type="email" name="email" placeholder="Email" />
        <p className="error-text">{touched.email && errors.email}</p>
      </div>
      <div>
        <Field type="password" name="password" placeholder="Password" />
        <p className="error-text">{touched.password && errors.password}</p>
      </div>
      {/* <div>
        <Field component="select" name="plan"  />
        <p className="error-text">{touched.password && errors.password}</p>
      </div> */}
      <div>
        <label>
          <Field type="checkbox" name="tos" checked={values.tos} />
          {/* <p className="error-text">{touched.tos && errors.tos}</p> */}
        </label>
      </div>
      <button disabled={isSubmitting}>Submit</button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: () => {
    return {
      username: "",
      email: "",
      password: "",
      tos: false
    };
  },
  handleSubmit: (values, formikBag) => {
    formikBag.resetForm();
    console.log("handle values", values);
    const url = " https://reqres.in/api/users";
    formikBag.setSubmitting(true);
    axios
      .post(url, values)
      .then(res => {
        console.log("res data", res.data);
        window.alert("Submitted! Welcome " + res.data.username);
        formikBag.setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
        formikBag.setSubmitting(false);
      });
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("you need a username"),
    email: Yup.string()
      .email("Email is not valid")
      .required("you have to put down an email"),
    password: Yup.string()
      .min(6)
      .max(16)
      .required("you need a password")
    // tos: Yup.boolean()
    //   .label()
    //   .test("check it")
  })
})(LoginForm);
// export default LoginForm;
