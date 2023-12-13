import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from 'emailjs-com';

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
  HighQual: Yup.string().required("Please Fill Up this One"),
  ClgName: Yup.string().required("Please Fill Up this One"),
});

export const Counselling_form = () => {
  const initialValues = {
    Name: "",
    Email: "",
    Phnum: "",
    Gender: "",
    DOB: "",
    HighQual: "",
    ClgName: "",
    ExpLevel: "",
    YrsOfExp: "",
    Skills: "",
    PaymentDone: "",
    PaymentFor: "",
    HeadingDescr: "",
    Mode: "",
    Amount: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    const formData = new FormData();
    formData.append("Name", values.Name);
    formData.append("Email", values.Email);
    formData.append("Phnum", values.Phnum);
    formData.append("Gender", values.Gender);
    formData.append("DOB", values.DOB);
    formData.append("HighQual", values.HighQual);
    formData.append("ClgName", values.ClgName);
    formData.append("ExpLevel", values.ExpLevel);
    formData.append("YrsOfExp", values.YrsOfExp);
    formData.append("Skills", values.Skills);
    formData.append("PaymentDone", values.PaymentDone);
    formData.append("PaymentFor", values.PaymentFor);
    formData.append("HeadingDescr", values.HeadingDescr);
    formData.append("Amount", values.Amount);
    formData.append("Mode", values.Mode);


    const emailData = {
      service_id: process.env.REACT_APP_SERVICE_ID, // Replace with your actual service ID
      template_id: process.env.REACT_APP_TEMPLATE_ID, // Replace with your actual template ID
      user_id: process.env.REACT_APP_USER_ID, // Replace with your actual user ID
      template_params: {
        Name: values.Name,
        Email: values.Email,
        Phnum: values.Phnum,
        Gender: values.Gender,

        PaymentDone: values.PaymentDone,
        PaymentFor: values.PaymentFor,
        Amount: values.Amount,
        Mode: values.Mode,

        // Add more fields as needed
      },
    };

    emailjs.send(emailData.service_id, emailData.template_id, emailData.template_params, emailData.user_id)
      .then((response) => {
        if (response.status === 200) {
          alert("Email Sent");
          console.log(emailData.template_params);
        } else {
          console.error("Failed to submit form data.");
        }
      })
      .catch((error) => {
        console.error("An error occurred while submitting the form:", error);
      });

    fetch(
      "https://script.google.com/macros/s/AKfycbyuOihdRLiyCNgJqdHjb6mhrGuEXKIgwoHf4H6yHYWW-yr5TR8EjRkZ6jOxqLEPg-Li/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        if (response.ok) {
          // console.log("Form data submitted successfully.");
          alert("Form data submitted successfully.");
        } else {
          alert("Failed to submit form data.");
        }
      })
      .catch((error) => {
        console.error("An error occurred while submitting the form:", error);
      });
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
                <h2 style={{ color: "white" }}>Counselling Form</h2>
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
                <div className="project">
                  <label htmlFor="HighQual">
                    Highest Qualification
                    <Field
                      type="text"
                      id="HighQual"
                      placeholder="Enter your Highest Qualification"
                      name="HighQual"
                    />
                  </label>
                  <ErrorMessage
                    name="HighQual"
                    className="error"
                    component="div"
                  />
                </div>
                <div className="project">
                  <label htmlFor="ClgName">
                    College Name
                    <Field
                      type="text"
                      id="ClgName"
                      placeholder="Enter your College Name"
                      name="ClgName"
                    />
                  </label>
                  <ErrorMessage
                    name="ClgName"
                    className="error"
                    component="div"
                  />
                </div>
                <div className="experience_level">
                  <label htmlFor="ExpLevel">
                    Experience Level:
                    <Field as="select" name="ExpLevel" id="ExpLevel">
                      <option value="Fresher">Fresher</option>
                      <option value="Experienced">Experienced</option>
                    </Field>
                  </label>

                  {values.ExpLevel === "Experienced" && (
                    <div className="years_of_experience">
                      <label htmlFor="YrsOfExp">
                        Years of Experience:
                        <Field type="number" name="YrsOfExp" id="YrsOfExp" />
                      </label>
                    </div>
                  )}
                </div>
                <div className="project detail_project">
                  <label htmlFor="Skills">Skills</label>
                  <Field
                    as="textarea"
                    name="Skills"
                    id="Skills"
                    rows="4" // You can adjust the number of rows as needed
                    cols="50" // You can adjust the number of columns as needed
                  />
                </div>

                <div className="payment_done">
                  <label>
                    Payment Done:
                    <Field type="radio" name="PaymentDone" value="Yes" /> Yes
                    <Field type="radio" name="PaymentDone" value="No" /> No
                  </label>

                  {values.PaymentDone === "Yes" && (
                    <div className="payment_for">
                      <div className="heading">
                        <div>
                          <label htmlFor="PaymentFor">Payment For:</label>

                          <Field as="select" name="PaymentFor" id="paymentFor">
                            <option value="Counselling">
                              {" "}
                              (1) Counselling
                            </option>
                            <option value="HR_Internship">(2) MBA Internship</option>
                            <option value="JS_Front_End">
                              {" "}
                              (3) HTML, CSS, Java Scripts (Front End) and Project
                              work
                            </option>
                            <option value="React_Front_End">
                              (4) HTML, CSS, Java Scripts, React (Front End) and
                              Project work.{" "}
                            </option>
                            <option value="Node_Js_Beck_End">
                              (5) HTML, CSS, Java Scripts, Node Js (Beck End) and
                              Project work
                            </option>
                            <option value="React_Native_Mobile_Application">
                              (6) HTML, CSS, Java Scripts, React Native (Mobile
                              Application) and Project work
                            </option>
                            <option value="Python_Front_and_Back_End">
                              {" "}
                              (7) Python (Front and Back End) and Project work
                            </option>
                            <option value="SQL">(8) SQL and Project work</option>
                            <option value="Java_and_Spring_boot">(9) Java and Spring boot and Project work</option>
                            <option value="Soft_Skill">(10) Soft Skill</option>
                            <option value="Others">(11) Others</option>

                          </Field>
                        </div>
                        <div>
                          <label htmlFor="Mode">Training Mode:</label>

                          <Field as="select" name="Mode" id="paymentFor">
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>

                          </Field>
                        </div>
                      </div>
                      <div className="heading_des">
                        {
                          values.PaymentFor === 'Others' && (
                            <div>
                              <label htmlFor="HeadingDescr">Description:</label>
                              <Field
                                type="text"
                                id="headingDesc"
                                placeholder="Add more details for choosen one"
                                name="HeadingDescr"
                              />
                            </div>
                          )
                        }

                        <div>
                          <label htmlFor="Amount"> Amount:</label>
                          <Field
                            type="number"
                            id="amount"
                            placeholder="Add amount"
                            name="Amount"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
