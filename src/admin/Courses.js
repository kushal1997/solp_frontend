import React, { useEffect, useState } from 'react'
import './admin.css';
import AuthContext from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { UpdateCourseVideo } from './forms/UpdateCourseVideo';
import retrive from "../assets/retrive.svg"
import dustbin from "../assets/dustbin.png"
import { DeleteCourse } from './forms/DeleteCourse';
// import { BACKEND_URL } from '../config/constraints';

export const Courses = () => {
  const navigate=useNavigate();
  /**
   * Retrieves the backend URL and video URL from the environment variables.
   * @returns {string} The backend URL.
   * @returns {string} The video URL.
   */
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const VIDEO_URL = process.env.REACT_APP_VIDEO_URL;

  /**
   * Checks the authentication context and redirects the user to the login page if the token is present,
   * the role is not "admin", and the success flag is true.
   * @returns None
   */
  const { role, success,setIsLoggedIn } = React.useContext(AuthContext);
  const token = localStorage.getItem("token");
  if (token && role !== "admin" && success === true) {
    <Navigate to="/login" />
  }
  const [course, setCourse] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // const token = localStorage.getItem('token');
  /**
   * Creates a new Headers object with the Authorization header set to the provided token.
   * @param {string} token - The authorization token to include in the header.
   * @returns A new Headers object with the Authorization header set.
   */
  const headers = new Headers({
    Authorization: `Bearer ${token}`
  });
  /**
   * Updates the selected video state with the provided video URL.
   * @param {string} videoUrl - The URL of the video that was clicked.
   * @returns None
   */
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showDeleteForm, setDeleteForm] = useState(false);
  const [isId, setId] = useState(0);
  const [resfresh, setRefresh] = useState(0);


  const handleVideoClick = (videoUrl) => {
    // console.log(videoUrl)
    setSelectedVideo(videoUrl);
  };
  /**
   * Executes a side effect function that fetches course data from the backend API and updates the state with the retrieved data.
   * @returns None
   */
  const [courseName, setCourseName] = useState("html")
  useEffect(() => {
    fetch(`${BACKEND_URL}/courses/get_course/${courseName}`, {
      headers
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("courseName",courseName)
        console.log(data.courseData);
        setCourse(data.courseData);
      }).catch(err => {
        alert("Session Timeout", err);
        setIsLoggedIn(false);
        navigate("/login")
      });
  }, [courseName,resfresh]);

  const [selectedDetails, setSelectedDetails] = useState({
    id: null,
    courseName: null,
    title: null,
    tutor: null,

  });
  const updateDetails = (course) => {
    setSelectedDetails({ ...selectedDetails, id: course._id, courseName: courseName, title: course.title, tutor: course.tutor });
    setShowForm(true);
    console.log("course name", courseName);

  }
  /**
  * Fetches the course data for the given value from the backend API and sets the course state.
  * @param {string} value - The value used to identify the course.
  * @returns None
  */

  const handleCourse = (value) => {
    setCourseName(value);
    
  };
  
  const handeldelete = (value) => {
    setDeleteForm(true)
    setId(value);
  }
 
  return (
    <div className='adminContent'>
      <div className='div1'>
        <div className='div2'>
          <div className='course-page'>
            <h1 style={{ marginBottom: "20px" }}>
            {courseName ? ` ${courseName.toUpperCase()} Videos` : 'Courses'}
            </h1>
            <div className='main-course'>

              <div className='buttons'>
                <button onClick={() => handleCourse('html')}> HTML</button>
                <button onClick={() => handleCourse("css")}> CSS</button>
                <button onClick={() => handleCourse("js")}> JavaScript</button>
                <button onClick={() => handleCourse("react")}> React</button>
                <button onClick={() => handleCourse("node")}> Node Js </button>
                {/* <button id='deleteVideo' onClick={() => handleCourse("delete")}>Deleted Videos</button> */}
              </div>
              <div className='dropdown'>
                <select id='dropdown' >
                  <option value=''>Choose one</option>
                  <option value='option1' > Priyabrata Sir </option>
                  <option value='option2' > Kushal Sir </option>

                </select>
              </div>

              <div className='body-page'>
                <div className='left-content'>


                  {/* * Renders a list of course cards with relevant information.
             * @param {Array} course - An array of course objects.
             * @returns JSX elements representing the course cards. */}

                  {
                    course.map((course, index) => (
                      <div key={index} className='sample-card '>
                        {
                          course.isDELETED ?
                            ""
                            :
                            (

                              <a onClick={() => handeldelete(course._id)} style={{ float: "right" }}>
                                <img width="25" height="25" src={dustbin} alt="external-Dustbin-web-design-and-development-solid-design-circle" style={{ cursor: "pointer" }} />
                              </a>

                            )
                        }
                        <p> Serial No:- {index + 1} </p>
                        <p> Topic Name:- {course.title} </p>
                        <p> Tutor Name:- {course.tutor} </p>
                        <div className='pre-update'>
                          <p
                            onClick={() =>
                              handleVideoClick(
                                `${VIDEO_URL}/${course.video}`
                              )
                            }
                          >Preview Video</p>
                          <p onClick={() => updateDetails(course)}
                          >Update Data</p>
                        </div>
                      </div>
                    ))
                  }


                </div>

                {/* * Renders a video player component based on the presence of a selected video.
           * If a selected video is provided, it renders a video player with the specified source.
           * If no selected video is provided, it renders a video player without a source.
           * @param {string} selectedVideo - The URL of the selected video.
           * @returns The JSX code for rendering the video player component. */}

                {
                  selectedVideo ?
                    <div className='right-content'>

                      <video
                        preload="auto"
                        width={440}
                        height={360}
                        controls
                        src={selectedVideo}
                        controlsList="nodownload"
                      ></video>

                    </div>
                    :

                    <div className='right-content'>

                      <video
                        preload="auto"
                        width={440}
                        height={360}
                        controls
                      ></video>

                    </div>
                }
                {
                  showForm ? <UpdateCourseVideo setShowForm={setShowForm} selectedDetails={selectedDetails} /> : ""
                }
                {
                  showDeleteForm ? <DeleteCourse courseName={courseName} setDeleteForm={setDeleteForm} isId={isId} resfresh={resfresh} setRefresh={setRefresh} /> : ""
                }

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>



  )
}
