import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import emailjs from 'emailjs-com';
import "../services/css/counselling.css";
import "../services/css/mediaScreen.css";
import axios from "axios";
import { BACKEND_URL } from "../config/constraints";
// import { PHONE_PE_URL } from "../config/constraints";
import { useNavigate } from "react-router";

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

const Select_course = () => {
  const PHONE_PE_URL = process.env.REACT_APP_PHONE_PE_URL;

  // Calculate the date 18 years ago
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

  // Format the date as a string in "YYYY-MM-DD" format
  const formattedDate = eighteenYearsAgo.toISOString().split('T')[0];
  const navigate = useNavigate();
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
    Course: "",
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
    formData.append("Course", values.Course);

    const phonepeData = {
      name: values.Name,
      number: values.Phnum,
      amount: parseInt(values.Course),
    }

    const emailData = {
      service_id: process.env.REACT_APP_SERVICE_ID, // Replace with your actual service ID
      template_id: process.env.REACT_APP_TEMPLATE_ID, // Replace with your actual template ID
      user_id: process.env.REACT_APP_USER_ID, // Replace with your actual user ID
      template_params: {
        Name: values.Name,
        Email: values.Email,
        Phnum: values.Phnum,
        Gender: values.Gender,

        Amount: values.Amount,
        Mode: values.Mode,

        // Add more fields as needed
      },
    };
    // console.log(emailData);

    emailjs.send(emailData.service_id, emailData.template_id, emailData.template_params, emailData.user_id)
      .then((response) => {
        if (response.status === 200) {
          // alert("Email Sent");
          console.log(emailData.template_params);

        } else {
          console.error("Failed to submit form data.");
        }
      })
      .catch((error) => {
        console.error("An error occurred while submitting the form:", error);
      });
    console.log(phonepeData);
    axios
      .post(`${PHONE_PE_URL}/api/phonepe/payment`, {
        data: {
          name: values.Name,
          number: values.Phnum,
          amount: parseInt(values.Course),
        },
      })
      .then((response) => {
        // Do something with the response from the second API
        window.location.href = response.data;
        emailjs.send(emailData.service_id, emailData.template_id, emailData.template_params, emailData.user_id)
          .then((response) => {
            if (response.status === 200) {
              console.log("Email Sent");
            } else {
              console.error("Failed to submit form data.");
            }
          })
          .catch((error) => {
            console.error("An error occurred while submitting the form:", error);
          });

      })
      .catch((error) => {
        console.log("Error fetching the second API:", error);
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
          console.log("Form data submitted successfully.");
          // alert("Form data submitted successfully.");

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
                <h2 style={{ color: "white" }}>Select Course Form</h2>
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
                    <Field type="date" name="DOB" id="DOB" defaultValue={formattedDate} />
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

                <div className="selectcoursediv">
                  <label className="select_course">
                    <p>Choose your interested course :</p>
                    <br />
                    {/* <div>
                      <Field type="radio" name="Course" value="1" />
                      <p>test @ 1/-</p>
                    </div> */}
                    <div>
                      <Field type="radio" name="Course" value="9" />
                      <p>HTML/CSS @ 9/-</p>
                    </div>
                    <div>
                      <Field type="radio" name="Course" value="149" />
                      <p>Javascript @ 149/-</p>
                    </div>
                    <div>
                      <Field type="radio" name="Course" value="2999" />
                      <p>React/Node @ 2999/-</p>
                    </div>
                    <div>
                      <Field type="radio" name="Course" value="2000" />
                      <p>Python @ 2000/-</p>
                    </div>
                  </label>
                  <ErrorMessage
                    name="Course"
                    className="error"
                    component="div"
                  />
                </div>

                <button type="submit" className="submit">
                  Pay Now
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Select_course;
