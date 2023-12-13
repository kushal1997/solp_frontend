import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/personal_details.css";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  Name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("First Name is required"),

  Email: Yup.string()
    .email("Invalid Email format")
    .required("Email is required"),
  Phnum: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  Gender: Yup.string().required("Gender is Required"),
  HighQual: Yup.string().required("Please Fill Up this One"),
  ClgName: Yup.string().required("Please Fill Up this One"),
});

export const PersonalDetails = () => {
  const [languages, setLanguages] = useState([]);

  const addLanguage = (values) => {
    setLanguages([...languages, values]);
  };

  const deleteLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const initialValues = {
    languages: [{ language: "", proficiency: "" }],
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    
    resetForm();
  };
  return (
    <div className="covers">
      <div className="c-small">
        <div className="containerPerson">
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="form">
                <h2 style={{ color: "white" }}>Personal details</h2>
                <div className="gender_radio">
                  <label className="gender">
                    Gender:
                    <Field type="radio" name="Gender" value="Male" /> Male
                    <Field type="radio" name="Gender" value="Female" />
                    Female
                    <Field type="radio" name="Gender" value="Others" />
                    Others
                    <ErrorMessage
                      name="Gender"
                      className="error"
                      component="div"
                    />
                  </label>

                  <label htmlFor="DOB">
                    Date of Birth:
                    <Field type="date" name="DOB" id="DOB" />
                  </label>
                </div>

                <div className="gender_radio">
                  <label className="gender">
                    Marital Status:
                    <Field type="radio" name="Marital" value="Married" />{" "}
                    Married
                    <Field type="radio" name="Marital" value="Unmarried" />
                    Unmarried
                    <ErrorMessage
                      name="Marital"
                      className="error"
                      component="div"
                    />
                  </label>
                </div>

                <div className="gender_radio">
                  <label htmlFor="Category">
                    Category:
                    <Field type="radio" name="Category" value="General" />{" "}
                    General
                    <Field type="radio" name="Category" value="SC" />
                    SC
                    <Field type="radio" name="Category" value="ST" />
                    ST
                    <Field type="radio" name="Category" value="OBC" />
                    OBC
                    <Field type="radio" name="Category" value="Others" />
                    Others
                  </label>
                </div>

                <div className="gender_radio">
                  <label htmlFor="PhyHan">
                    Are you differently abled ?
                    <Field type="radio" name="PhyHan" value="Yes" /> Yes
                    <Field type="radio" name="PhyHan" value="No" />
                    No
                  </label>
                </div>

                <div className="gender_radio">
                  <label htmlFor="Career">
                    Have you taken a career break ?
                    <Field type="radio" name="Career" value="Yes" /> Yes
                    <Field type="radio" name="Career" value="No" />
                    No
                  </label>
                </div>
                {values.Career === "Yes" && (
                  <div className="gender_radio">
                    <label htmlFor="CareerR">
                      Reason of break:
                      <Field as="select" name="CareerR" id="ExpLevel">
                        <option value="ChildCare">Child Care</option>
                        <option value="Education">Education</option>
                        <option value="Medical">Medical</option>
                        <option value="LayOff">LayOff</option>
                        <option value="Personal">Personal</option>
                      </Field>
                    </label>
                    <div>
                      <label htmlFor="DOB">
                        Break started from:
                        <Field type="month" name="DOB" id="DOB" />
                      </label>
                      <label htmlFor="DOB">
                        Break ended in:
                        <Field type="month" name="DOB" id="DOB" />
                      </label>
                    </div>
                  </div>
                )}

                <div className="project">
                  <label htmlFor="PAdd">
                    Permanent Address:
                    <Field
                      type="text"
                      id="PAdd"
                      placeholder="Enter your permanent address"
                      name="PAdd"
                    />
                  </label>
                  <ErrorMessage name="PAdd" className="error" component="div" />
                </div>

                <div className="hometown">
                  <div>
                    <label htmlFor="HTown">
                      Hometown:
                      <Field
                        type="text"
                        id="HTown"
                        placeholder="Enter your hometown"
                        name="HTown"
                      />
                    </label>
                    <ErrorMessage
                      name="HTown"
                      className="error"
                      component="div"
                    />
                  </div>

                  <div>
                    <label htmlFor="PCode">
                      PIN Code:
                      <Field
                        type="number"
                        id="PCode"
                        placeholder="Enter your PIN Code"
                        name="PCode"
                      />
                    </label>
                    <ErrorMessage
                      name="PCode"
                      className="error"
                      component="div"
                    />
                  </div>
                </div>

                <div className="lang">
                  <div>
                    <label htmlFor="language">Language:</label>
                    <Field
                      type="text"
                      id="language"
                      name="language"
                      placeholder="Enter language name"
                    />
                    <ErrorMessage
                      name="language"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div>
                    <label htmlFor="proficiency">Proficiency:</label>
                    <Field as="select" id="proficiency" name="proficiency">
                      <option value="" label="Select Proficiency" />
                      <option value="beginner" label="Beginner" />
                      <option value="proficient" label="Proficient" />
                      <option value="expert" label="Expert" />
                    </Field>
                    <ErrorMessage
                      name="proficiency"
                      component="div"
                      className="error"
                    />
                  </div>
            
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
