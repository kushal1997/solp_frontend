import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios'
import "../../services/css/counselling.css";
import "../../services/css/mediaScreen.css";
// import { BACKEND_URL } from "../config/constraints";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { InactivityTimer } from "../../layouts/InactivityTimer";
import delete_sign from "../../assets/delete_sign.png"

export const UpdateCourseVideo = ({ setShowForm,selectedDetails }) => {
console.log(selectedDetails);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const { role, success } = React.useContext(AuthContext);
    const token = localStorage.getItem('token');
    if (token && role !== "admin" && success === true) {
        <Navigate to="/login" />
    }
    const [video, setVideo] = useState(null);

    const [uploadProgress, setUploadProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    const [formData, setFormData] = useState({

        tutorN: selectedDetails.tutor || '',
        title: selectedDetails.title || '',
    });

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files : value,
        }));
    };
    const handleClose = () => {
        setShowForm(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();


        let formDatas = new FormData();
        formDatas.append("title", formData.title);
        formDatas.append("video", video);
        formDatas.append("tutor", formData.tutorN);
        // console.log(formData)
        for (const [key, value] of formDatas.entries()) {
            console.log(`${key}: ${value}`);
        }

        axios.post(`${BACKEND_URL}/courses/update_course/${selectedDetails.courseName}/${selectedDetails.id}`, formDatas, { headers: headers }, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
                setShowProgress(true);
            }
        })
            .then(success => {
                alert("Updated Successfully");
                setUploadProgress(0);
                setShowProgress(false);
            })
            .catch(error => {
                alert("Error Happened" + error);
                setUploadProgress(0);
                setShowProgress(false);
            });
    };

    return (
        /**
         * Renders a form for uploading videos with various input fields and options.
         * @returns JSX element representing the form for uploading videos.
         */
        <>
        <InactivityTimer/>
            <div className="mainCoverT">
            <div className="cover">
                <div className="c-small">
                    <div className="containerCoun">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="heading">
                                <h2 style={{ color: "white" }}>Update Video</h2>
                                <img width="64" height="64" src={delete_sign} alt="delete-sign" onClick={handleClose}></img>
                            </div>


                            <div className="experience_level">
                                <div>
                                    <label htmlFor="tutorN">
                                        Tutor Name:
                                        <select
                                            as="select"
                                            name="tutorN"
                                            id="contentType"
                                            value={formData.tutorN}
                                            onChange={handleChange}
                                        >
                                            <option value={null}>Choose Any</option>
                                            <option value="Priyabrata Sir">Priyabrata Sir</option>
                                            <option value="Kushal Sir">Kushal Sir</option>
                                        </select>
                                    </label>
                                    {/* <ErrorMessage name="tutorN" className="error" component="div" /> */}
                                </div>


                            </div>

                            <div className="project">
                                <label htmlFor="title">
                                    Video Title
                                    <input
                                        type="text"
                                        id="Name"
                                        placeholder="Enter Video Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </label>
                                {/* <ErrorMessage name="title" className="error" component="div" /> */}
                            </div>

                            <div className="project">
                                <label htmlFor="videos">Upload Videos</label>
                                <input
                                    type="file"
                                    name="videos"
                                    id="videos"
                                    accept=".mp4,.mkv"
                                    onChange={(e) => setVideo(e.target.files[0])}
                                />
                                {/* <ErrorMessage name="videos" component="div" className="error" /> */}
                            </div>

                            <button type="submit" className="submit">
                                Submit
                            </button>



                            {showProgress && (
                                <div>
                                    <progress value={uploadProgress} max="100">
                                        {uploadProgress}%
                                    </progress>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
