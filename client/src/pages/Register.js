import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const initialValues = { username: "", email: "", password: "" };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  });

  const handleSubmit = (values) => {
    createUser(values)
      .then((res) => {
        alert("Registration successful! Please log in.");
        navigate("/login"); // redirect to login page
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Error registering user");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={styles.form}>
          <Field name="username" placeholder="Username" style={styles.input} />
          <ErrorMessage name="username" component="div" style={styles.error} />

          <Field name="email" type="email" placeholder="Email" style={styles.input} />
          <ErrorMessage name="email" component="div" style={styles.error} />

          <Field name="password" type="password" placeholder="Password" style={styles.input} />
          <ErrorMessage name="password" component="div" style={styles.error} />

          <button type="submit" style={styles.button}>Register</button>
        </Form>
      </Formik>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "400px",
    margin: "2rem auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#1976d2",
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { padding: "0.75rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem" },
  error: { color: "red", fontSize: "0.85rem" },
  button: {
    padding: "0.85rem",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default Register;
