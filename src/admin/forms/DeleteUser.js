import React, { useState } from "react";
import { Formik, Form } from "formik";

import "../../services/css/counselling.css";
import "../../services/css/mediaScreen.css";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import delete_sign from "../../assets/delete_sign.png"
import { InactivityTimer } from "../../layouts/InactivityTimer";

export const DeleteUser = ({ setDeleteForm, isId, resfresh, setRefresh }) => {
    console.log("User ID", isId)

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

        fetch(`${BACKEND_URL}/users/temp_delete_user/${isId}`, {
            method: 'DELETE',
            headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                else {
                    alert("User Successfully Deleted Temporarily")
                    setRefresh(resfresh + 1);
                    setDeleteForm(false);
                }

                return response.json(); // You may adjust this based on your response format
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
    const handelFinaldelete = (e) => {
        e.preventDefault();
        console.log("Delete Successfull")

        fetch(`${BACKEND_URL}/users/perm_delete_user/${isId}`, {
            method: 'DELETE',
            headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                else {
                    alert("User Successfully Deleted ")
                    setRefresh(resfresh + 1);
                    setDeleteForm(false);
                }

                return response.json(); // You may adjust this based on your response format
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }



    return (
        <>
            <InactivityTimer />
            <div className="mainCover" style={{top:'14.8rem'}}>
                <div className="cover">
                    <div className="c-small">
                        <div className="containerCoun">
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
