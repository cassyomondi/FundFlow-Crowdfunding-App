import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser, setAuthToken } from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);

  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    loginUser(values)
      .then((res) => {
        const { access_token, user } = res.data;
        setAuthToken(access_token);
        login(user, access_token);
        alert("Login successful!");
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Login failed");
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
