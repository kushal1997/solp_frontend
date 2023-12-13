import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../services/css/counselling.css";
import "../services/css/mediaScreen.css";

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
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
export const FirstForm = () => {
  const initialValues = {
    Name: "",
    Email: "",
    Phnum: "",
    Gender: "",
    DOB: "",
    password: "",
    confirmPassword: "",
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
                <h2 style={{ color: "white" }}>Sign Up Form</h2>
                <div className="project">
                  <label htmlFor="Name">
                    Full Name
                    <Field
                      type="text"
                      id="Name"
                      placeholder="Enter your full name"
                      name="Name"
                    />
                  </label>
                  <ErrorMessage name="Name" className="error" component="div" />
                </div>
                <div className="project">
                  <label htmlFor="Email">
                    Email Address
                    <Field
                      type="text"
                      id="Email"
                      placeholder="Enter your Email"
                      name="Email"
                    />
                  </label>
                  <ErrorMessage
                    name="Email"
                    className="error"
                    component="div"
                  />
                </div>
                <div className="project">
                  <label htmlFor="Phnum">
                    Mobile No.
                    <Field
                      type="number"
                      id="Phnum"
                      placeholder="Enter your Phone Num"
                      name="Phnum"
                    />
                  </label>
                  <ErrorMessage
                    name="Phnum"
                    className="error"
                    component="div"
                  />
                </div>
                <div className="gender_radio">
                  <div>
                    <label className="gender">
                      Gender:
                      <Field type="radio" name="Gender" value="Male" /> Male
                      <Field type="radio" name="Gender" value="Female" />
                      Female
                      <Field type="radio" name="Gender" value="Others" />
                      Others
                    </label>
                    <ErrorMessage
                      name="Gender"
                      className="error"
                      component="div"
                    />
                  </div>

                  <label htmlFor="DOB">
                    Date of Birth:
                    <Field type="date" name="DOB" id="DOB" />
                  </label>
                </div>
                <div className="passForm">
                  <div style={{display:"flex",flexDirection:"column"}}>
                    <label htmlFor="password">Password:
                    <Field
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    </label>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div style={{display:"flex",flexDirection:"column"}}>
                    <label htmlFor="confirmPassword">Confirm Password:
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    </label>
                    <ErrorMessage
                      name="confirmPassword"
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
