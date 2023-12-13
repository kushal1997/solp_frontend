import React from 'react'
import images from '../images/three.png'
import "./style.css"
import './mediaScreen.css'
import pin2 from '../images/pin2.png'
import { CourcesJavascript } from './CourcesJavascript'
import { JSCourse } from '../data/JSContent'
import { useLocation } from 'react-router'
import { HTMLCSSCourse } from '../data/HTMLContent'
import facebook from "../../assets/facebook-new.png"
import twitter from "../../assets/twitter--v1.png"
import linkedin from "../../assets/linkedin.png"
import instagram from "../../assets/instagram-new--v1.png"
export const CourcesAbout_Instructor = ({ data }) => {
    const location = useLocation();
    return (
        <>
            {
                location.pathname === '/courses/js' && <CourcesJavascript data={JSCourse} />
            }
            {
                location.pathname === '/courses/html_css' && <CourcesJavascript data={HTMLCSSCourse} />
            }


            <section className='sec_area'>
                <div className='container-fluid'>
                    <div className='row content'>
                        <div className="team-top-bg">
                            <img src={images} alt="images" />
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-12">
                                <div className="team-three-image">
                                    <img className='pin2' src={data.img} alt='pin2' />
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                                <div className="team-three-top-wrapper">
                                    <div className="common-title team3-title">
                                        <h3>{data.name}</h3>
                                        <h5>{data.designation}</h5>
                                    </div>
                                    <p>{data.about}</p>
                                    <p>
                                        <strong>Experience: </strong> {data.exp} Years
                                    </p>

                                    <div className="volunteers-media">
                                        <ul>
                                            <li>
                                                <a href="#0">
                                                    <img width="28" height="28" style={{ marginTop: "5px" }} src={facebook} alt="facebook-new" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#0">
                                                    <img width="28" height="28" style={{ marginTop: "5px" }} src={twitter} alt="twitter--v1" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#0">
                                                    <img width="28" height="28" style={{ marginTop: "5px" }} src={linkedin} alt="linkedin" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#0">
                                                    <img width="28" height="28" style={{ marginTop: "5px" }} src={instagram} alt="instagram-new--v1" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}



