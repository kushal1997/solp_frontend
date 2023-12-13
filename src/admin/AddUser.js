import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../services/css/counselling.css";
import "../services/css/mediaScreen.css";
import MultiSelectDropdown from "../layouts/MultiSelectDropdown";
import AuthContext from "../context/AuthContext";
// import { BACKEND_URL } from "../config/constraints";
import { Navigate } from "react-router-dom";
import axios from "axios";

const validationSchema = Yup.object().shape({
  Name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("First Name is required"),

  Email: Yup.string()
    .email("Invalid Email format")
    .required("Email is required"),
  ConfirmEmail: Yup.string()
    .email("Invalid Email format")
    .required("Email confirmation is required")
    .oneOf([Yup.ref('Email')], "Emails do not match"),
  
});

export const AddUser = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
  /**
   * Initializes state variables for different programming languages.
   * @returns None
   */
  // const [selectedOption, setSelectedOption] = React.useState('');
  const [isHTML, setIsHTML] = useState(false);
  const [isCSS, setIsCSS] = useState(false);
  const [isJS, setIsJS] = useState(false);
  const [isReact, setIsReact] = useState(false);
  const [isNode, setIsNode] = useState(false);

  // const handleOptionChange = (option) => {
  //   setSelectedOption(option);
  // };

  /* This code is checking the authentication context and redirecting the user to the login page if
  certain conditions are met. */
  const { role, success } = React.useContext(AuthContext);
  const token = localStorage.getItem('token');
  if (token && role !== "admin" && success === true) {
    <Navigate to="/login" />
  }
  const options = [
    '1) HTML', '2) CSS', '3) JAVASCRIPT', '4) REACT JS',
    // '1) HTML', '2) CSS', '3) JAVASCRIPT', '4) REACT JS',
    // '1) HTML', '2) CSS', '3) JAVASCRIPT', '4) REACT JS',
    // '1) HTML', '2) CSS', '3) JAVASCRIPT', '4) REACT JS'
  ];
  const [selectedValues, setSelectedValues] = useState([]);
  const [gpassword, setgPassword] = useState("");
  const handleSelectionChange = (newSelection) => {
    setSelectedValues(newSelection);
  };

  /**
   * Manages the visibility of the password and confirm password fields.
   * @returns None
   */
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConPasswordVisibility = () => {
    setShowConPassword((prevShowPassword) => !prevShowPassword);
  };


  /**
   * An object representing the initial values for a form.
   * @type {Object}
   * @property {string} Name - The initial value for the Name field.
   * @property {string} Email - The initial value for the Email field.
   * @property {string} ConfirmEmail - The initial value for the ConfirmEmail field.
   * @property {string} password - The initial value for the password field.
   * @property {string} confirmPassword - The initial value for the confirmPassword field.
   */
  const initialValues = {
    Name: "",
    Email: "",
    ConfirmEmail: gpassword,
    password: gpassword,
    confirmPassword: "",
    
  };

  /**
   * Creates a headers object with an Authorization header containing a bearer token.
   * @param {string} token - The bearer token to include in the Authorization header.
   * @returns {Object} - An object with the Authorization header.
   */
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  /**
   * Handles the form submission by sending a POST request to the backend API with the form values.
   * @param {object} values - The form values object.
   * @param {function} resetForm - A function to reset the form after submission.
   * @returns None
   */
  const handleSubmit = async (values, { resetForm }) => {
    // console.log(values);
    // console.log('Selected Values:', selectedValues);
    /**
     * Creates a data object to be sent as a POST request.
     * @param {Object} values - An object containing the values for name, email, password, and confirmPassword.
     * @param {string} gpassword - The password to be included in the data object.
     * @param {boolean} isHTML - A boolean indicating whether HTML is included in the data object.
     * @param {boolean} isCSS - A boolean indicating whether CSS is included in the data object.
     * @param {boolean} isJS - A boolean indicating whether JavaScript is included in the data object.
     * @param {boolean} isReact - A boolean indicating whether React is included in the data object.
     * @param {boolean} isNode - A
     */
    const postData = {
      name: values.Name,
      email: values.Email,
      password: gpassword,
      confirmPassword: gpassword,
      isHTML: isHTML,
      isCSS: isCSS,
      isJS: isJS,
      isREACT:isReact,
      isNODE: isNode

    };
    // console.log(postData)
    try {

      /**
       * Sends a POST request to the backend API to register a new user.
       * @param {string} BACKEND_URL - The URL of the backend API.
       * @param {object} postData - The data to send in the request body.
       * @param {object} headers - The headers to include in the request.
       * @returns None
       */
      axios.post(`${BACKEND_URL}/users/register`, postData, { headers: headers })
        .then(response => {
          if (response) {
            // Request was successful
            const data = response.data;
            console.log("Registration successful:", data);
            alert("Registration successful");
            resetForm();
          } else {
            // Request failed
            console.error("Registration failed");
            alert("Registration failed");
          }
        })

    } catch (error) {
      console.error("An error occurred:", error);
    }

  };

  /**
   * Generates a random password consisting of alphanumeric characters.
   * @returns {string} - The randomly generated password.
   */
  const generatePassword = () =>
    setgPassword(
      Array.from(
        { length: 8 },
        () =>
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[
          Math.floor(Math.random() * 62)
          ]
      ).join("")
    );


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
                <h2 style={{ color: "white" }}>Add User Form</h2>
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
                  <label htmlFor="ConfirmEmail">
                    Confirm Email Address
                    <Field
                      type="text"
                      id="ConfirmEmail"
                      placeholder="Enter your Email"
                      name="ConfirmEmail"
                    />
                  </label>
                  <ErrorMessage
                    name="ConfirmEmail"
                    className="error"
                    component="div"
                  />
                </div>
                {/* <div className="project">
                  <MultiSelectDropdown
                    options={options}
                    selectedOptions={selectedValues}
                    onSelectionChange={handleSelectionChange}
                  />
                 

                 

                </div> */}
                <h3>Assign Course</h3>
                <div className="choose_course">
                
                  <input
                    type="radio"
                    name="isHTML"
                    value={isHTML}
                    onChange={() => setIsHTML(true)}
                  />
                  HTML
                  <input
                    type="radio"
                    name="isHTML"
                    value={isCSS}
                    onChange={() => setIsCSS(true)}
                  />
                  css
                  <input
                    type="radio"
                    name="isHTML"
                    value={isJS}
                    onChange={() => setIsJS(true)}
                  />
                  JavaScript
                  <input
                    type="radio"
                    name="isHTML"
                    value={isReact}
                    onChange={() => setIsReact(true)}
                  />
                  React
                  <input
                    type="radio"
                    name="isHTML"
                    value={isNode}
                    onChange={() => setIsNode(true)}
                  />
                  Node



                </div>
                

                <div className="passForm">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="password">
                      Password:
                      <Field
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={gpassword}
                      />
                      <i
                        className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        aria-hidden="true"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </label>
                    <button
                      type="button"
                      style={{
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "10px",
                        marginTop: "30px",
                        backgroundColor: "#00715d",
                      }}
                      onClick={generatePassword}
                    >
                      Generate Password
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="confirmPassword">
                      Confirm Password:
                      <Field
                        type={showConPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={gpassword}
                      />
                      <i
                        className={`fa ${showConPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        aria-hidden="true"
                        onClick={toggleConPasswordVisibility}
                        style={{ cursor: "pointer" }}
                      ></i>
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
