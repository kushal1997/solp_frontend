import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../services/css/counselling.css";
import "../services/css/mediaScreen.css";
import { useState } from "react";

const validationSchema = Yup.object().shape({
    prName: Yup.string().required("Please Fill Up this One"),

    prFrom: Yup.string().required("Please Fill up this One"),
    prDesc: Yup.string().required("Please Fill Up this One"),
});

export const ProjectForm = () => {
  const initialValues = {
    prName: "",

    prFrom: "",
    prTo: "",
    prDesc: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);

    resetForm();
  };
  return (
    <div className="covers">
      <div className="c-small">
        <div className="containerCoun">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="form">
                <h2 style={{ color: "white" }}>Add Project</h2>

                <div className="project">
                  <label htmlFor="prName">
                    <p>
                      Project Name: <span style={{ color: "red" }}>*</span>
                    </p>

                    <Field
                      type="text"
                      id="prName"
                      placeholder="Enter name of Project Name"
                      name="prName"
                    />
                  </label>
                  <ErrorMessage
                    name="prName"
                    className="error"
                    component="div"
                  />
                </div>

                <div className="gender_radio">
                  <label htmlFor="prFrom">
                    <p>
                      Start Date: <span style={{ color: "red" }}>*</span>
                    </p>

                    <Field type="month" name="prFrom" id="prFrom" />
                    
                  </label>
                  
                  <label htmlFor="prTo">
                    <p>
                      End Date: 
                    </p>
                    <Field type="month" name="prTo" id="prTo" />
                  </label>
                </div>

                

                <div className="project detail_project">
                  <label htmlFor="prDesc">Project Details</label>
                  <Field
                    as="textarea"
                    name="prDesc"
                    id="prDesc"
                    rows="4" // You can adjust the number of rows as needed
                    cols="50"
                    placeholder="Type Here..." // You can adjust the number of columns as needed
                  />
                  
                </div>
                <ErrorMessage
                    name="prDesc"
                    className="error"
                    component="div"
                  />

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
