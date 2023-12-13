import React, { Fragment, useEffect, useState } from "react";
import "./css/uploadListCSS.css";
import AuthContext from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router";
import playVideo from "../assets/playVideo.png"
import pipelineMenu from "../assets/pipelineMenu.png"

export const VideoList = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const VIDEO_URL = process.env.REACT_APP_VIDEO_URL;
    const navigate = useNavigate();
    const { role, success, userId, setIsLoggedIn } =
        React.useContext(AuthContext);
    // console.log("user id:", userId)
    const token = localStorage.getItem("token");

    const [scrollerHeight, setScrollerHeight] = useState(0);
    if (token && role !== "user" && success === true) {
        <Navigate to="/login" />;
    }
    const [toggle, setToggle] = useState(false);

    const [medias, setMedias] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const [showCourse, setShowCourse] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [toggleForm, setToggleForm] = useState(true);
    const [apiResponse, setApiResponse] = useState({
        message: "",
        user: {
            isPYTHON: null,
            isJAVA: null,
            isTESTING: null,
            isSOFTSKILL: null,
            isHTML: null,
            isCSS: null,
            isJS: null,
            isREACT: null,
            isNODE: null,
            isDELETED: null,
        },
        success: null,
    });
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        // Assume you make an API call here and set the response
        // For example, using the fetch function
        // Replace this with your actual API call
        fetch(`${BACKEND_URL}/users/profile/${userId}`, {
            headers,
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.user.bio._id)
                setApiResponse(data);
                if (data.user.bio._id) {
                    setToggleForm(false);
                }
            })
            .catch((err) => {
                alert("User Details Not Found", err);
                setIsLoggedIn(false);
                navigate("/login");
            });
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    const handleToggle = () => {
        setToggle(!toggle);
        setShowCourse(false);
    };
    const handleShowCourse = () => {
        setShowCourse(!showCourse);
        setShowProfile(false);
    };
    const handleShowProfile = () => {
        setShowProfile(!showProfile);
        setShowCourse(false);
    };

    useEffect(() => {
        fetch(`${BACKEND_URL}/courses/get_course/html`, {
            headers,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMedias(data.courseData);
            })
            .then(() => {
                const calculateScrollerHeight = () => {
                    const vPaneHeight = document.querySelector(".v-pane").clientHeight;
                    const courseContentHeight = document.querySelector("h3").clientHeight;
                    setScrollerHeight(vPaneHeight - courseContentHeight);
                    const scroller = document.querySelector(".scroller");
                    // set height of scroller
                    if (scroller) {
                        scroller.style.height = `${vPaneHeight - courseContentHeight}px`;
                    }
                };
                calculateScrollerHeight();

                // Re-run if window resize affects layout
                window.addEventListener("resize", calculateScrollerHeight);

                return () => {
                    window.removeEventListener("resize", calculateScrollerHeight);
                };
            });
    }, []);

    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoClick = (videoUrl) => {
        // console.log(videoUrl)
        setSelectedVideo(videoUrl);
    };
    const users = apiResponse.user;


    const handleChange = (event) => {
        setSelectedLanguage(event.toLowerCase());
    };
    useEffect(() => {
        console.log("selectedLanguage", selectedLanguage);
        fetch(`${BACKEND_URL}/courses/get_course/${selectedLanguage}`, {
          headers,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) setMedias(data.courseData);
            else {
              localStorage.removeItem("token");
              navigate("/login");
            }
          })
          .catch((err) => {
            alert("Session Timeout", err);
            setIsLoggedIn(false);
            navigate("/login");
          });
    }, [selectedLanguage])


    return (
        <Fragment>
            <section className="videoList">
                <div className="v-container">
                    <div className="v-pane">
                        <div className="embed-responsive embed-responsive-16by9">
                            {selectedVideo ? (
                                <div className="video-player">
                                    <video
                                        id="vp"
                                        preload="auto"
                                        width={640}
                                        height={360}
                                        controls
                                        src={selectedVideo}
                                        controlsList="nodownload"
                                    ></video>
                                </div>
                            ) : (
                                <div className="video-player">
                                    <video
                                        preload="auto"
                                        width={640}
                                        height={360}
                                        controlsList="nodownload"
                                        controls
                                    ></video>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="v-list">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <h3>
                                {selectedLanguage ? ` ${selectedLanguage.toUpperCase()} Content` : "Course Content"}

                            </h3>
                            <img
                                onClick={handleToggle}
                                style={{ cursor: "pointer" }}
                                width="30"
                                height="30"
                                src={pipelineMenu}
                                alt="menu"
                            />
                        </div>

                        {toggle ? (
                            <div className="sidebar">
                                <p onClick={handleShowCourse}>Select Your Course</p>
                                <p onClick={handleShowProfile}>My Profile </p>

                                {showCourse && (
                                    <div className="sub_sidebar">
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            {/* <label htmlFor="languages">Select a language:</label>
                                        <select id="languages" onChange={handleChange} value={selectedLanguage}>
                                            <option value={null}>Select</option>
                                            
                                        </select> */}

                                            {Object.keys(users).map(
                                                (language) =>
                                                    language.startsWith("is") &&
                                                    users[language] && (
                                                        <button
                                                            style={{ marginTop: "1rem" }}
                                                            key={language}
                                                            value={language}
                                                            onClick={()=>handleChange(language.substring(2))}
                                                        >
                                                            {language.substring(2)}{" "}
                                                            {/* Remove the 'is' prefix */}
                                                        </button>
                                                    )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {showProfile && (
                                    <div className="sub_sidebar">
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <button
                                                style={{ marginTop: "1rem" }}
                                                onClick={() => navigate("/change_password")}
                                            >
                                                Change Password
                                            </button>
                                            {toggleForm ? (
                                                <button
                                                    style={{ marginTop: "1rem" }}
                                                    onClick={() => navigate("/add_bio_data")}
                                                >
                                                    Add Bio Details
                                                </button>
                                            ) : (
                                                <button
                                                    style={{ marginTop: "1rem" }}
                                                    onClick={() => navigate("/update_bio_data")}
                                                >
                                                    Update Bio Details
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                        <div
                            className="scroller"
                            data-wow-delay="00ms"
                            data-wow-duration="1500ms"
                            style={{ visibility: "visible" }}
                        >
                            {medias &&
                                medias.map((media, index) => (
                                    <div
                                        key={media.id}
                                        className={`playlist-item ${selectedVideo === `${VIDEO_URL}/${media.video}`
                                            ? "active"
                                            : ""
                                            }`}
                                    >
                                        <div
                                            className="v-list-item"
                                            onClick={() =>
                                                handleVideoClick(`${VIDEO_URL}/${media.video}`)
                                            }
                                        >
                                            <div className="video-title">
                                                {/* <input type="checkbox" id="check_box" />{" "} */}
                                                {index + 1})&nbsp;
                                                {media.title}
                                            </div>
                                            <div className="video-duration">
                                                <img
                                                    width="15"
                                                   height="15"
                                                    src={playVideo}
                                                    alt="laptop-play-video--v1"
                                                />
                                                &nbsp;
                                                <span>{media.videoDuration}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* <hr />
        <BottomHeader />
        <hr /> */}
            </section>
        </Fragment>
    );
};
