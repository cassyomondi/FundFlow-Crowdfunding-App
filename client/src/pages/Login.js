import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- add this

  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    const result = await login(values); // call async login from context
    if (result.success) {
      alert("Login successful!");
      navigate("/"); // <-- redirect to home page (or campaigns page)
    } else {
      alert(result.error);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "2rem auto", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Field name="email" type="email" placeholder="Email" style={inputStyle} />
          <ErrorMessage name="email" component="div" style={errorStyle} />

          <Field name="password" type="password" placeholder="Password" style={inputStyle} />
          <ErrorMessage name="password" component="div" style={errorStyle} />

          <button type="submit" style={buttonStyle}>Login</button>
        </Form>
      </Formik>
    </div>
  );
}

const inputStyle = {
  padding: "0.75rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const errorStyle = { color: "red", fontSize: "0.9rem" };

const buttonStyle = {
  padding: "0.85rem",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#1976d2",
  color: "white",
  fontWeight: "600",
  fontSize: "1rem",
  cursor: "pointer",
};

export default Login;
