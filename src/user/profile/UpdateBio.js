import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../login/forgo.css"
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { format } from 'date-fns';

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
    bloodGroup: Yup.string()
        .oneOf(
            ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            "Invalid Blood Group"
        )
        .required("Blood Group is required"),
});

export const UpdateBio = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('token');
    const { userId } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const [apiResponse, setApiResponse] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/users/profile/${userId}`, {
                    headers: headers // Add your headers here if needed

                });

                const formattedDate = format(new Date(response.data.user.bio.dob), 'yyyy-MM-dd');

                // Update the API response with the formatted date
                setApiResponse({
                  ...response.data.user.bio,
                  dob: formattedDate,
                });
    
            } catch (error) {
                console.error('Error fetching API:', error);
            }
        };

        fetchData();
    }, []);

   console.log(apiResponse.bloodGroup)
   


    const handleSubmit = (values, { resetForm }) => {
        
        const postData = {
            collegeName: values.collegeName,
            fatherName: values.fatherName,
            motherName: values.motherName,
            phoneNo: values.phoneNo,
            dob: values.dob,
            aadhar: values.aadhar,
            bloodGroup: values.bloodGroup,
            yop: values.yop,
        };
        console.log(postData);



        try {
            axios
                .post(
                    `${BACKEND_URL}/users/update_bio/${apiResponse._id}`,
                    postData, { headers: headers }
                )
                .then((res) => {
                    if (res.data.success === true) {
                        alert("BioData Updated Successfully");
                        navigate("/userPage");
                    }
                });
        } catch (error) {
            console.log("error", error);
        }

        
        resetForm();
    };
    if(!apiResponse){
        return <div>Loading...</div>
    }

    return (
        <div className="forgotPass">
            <Formik
                initialValues={apiResponse}
                enableReinitialize
                //    validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form className="genOTP">
                        <h4 style={{ marginBottom: "10px" }}>Update Your Details</h4>

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
                                        id="collegeName"
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
                                        id="fatherName"
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
                                        id="motherName"
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
                                        id="phoneNo"
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
                                        id="dob"
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
                                <label htmlFor="bloodGroup">
                                    Blood Group :
                                    <Field
                                        style={{
                                            border: "1px solid black",
                                            height: "4vh",
                                            borderRadius: "3px",
                                        }}
                                        type="text"
                                        id="bloodGroup"
                                        placeholder="Enter your bloodgroup"
                                        name="bloodGroup"
                                    />
                                </label>
                                <ErrorMessage
                                    name="bloodGroup"
                                    className="error"
                                    component="div"
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", columnGap: "4rem" }}>
                            <button type="submit" className="OTP1" style={{ alignItems: 'center' }}>
                                Submit
                            </button>
                            <button type="button" className="back_button" onClick={()=>navigate("/userPage")}>
                                Go Back
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
