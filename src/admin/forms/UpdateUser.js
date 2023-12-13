import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../../services/css/counselling.css";
import "../../services/css/mediaScreen.css";
import MultiSelectDropdown from "../../layouts/MultiSelectDropdown";
import AuthContext from "../../context/AuthContext";
// import { BACKEND_URL } from "../config/constraints";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { InactivityTimer } from "../../layouts/InactivityTimer";
import delete_sign from "../../assets/delete_sign.png"


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

export const UpdateUser = ({ setUpdateForm, isId }) => {
  console.log("User ID", isId)
  const { userId } = React.useContext(AuthContext);
  // console.log("USER ID:",userId)

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [selectedOption, setSelectedOption] = React.useState('');


  const handleClose = () => {
    setUpdateForm(false);
  }
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const { role, success } = React.useContext(AuthContext);
  const token = localStorage.getItem('token');
  if (token && role !== "admin" && success === true) {
    <Navigate to="/login" />
  }
  const options = ['1) HTML', '2) CSS', '3) JAVASCRIPT', '4) REACT JS'];
  const [selectedValues, setSelectedValues] = useState([]);
  const [gpassword, setgPassword] = useState("");
  const handleSelectionChange = (newSelection) => {
    setSelectedValues(newSelection);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConPasswordVisibility = () => {
    setShowConPassword((prevShowPassword) => !prevShowPassword);
  };
  const initialValues = {
    Name: "",
    Email: "",
    password: gpassword,

  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [isHTML, setIsHTML] = useState(false);
  const [isCSS, setIsCSS] = useState(false);
  const [isJS, setIsJS] = useState(false);
  const [isReact, setIsReact] = useState(false);
  const [isNode, setIsNode] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/users/profile/${isId}`, {
          headers: headers // Add your headers here if needed
});
        const data = response.data.user;
        console.log(data);
        setgPassword(data.password)
        setApiResponse({
          Name: data.name,
          Email: data.email,
          password: gpassword,
        })
        setIsHTML(data.isHTML);
        setIsCSS(data.isCSS);
        setIsJS(data.isJS);
        setIsNode(data.isNODE);
        setIsReact(data.isREACT);



      } catch (error) {
        console.error('Error fetching API:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    console.log('Selected Values:', selectedValues);
    const postData = {
      name: values.Name,
      email: values.Email,
      password: gpassword,
      isHTML: isHTML,
      isCSS: isCSS,
      isJS: isJS,
      isREACT: isReact,
      isNODE: isNode

    };
    console.log(postData)
    try {

      axios.post(`${BACKEND_URL}/users/update_user/${isId}/${userId}`, postData, { headers: headers })
        .then(response => {
          if (response) {
            // Request was successful
            const data = response.data;
            console.log("Registration successful:", data);
            alert("Details Updated successful");
            setgPassword("");
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
    <>
      <InactivityTimer />
      <div className="mainCover">
        <div className="cover">
          <div className="c-small">
            <div className="containerCoun">
              <Formik
                initialValues={apiResponse}
                enableReinitialize
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values }) => (
                  <Form className="form">
                    <div className="heading">
                      <h2 style={{ color: "white" }}>Update User</h2>
                      <img width="64" height="64" src={delete_sign} alt="delete-sign" onClick={handleClose}></img>
                    </div>
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

                    <h3>Assign Course</h3>
                    <div className="choose_course">

                      <input
                        type="checkbox"
                        name="isHTML"
                        checked={isHTML}
                        onChange={() => setIsHTML(!isHTML)}
                      />
                      HTML
                      <input
                        type="checkbox"
                        name="isCSS"
                       
                        checked={isCSS}
                        onChange={() => setIsCSS(!isCSS)}
                      />
                      css
                      <input
                        type="checkbox"
                        name="isJS"
                        checked={isJS}
                        onChange={() => setIsJS(!isJS)}
                      />
                      JavaScript
                      <input
                        type="checkbox"
                        name="isReact"
                        checked={isReact}
                        onChange={() => setIsReact(!isReact)}
                      />
                      React
                      <input
                        type="checkbox"
                        name="isNode"
                        checked={isNode}
                        onChange={() => setIsNode(isNode)}
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
      </div>
    </>
  );
};
