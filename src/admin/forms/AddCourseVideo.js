import React, { Fragment, useState } from "react";
import axios from 'axios'
import "../../services/css/counselling.css";
import "../../services/css/mediaScreen.css";
// import { BACKEND_URL } from "../config/constraints";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { InactivityTimer } from "../../layouts/InactivityTimer";


export const AddCourseVideo = () => {
  /* The line `const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;` is assigning the value of the
  environment variable `REACT_APP_BACKEND_URL` to the constant variable `BACKEND_URL`. */
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


  /* The line `const { role, success } = React.useContext(AuthContext);` is using the `useContext` hook
  from React to access the values stored in the `AuthContext` context. */
  const { role, success } = React.useContext(AuthContext);


  /* The line `const token = localStorage.getItem('token');` is retrieving the value of the 'token' key
  from the browser's localStorage. The token is typically stored in the localStorage after a user logs
  in or authenticates with the application. By retrieving the token from the localStorage, it can be
  used for authentication purposes when making requests to the backend server. */
  const token = localStorage.getItem('token');


  // console.log(token)
  /* The code `if (token && role !== "admin" && success === true) { <Navigate to="/login" /> }` is
  checking if the user is authenticated and has the role of "admin". If both conditions are true, it
  redirects the user to the "/login" page using the `<Navigate>` component from the React Router
  library. This is typically used to prevent unauthorized access to certain routes or pages in the
  application. */
  if (token && role !== "admin" && success === true) {
    <Navigate to="/login" />
  }


  const [video, setVideo] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  /* The `const [formData, setFormData] = useState({ ... })` is a React Hook that initializes a state
  variable called `formData` and a function called `setFormData` to update the state variable. */
  const [formData, setFormData] = useState({
    contentType: null,
    courseType: null,
    tutorN: null,
    slNo: "",
    title: "",
  });
  /* The `headers` constant is an object that contains an `Authorization` property. This property is
  set to a string value that includes the `Bearer` token. This is typically used for authentication
  purposes when making requests to a server. By including the `Authorization` header in the request,
  the server can verify the identity of the user and determine if they have the necessary
  permissions to access the requested resource. */
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  /**
   * The handleChange function updates the form data based on the user's input.
   * @param e - The parameter `e` is an event object that is passed to the `handleChange` function. It
   * represents the event that triggered the function, such as a change event on an input field.
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files : value,
    }));
  };

  /**
   * The handleSubmit function is used to handle form submission by sending a POST request to the
   * backend server with form data and a video file.
   * @param e - The parameter `e` is an event object that is passed to the `handleSubmit` function. It
   * is typically an event object that is triggered when a form is submitted.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    /**
     * Creates a new FormData object and appends the specified data to it.
     * @param {Object} formData - The form data object containing the values to append.
     * @param {string} formData.title - The title value to append.
     * @param {File} video - The video file to append.
     * @param {number} formData.slNo - The serial number value to append.
     * @param {string} formData.tutorN - The tutor name value to append.
     * @returns None
     */
    let formDatas = new FormData();
    formDatas.append("title", formData.title);
    formDatas.append("video", video);
    formDatas.append("sl_no", formData.slNo)
    formDatas.append("tutor", formData.tutorN)
    // console.log(formData)
    for (const [key, value] of formDatas.entries()) {
      console.log(`${key}: ${value}`);
    }


    /**
     * Sends a POST request to the backend server to add a new course.
     * @param {string} formData.courseType - The type of the course being added.
     * @param {object} formDatas - The data of the course being added.
     * @param {object} headers - The headers to be included in the request.
     * @param {function} onUploadProgress - A callback function to track the upload progress.
     * @returns None
     */
    axios.post(`${BACKEND_URL}/courses/add_course/${formData.courseType}`, formDatas, { headers: headers }, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
        setShowProgress(true);
      }
    })
      .then(success => {
        alert("Submitted Successfully");
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
    <>
      <InactivityTimer />

      {/* * Renders a form for uploading videos with various input fields and options.
     * @returns JSX element representing the form for uploading videos. */}

      <div className="cover">
        <div className="c-small">
          <div className="containerCoun">
            <form className="form" onSubmit={handleSubmit}>
              <h2 style={{ color: "white" }}>Upload Videos</h2>
              <div className="experience_level">
                <div>
                  <label htmlFor="contentType">
                    Content Type:
                    <select
                      as="select"
                      name="contentType"
                      id="contentType"
                      value={formData.contentType}
                      onChange={handleChange}
                    >
                      <option value={null}>Choose Any</option>
                      <option value="Video">Video</option>
                      <option value="Quiz">Quiz</option>
                    </select>
                  </label>
                  {/* <ErrorMessage name="contentType" className="error" component="div" /> */}
                </div>
                <div>
                  <label htmlFor="courseType">
                    Select Course:
                    <select
                      as="select"
                      name="courseType"
                      id="contentType"
                      value={formData.courseType}
                      onChange={handleChange}
                    >
                      <option>Choose Any</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="js">Javascript</option>
                      <option value="react">React JS</option>
                      <option value="node">Node JS</option>
                    </select>
                  </label>
                  {/* <ErrorMessage name="courseType" className="error" component="div" /> */}
                </div>
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

                <div className="years_of_experience">
                  <label htmlFor="slNo">
                    Serial No.
                    <input
                      type="number"
                      id="YrsOfExp"
                      placeholder="Enter Serial Num."
                      name="slNo"
                      value={formData.slNo}
                      onChange={handleChange}
                    />
                  </label>
                  {/* <ErrorMessage
                        name="slNo"
                        className="error"
                        component="div"
                      /> */}
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


              {/* * Renders a progress bar if the showProgress flag is true.
             * @param {boolean} showProgress - Flag indicating whether to show the progress bar.
             * @param {number} uploadProgress - The current progress value of the upload.
             * @returns JSX element representing the progress bar. */}

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
    </>
  );
};
