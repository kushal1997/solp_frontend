import React, { useState } from "react";
import { Formik, Form } from "formik";

import "../../services/css/counselling.css";
import "../../services/css/mediaScreen.css";
import AuthContext from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { InactivityTimer } from "../../layouts/InactivityTimer";
import delete_sign from "../../assets/delete_sign.png"
export const DeleteCourse = ({ courseName, setDeleteForm, isId, resfresh, setRefresh }) => {
    const navigate=useNavigate();
    console.log("User ID", isId)
    console.log("courseName", courseName)
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


    const handleClose = () => {
        setDeleteForm(false);
    }

    const { role, success } = React.useContext(AuthContext);
    const token = localStorage.getItem('token');
    if (token && role !== "admin" && success === true) {
        <Navigate to="/login" />
    }


    const headers = {
        Authorization: `Bearer ${token}`,
    };


    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };
    const handelTempdelete = (e) => {
        e.preventDefault();

        fetch(`${BACKEND_URL}/courses/temp_delete_course/${courseName}/${isId}`, {
            method: 'DELETE',
            headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                else {
                    alert("Course Successfully Deleted Temporarily")
                    setRefresh(resfresh + 1);
                    setDeleteForm(false);
                }

                return response.json(); // You may adjust this based on your response format
            })
            .then(data => console.log(data))
            .catch(err=>{
                if(err){
                  alert('Error in getting deleted courses');
                  localStorage.removeItem("token")
                  navigate("/login");
                }
               })
    }
    const handelFinaldelete = (e) => {
        e.preventDefault();
        console.log("Delete Successfull")

        fetch(`${BACKEND_URL}/courses/perm_delete_course/${courseName}/${isId}`, {
            method: 'DELETE',
            headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                else {
                    alert("Course Successfully Deleted ")
                    setRefresh(resfresh + 1);
                    setDeleteForm(false);
                }

                return response.json(); // You may adjust this based on your response format
            })
            .then(data => console.log(data))
            .catch(err=>{
                if(err){
                  alert(`Error in getting ${courseName} course`);
                  localStorage.removeItem("token")
                  navigate("/login");
                }
               })
    }



    return (
        <>
            <InactivityTimer />
            <div className="mainCover" style={{top:'14.8rem'}}>
                <div className="cover">
                    <div >
                        <div className="containerCoun popup_form">
                            <Formik
                            // initialValues={apiResponse}
                            // enableReinitialize
                            // validationSchema={validationSchema}
                            // onSubmit={handleSubmit}
                            >
                                {({ values }) => (
                                    <Form className="form">
                                        <div className="heading">
                                            <h2 style={{ color: "white" }}>Delete User</h2>
                                            <img width="64" height="64" src={delete_sign} alt="delete-sign" onClick={handleClose}></img>
                                        </div>

                                        <p>If you want to delete user permanently click on the checkbox given below.</p>


                                        <label style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "2rem", color: "red" }}>Delete user permanently
                                            <input
                                                type="checkbox"
                                                checked={isCheckboxChecked}
                                                onChange={handleCheckboxChange}
                                            />
                                        </label>

                                        {
                                            isCheckboxChecked ?
                                                <button className="submit" onClick={handelFinaldelete}>
                                                    Final Delete
                                                </button>

                                                :

                                                <button className="submit" onClick={handelTempdelete}>
                                                    Delete
                                                </button>

                                        }

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
