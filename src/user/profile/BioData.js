import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../login/forgo.css"
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router";

const validationSchema = Yup.object().shape({
  clgName: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("College Name is required"),
  father_name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Father Name is required"),
  mother_name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Mother Name is required"),
  Phnum: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  DOB: Yup.string().required("Gender is Required"),
  aadhar: Yup.string()
    .matches(/^[2-9]\d{3}\d{4}\d{4}$/, "Invalid Aadhaar number")
    .required("Aadhaar number is required"),
  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
    .required("PAN number is required"),
  bloodgroup: Yup.string()
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Invalid Blood Group"
    )
    .required("Blood Group is required"),
});

const BioData = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token');
  const { userId } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const initialValues = {
    collegeName: "",
    fatherName: "",
    motherName: "",
    phoneNo: "",
    dob: "",
    aadhar: "",
    pan: "",
    bloodGroup: "",
    yop: "",
  };
  const handleSubmit = (values, { resetForm }) => {

    const postData = {
      collegeName: values.collegeName,
      fatherName: values.fatherName,
      motherName: values.motherName,
      phoneNo: values.phoneNo,
      dob: values.dob,
      aadhar: values.aadhar,
      pan: values.pan,
      bloodGroup: values.bloodGroup,
      yop: values.yop,
    };
    console.log(postData);
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    try {
      axios
        .post(
          `${BACKEND_URL}/users/create_bio/${userId}`,
          postData, { headers: headers }
        )
        .then((res) => {
          if (res.data.success === true) {
            alert("BioData Created Successfully");
            navigate("/userPage");
          }
        });
    } catch (error) {
      console.log("error", error);
    }

    // console.log(values);
    resetForm();
  };

  return (
    <div className="forgotPass">
      <Formik
        initialValues={initialValues}
         validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="genOTP">
            <h4 style={{marginBottom:"10px"}}>Add Personal Details</h4>
          
            <div className="project-mail">
              <div className="boi_data">
                <label htmlFor="collegeName">
                  CollegeName :
                  <Field
                    style={{
                      border: "1px solid black",
                      height: "4vh",
                      borderRadius: "3px",
                    }}
                    type="text"
                    id="clgName"
                    placeholder="Enter your college name"
                    name="collegeName"
                  />
                </label>
                <ErrorMessage
                  style={{ padding: "1px" }}
                  name="collegeName"
                  className="error"
                  component="div"
                />
              </div>
              <div className="date-of-birth">
                <label htmlFor="yop">
                  YOP:
                  <Field
                    style={{
                      border: "1px solid black",
                      height: "4vh",
                      borderRadius: "3px",
                    }}
                    type="number"
                    name="yop"
                    id="yop"
                    placeholder="Year of Passout"
                  />
                </label>
              </div>
              <div className="boi_data">
                <label htmlFor="fatherName">
                  Father Name :
                  <Field
                    style={{
                      border: "1px solid black",
                      height: "4vh",
                      borderRadius: "3px",
                    }}
                    type="text"
                    id="father_name"
                    placeholder="Enter your father name"
                    name="fatherName"
                  />
                </label>
                <ErrorMessage
                  name="fatherName"
                  className="error"
                  component="div"
                />
              </div>
              <div className="boi_data">
                <label htmlFor="motherName">
                  Mother Name :
                  <Field
                    style={{
                      border: "1px solid black",
                      height: "4vh",
                      borderRadius: "3px",
                    }}
                    type="text"
                    id="mother_name"
                    placeholder="Enter your mother name"
                    name="motherName"
                  />
                </label>
                <ErrorMessage
                  name="motherName"
                  className="error"
                  component="div"
                />
              </div>
              <div className="boi_data">
                <label htmlFor="phoneNo">
                  Mobile No. :
                  <Field
                    style={{
                      border: "1px solid black",
                      height: "4vh",
                      borderRadius: "3px",
                    }}
                    type="number"
                    id="Phnum"
                    placeholder="Enter your Phone Num"
                    name="phoneNo"
                  />
                </label>
                <ErrorMessage name="phoneNo" className="error" component="div" />
              </div>
              <div className="date-of-birth">
                <label htmlFor="dob">
                  Date of Birth :
                  <Field
                    style={{
                      border: "1px solid black",
                      height: "4vh",
                      borderRadius: "3px",
                    }}
                    type="date"
                    name="dob"
                    id="DOB"
                  />
                </label>
              </div>
              <div className="boi_data">
                <label htmlFor="aadhar">
                  Aadhara no. :
                  <Field
                    style={{
                      border: "1px solid black",
                      height: "4vh",
                      borderRadius: "3px",
                    }}
                    type="aadhar"
                    id="aadhar"
                    placeholder="Enter your aadhar Num"
                    name="aadhar"
                  />
                </label>
                <ErrorMessage name="aadhar" className="error" component="div" />
              </div>
              <div className="boi_data">
                <label htmlFor="pan">
                  Pan no. :
                  <Field
                    style={{
                      border: "1px solid black",
                      height: "4vh",
                      borderRadius: "3px",
                    }}
                    type="text"
                    id="pan"
                    placeholder="Enter your pan Num"
                    name="pan"
                  />
                </label>
                <ErrorMessage name="pan" className="error" component="div" />
              </div>
              <div className="boi_data">
                <label htmlFor="bloodgroup">
                  Blood Group :
                  <Field
                    style={{
                      border: "1px solid black",
                      height: "4vh",
                      borderRadius: "3px",
                    }}
                    type="text"
                    id="bloodgroup"
                    placeholder="Enter your bloodgroup"
                    name="bloodgroup"
                  />
                </label>
                <ErrorMessage
                  name="bloodgroup"
                  className="error"
                  component="div"
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
  );
};

export default BioData;
