import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../services/css/counselling.css";
import "../services/css/mediaScreen.css";
import { useState } from "react";

const validationSchema = Yup.object().shape({
    avName: Yup.string().required("Please Fill Up this One"),

    evName: Yup.string().required("Please Fill up this One"),
    aYear: Yup.string().required("Please Fill Up this One"),
});

export const Achivement = () =>  {
    const initialValues = {
        avName: "",
  
        evName: "",
        aPlace: "",
        aYear: "",
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
                  <h2 style={{ color: "white" }}>Add Achivements</h2>
  
                  <div className="project">
                    <label htmlFor="avName">
                      <p>
                      Achivement Name: <span style={{ color: "red" }}>*</span>
                      </p>
  
                      <Field
                        type="text"
                        id="avName"
                        placeholder="Enter name of Achivement Name"
                        name="avName"
                      />
                    </label>
                    <ErrorMessage
                      name="avName"
                      className="error"
                      component="div"
                    />
                  </div>

                  <div className="project">
                    <label htmlFor="evName">
                      <p>
                      Event Name: <span style={{ color: "red" }}>*</span>
                      </p>
  
                      <Field
                        type="text"
                        id="evName"
                        placeholder="Enter name of Event Name"
                        name="evName"
                      />
                    </label>
                    <ErrorMessage
                      name="evName"
                      className="error"
                      component="div"
                    />
                  </div>

                  <div className="project">
                    <label htmlFor="aPlace">
                      <p>
                      Event Location:
                      </p>
  
                      <Field
                        type="text"
                        id="aPlace"
                        placeholder="Enter name of Event Location"
                        name="aPlace"
                      />
                    </label>
                    <ErrorMessage
                      name="aPlace"
                      className="error"
                      component="div"
                    />
                  </div>
  
                  <div className="gender_radio">
                    <label htmlFor="aYear">
                      <p>
                        Which Year: <span style={{ color: "red" }}>*</span>
                      </p>
  
                      <Field type="number" name="aYear" id="aYear" />

                      
                    </label>
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
