import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../services/css/counselling.css";
import "../services/css/mediaScreen.css";

const validationSchema = Yup.object().shape({
    resumeSummary: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Summary is required"),
});

export const ResumeHeadline = () => {
  const initialValues = {
    resumeSummary: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);

    resetForm();
  };
  return (
    <div className="cover">
      <div className="c-small">
        <div className="containerCoun">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="form">
                <h2 style={{ color: "white" }}>Summary </h2>
                <div className="project">
                  <label style={{fontSize:"20px"}} htmlFor="Name">
                  Resume headline</label>
                  <p style={{color:'#fff',fontSize:"15px",marginBottom:"10px"}}>It is the first thing recruiters notice in your profile. Write concisely what makes you unique and right person for the job you are looking for.</p>
                    <Field 
                    as="textarea"
                      id="resumeSummary"
                      rows="5" cols="70"
                      placeholder="Minimum 5 words. Sample headlines: Sales Manager well versed in Excel and Dynamics CRM. Senior-level Interior Designer with expertise in 3D modeling."
                      name="resumeSummary"
                    />
                  
                  <ErrorMessage name="resumeSummary" className="error" component="div" />
                </div>

                <button type="submit" className="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
