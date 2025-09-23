import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createCampaign } from "../services/api";

function CreateCampaign() {
  const initialValues = {
    title: "",
    description: "",
    goal: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    goal: Yup.number()
      .positive("Goal must be positive")
      .required("Goal amount is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    //Temporary: show alert
    alert(`Campaign Created!\n\nTitle: ${values.title}\nDescription: ${values.description}\nGoal: ${values.goal}`);

    resetForm(); // clear the form after submission

    // Uncomment this once backend /campaigns endpoint is live
    /*
    createCampaign(values)
    .then((response) => {
      alert("Campaign created successfully!");
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error creating campaign:", error);
    });
    */
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
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2c3e50" }}>
        Create a Campaign
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "0.5rem", fontWeight: "500" }}>Title</label>
            <Field
              name="title"
              placeholder="Enter campaign title"
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "1rem",
              }}
            />
            <ErrorMessage
              name="title"
              component="div"
              style={{ color: "red", fontSize: "0.9rem", marginTop: "0.25rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "0.5rem", fontWeight: "500" }}>Description</label>
            <Field
              as="textarea"
              name="description"
              placeholder="Describe your campaign"
              rows="4"
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
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

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "0.5rem", fontWeight: "500" }}>Goal Amount</label>
            <Field
              type="number"
              name="goal"
              placeholder="e.g. 5000"
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "1rem",
              }}
            />
            <ErrorMessage
              name="goal"
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
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
          >
            Create Campaign
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateCampaign;
