import React from 'react';
import './style.css';
import key from "../images/ke.png";
import './mediaScreen.css'
import digital_marketing from "../../assets/digital-marketing-flaticons-lineal-color-flat-icons-2.png"
import trust from "../../assets/trust--v1.png"
import javascript from "../../assets/javascript--v1.png"

export const CourcesAbout = ({ data }) => {
  const { courseDetails } = data.two;
  const { courseFacilities } = data.three;
  const {courseContent} =data.four;
  const renderDetails = Object.entries(courseDetails).map(([key, value]) => (
    <li key={key}>
      <strong>{key}:</strong> {value}
    </li>
  ));
  const renderFacilities = Object.entries(courseFacilities).map(([key, value]) => (
    <li key={key}>
      * {value}
    </li>
  ))
  const renderContent = Object.entries(courseContent).map(([key, value]) => (
    <li key={key}>
      {value}
    </li>
  ))
  return (
    <>
      <section className="services home-three-service">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="align-title">
                <h5>{data.title}</h5>
                <h3>
                  services to people in <br /> times of need
                </h3>
              </div>
            </div>
          </div>

          <div className=" row ">

            <div className='col-lg-3 col-md-3 col-sm-6 col-xs-6' >
              <div
                className="service-container wow fadeInUp"
                data-wow-delay="00ms"
                data-wow-duration="1500ms"
                style={{ visibility: "visible" }}
              >
                <div className="service-container-overlay" />
                <div className="service-number">
                  <span>01</span>
                </div>
                <div className="service-container-inner">
                  <div className="service-icon">
                    <span className="icon-&#-05" />
                    <img
                      marginbottom="-8px"
                      width={48}
                      height={48}
                      src={javascript}
                      alt="javascript--v1"
                    />
                  </div>
                  <h5>{data.one?.title}</h5>
                  <p style={{ display: 'block', color: 'black' }}>
                    {data.one?.content}
                  </p>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6 col-xs-6' >
              <div
                className="service-container wow fadeInUp"
                data-wow-delay="300ms"
                data-wow-duration="1500ms"
                style={{ visibility: "visible" }}
              >
                <div className="service-container-overlay service-container-overlay-active" />
                <div className="service-number">
                  <span>02</span>
                </div>
                <div className="service-container-inner">
                  <div className="service-icon">
                    <span className="icon-&#-05">
                      <img src={key} className='key_image' alt='key'></img>
                    </span>
                  </div>
                  <h5>Key Information</h5>
                  <ul style={{ display: 'block' }}>
                    {renderDetails}

                  </ul>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6 col-xs-6'>
              <div
                className="service-container wow fadeInUp"
                data-wow-delay="600ms"
                data-wow-duration="1500ms"
                style={{ visibility: "visible" }}
              >
                <div className="service-container-overlay" />
                <div className="service-number">
                  <span>03</span>
                </div>
                <div className="service-container-inner">
                  <div className="service-icon">
                    <span className="icon-&#-05" />
                    <img width="48" height="48" src={trust} alt="trust--v1" />
                  </div>
                  <h5> Facilities</h5>
                  <ul style={{ display: 'block' }}>
                  {renderFacilities}
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6 col-xs-6'>
              <div
                className="service-container wow fadeInUp"
                data-wow-delay="900ms"
                data-wow-duration="1500ms"
                style={{ visibility: "visible" }}
              >
                <div className="service-container-overlay" />
                <div className="service-number">
                  <span>04</span>
                </div>
                <div className="service-container-inner">
                  <div className="service-icon">
                    <span className="icon-&#-05" />
                    <img width="44" height="44" src={digital_marketing} alt="external-content-digital-marketing-flaticons-lineal-color-flat-icons-2" />
                  </div>
                  <h5>Course Content </h5>
                  <p style={{ display: 'block' }}>
                    <ul>
                      {renderContent}

                      <div className="container">

                        {/* Trigger the modal with a button */}
                        {/* <button
                            type="button"
                            className="btn btn-info btn-lg"
                            data-toggle="modal"
                            data-target="#myModal"
                          >
                            Read More
                          </button> */}
                        {/* Modal */}
                        <div className="modal fade" id="myModal" role="dialog">
                          <div className="modal-dialog">
                            {/* Modal content*/}
                            <div className="modal-content">
                              <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">
                                  ×
                                </button>
                                <h4 className="modal-title">JS Course Content </h4>
                              </div>
                              <div className="modal-body">
                                <p>Some text in the modal.</p>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-default"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                    </ul>
                  </p>
                </div>
              </div>
            </div>

          </div>



        </div>
      </section>

    </>
  );
}


