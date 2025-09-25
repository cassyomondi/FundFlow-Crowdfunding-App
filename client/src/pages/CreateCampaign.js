import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createCampaign, setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateCampaign() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  const initialValues = {
    title: "",
    description: "",
    funding_goal: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    funding_goal: Yup.number()
      .typeError("Goal must be a number")
      .positive("Goal must be positive")
      .required("Goal amount is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (!token) {
      alert("You must be logged in to create a campaign.");
      return;
    }

    const payload = {
      title: values.title,
      description: values.description,
      funding_goal: Number(values.funding_goal),
      user_id: user.id,
    };

    createCampaign(payload, token)
      .then((response) => {
        alert("Campaign created successfully!");
        resetForm();
        navigate("/"); // 👈 redirect to home page
      })
      .catch((error) => {
        console.error(
          "Error creating campaign:",
          error.response?.data || error
        );
        alert(error.response?.data?.error || "Error creating campaign.");
      });
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "500px",
        margin: "2rem auto",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#2c3e50",
        }}
      >
        Create a Campaign
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "0.5rem", fontWeight: "500" }}>
              Title
            </label>
            <Field
              name="title"
              placeholder="Enter campaign title"
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
            <ErrorMessage
              name="title"
              component="div"
              style={{ color: "red", fontSize: "0.9rem", marginTop: "0.25rem" }}
            />
          </div>

          {/* Description */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "0.5rem", fontWeight: "500" }}>
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              placeholder="Describe your campaign"
              rows="4"
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
            <ErrorMessage
              name="description"
              component="div"
              style={{ color: "red", fontSize: "0.9rem", marginTop: "0.25rem" }}
            />
          </div>

          {/* Funding Goal */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "0.5rem", fontWeight: "500" }}>
              Funding Goal
            </label>
            <Field
              type="number"
              name="funding_goal"
              placeholder="e.g. 5000"
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
            <ErrorMessage
              name="funding_goal"
              component="div"
              style={{ color: "red", fontSize: "0.9rem", marginTop: "0.25rem" }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "0.85rem",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#3498db",
              color: "white",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            Create Campaign
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateCampaign;
