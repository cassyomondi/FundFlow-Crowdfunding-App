import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
    // Later → send via axios to backend
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Create a Campaign</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label>Title</label>
            <Field name="title" />
            <ErrorMessage name="title" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label>Description</label>
            <Field as="textarea" name="description" />
            <ErrorMessage name="description" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label>Goal Amount</label>
            <Field type="number" name="goal" />
            <ErrorMessage name="goal" component="div" style={{ color: "red" }} />
          </div>

          <button type="submit">Create Campaign</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateCampaign;
