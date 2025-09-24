import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "../services/api";
import { AuthContext, setAuthToken } from "../context/AuthContext";

function Register() {
  const { login } = useContext(AuthContext);

  const initialValues = { username: "", email: "", password: "" };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 chars").required("Required"),
  });

  const handleSubmit = (values) => {
    createUser(values)
      .then((res) => {
        alert("Registration successful! Please log in.");
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Error registering user");
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="username" placeholder="Username" />
          <ErrorMessage name="username" component="div" />
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
