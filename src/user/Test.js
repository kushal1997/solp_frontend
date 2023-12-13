import React, { Fragment } from 'react'
import "./css/uploadListCSS.css";

export const Test = () => {
    return (
        <Fragment>
            <div className="userPage">

                <div className="div1">
hamburger
                </div>

                <div className="div2">
                    <div className="video">
                        <h4>
                            Understand the JavaScript and technical concepts behind Node JS
                        </h4>
                        <div className="videoPlayer">
                            <video
                                preload="auto"
                                width={1000}
                                height={560}
                                controls
                            ></video>
                        </div>
                    </div>
                    <div className="list">
                    <h3 >Course Content</h3>
                    <div>
                        
                    </div>
                    </div>
                </div>

                <div className="div3">
lower body
                </div>
            </div>
        </Fragment>
    )
}
