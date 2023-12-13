import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../services/css/counselling.css";
import "../services/css/mediaScreen.css";
import { useState } from "react";

const validationSchema = Yup.object().shape({
    crtName: Yup.string().required("Please Fill up this One"),
    crtYr: Yup.string().required("Please Fill Up this One"),
});

export const Certifications = () => {
    const initialValues = {
        crtName: "",
        crtYr: "",
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
                  <h2 style={{ color: "white" }}>Add Certifications</h2>
  
                  <div className="project">
                    <label htmlFor="crtName">
                      <p>
                      Certification Name: <span style={{ color: "red" }}>*</span>
                      </p>
  
                      <Field
                        type="text"
                        id="crtName"
                        placeholder="Enter name of Certification Name"
                        name="crtName"
                      />
                    </label>
                    <ErrorMessage
                      name="crtName"
                      className="error"
                      component="div"
                    />
                  </div>
  
                  <div className="gender_radio">
                    <label htmlFor="crtYr">
                      <p>
                        Which Year: <span style={{ color: "red" }}>*</span>
                      </p>
  
                      <Field type="number" name="crtYr" id="crtYr" />

                      
                    </label>
                  </div>
                  <ErrorMessage
                      name="crtYr"
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
