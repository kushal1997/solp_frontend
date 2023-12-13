import React, { useEffect, useState } from 'react'
import './admin.css';
import AuthContext from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import retrive from "../assets/retrive.svg"

export const DeletedCourse = () => {
  const navigate = useNavigate();
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
  const { role, success ,setIsLoggedIn} = React.useContext(AuthContext);
  const token = localStorage.getItem("token");
  if (token && role !== "admin" && success === true) {
    <Navigate to="/login" />
  }
  const [course, setCourse] = useState([]);
 
  const headers = new Headers({
    Authorization: `Bearer ${token}`
  });
  /**
   * Updates the selected video state with the provided video URL.
   * @param {string} videoUrl - The URL of the video that was clicked.
   * @returns None
   */
  const [selectedVideo, setSelectedVideo] = useState(null);
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
    fetch(`${BACKEND_URL}/courses/get_deleted_course/${courseName}`, {
      headers
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.courseData);
        setCourse(data.courseData);
      }).catch(err => {
        alert("Session Timeout", err);
        setIsLoggedIn(false);
        navigate("/login")
      });
  }, [resfresh,courseName]);



  const handleCourse = (value) => {
    setCourseName(value);
  }

  const handelretrive = (value) => {
    console.log("id",value,"courseName",courseName)
    fetch(`${BACKEND_URL}/courses/retrive_course/${courseName}/${value}`, {
      method: 'GET',
      headers
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        alert("Video is Retrived");
        setRefresh(resfresh + 1);
        return response.json(); // You may adjust this based on your response format
      })
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
  return (
    <div className='adminContent'>
      <div className='div1'>
        <div className='div2'>
          <div className='course-page'>
            <h1 style={{ marginBottom: "20px" }}>
            {courseName ? ` Deleted ${courseName.toUpperCase()} Videos` : 'Deleted Courses'}</h1>
            <div className='main-course'>

              <div className='delButtons'>
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

                        <a onClick={() => handelretrive(course._id)} style={{ float: "right" }}>
                          <img width="25" height="25" src={retrive} alt="checkmark" style={{ cursor: "pointer" }} />
                        </a>

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


              </div>
            </div>
          </div>
        </div>
      </div>

    </div>



  )
}

