import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../services/css/counselling.css";
import "../services/css/mediaScreen.css";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  curEmp: Yup.string().required("Please Fill Up this One"),

  empTyp: Yup.string().required("Please Fill Up this One"),
  cComp: Yup.string().required("Please Fill Up this One"),
  cDesig: Yup.string().required("Please Fill Up this One"),

  empTypeP: Yup.string().required("Please Fill Up this One"),
  pComp: Yup.string().required("Please Fill Up this One"),
  pDesig: Yup.string().required("Please Fill Up this One"),
});

export const Education = () => {
  const initialValues = {
    education: "",

    cComp: "",
    cDesig: "",
    sDate: "",
    jProf: "",

    empTypeP: "",
    pComp: "",
    pDesig: "",
    sDateP: "",
    eDateP: "",
    jProfP: "",
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
                <h2 style={{ color: "white" }}>Add Education</h2>

                <div className="project">
                  <label htmlFor="education">
                  Education:
                    <Field
                      as="select"
                      name="education"
                      id="education"
                    >
                    <option >Choose An Option</option>
                      <option value="10th">10th</option>
                      <option value="12th">12th</option>
                    </Field>
                  </label>
                </div>

                {values.education === "10th"  && (
                  <div>

                    <div className="project">
                      <label htmlFor="board">
                        <p>
                          Board:{" "}
                          <span style={{ color: "red" }}>*</span>
                        </p>

                        <Field
                          type="text"
                          id="board"
                          placeholder="Enter name of Board"
                          name="board"
                        />
                      </label>
                      <ErrorMessage
                        name="board"
                        className="error"
                        component="div"
                      />
                    </div>

                    <div className="project">
                      <label htmlFor="cDesig">
                        <p>
                          Current Designation:{" "}
                          <span style={{ color: "red" }}>*</span>
                        </p>
                        <Field
                          type="text"
                          id="cDesig"
                          placeholder="Enter your Current Designation"
                          name="cDesig"
                        />
                      </label>
                      <ErrorMessage
                        name="cDesig"
                        className="error"
                        component="div"
                      />
                    </div>

                    <div className="gender_radio">
                      <label htmlFor="sDate">
                        Start Date:
                        <Field type="month" name="jDate" id="jDate" />
                      </label>
                    </div>

                    <div className="project detail_project">
                      <label htmlFor="jProf">Job Profile</label>
                      <Field
                        as="textarea"
                        name="jProf"
                        id="jProf"
                        rows="4" // You can adjust the number of rows as needed
                        cols="50"
                        placeholder="Type Here..." // You can adjust the number of columns as needed
                      />
                    </div>
                  </div>
                )}

                {values.curEmp === "No" && (
                  <div>
                    <div className="gender_radio">
                      <label htmlFor="empTypeP">
                        Employment Type:
                        <Field
                          type="radio"
                          name="empTypeP"
                          value="FullTime"
                        />{" "}
                        Full Time
                        <Field type="radio" name="empTypeP" value="PartTime" />
                        Part Time
                        <Field
                          type="radio"
                          name="empTypeP"
                          value="Internship"
                        />
                        Internship
                      </label>
                    </div>

                    <div className="project">
                      <label htmlFor="pComp">
                        <p>
                          Previous Company Name:{" "}
                          <span style={{ color: "red" }}>*</span>
                        </p>

                        <Field
                          type="text"
                          id="pComp"
                          placeholder="Enter name of Previous Company"
                          name="pComp"
                        />
                      </label>
                      <ErrorMessage
                        name="pComp"
                        className="error"
                        component="div"
                      />
                    </div>

                    <div className="project">
                      <label htmlFor="pDesig">
                        <p>
                          Previous Designation:{" "}
                          <span style={{ color: "red" }}>*</span>
                        </p>
                        <Field
                          type="text"
                          id="pDesig"
                          placeholder="Enter your Previous Designation"
                          name="pDesig"
                        />
                      </label>
                      <ErrorMessage
                        name="pDesig"
                        className="error"
                        component="div"
                      />
                    </div>

                    <div className="gender_radio">
                      <label htmlFor="sDateP">
                        Start Date:
                        <Field type="month" name="jDate" id="jDate" />
                      </label>
                      <label htmlFor="eDateP">
                        End Date:
                        <Field type="month" name="wTill" id="wTill" />
                      </label>
                    </div>

                    <div className="project detail_project">
                      <label htmlFor="jProfP">Job Profile</label>
                      <Field
                        as="textarea"
                        name="jProfP"
                        id="jProfP"
                        rows="4" // You can adjust the number of rows as needed
                        cols="50"
                        placeholder="Type Here..." // You can adjust the number of columns as needed
                      />
                    </div>
                  </div>
                )}

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
