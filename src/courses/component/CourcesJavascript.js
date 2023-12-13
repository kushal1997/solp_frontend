import React from "react";
import "./style.css";
import './mediaScreen.css'
import images from "../images/home-three-banner-bg.png";
import gif2 from "../images/gif2.gif";
import "./style.css"
import arrow from "../../assets/arrow.png"
import video from "../../assets/video.png"
import article from "../../assets/article--v1.png"
import external_resource from "../../assets/external-resource-project-management-outline-black-m-oki-orlando-3.png"
import ringer_volume from "../../assets/ringer_volume.png"
import experimental_trophy_serif from "../../assets/experimental_trophy_serif.png"
export const CourcesJavascript = ({ data }) => {
  const renderDetails = Object.entries(data.requirements).map(([key, value]) => (
    <li key={key}>
      <img width="20" height="20" src={arrow} alt="arrow" /> &nbsp;
      {value}
      </li>
  ));
  return (
    <section className="home-three-banner js">
      <div className="banner-image">
        <div className="container-fluid">
          <div className="row_home" style={{ backgroundImage: `url(${images})` }}>
            <div className="col-md-6 banner-inner">
              <h4 style={{ fontSize: '50px' }}>{data.title}</h4>
              <img src={gif2} alt="loading..." style={{ boxShadow: 'none', border: 'none', marginTop: '0rem', height: 'auto' }} />
            </div>

            <div className="col-md-6 fom_header">
              <div className="incentives--incentives-container--1QKGj"  >
                <h2 className="ud-heading-xl incentives--header--2F4_e" data-purpose="header">
                  This course includes:
                </h2>
                <div className="incentives--double-list-container--3CXhX">
                  <ul className="ud-unstyled-list ud-block-list incentive-list">
                    <li>
                      <div className="ud-block-list-item ud-block-list-item-large ud-block-list-item-tight ud-block-list-item-neutral ud-text-md">

                        <div className="ud-block-list-item-content">
                          <img width="24" height="24" src={video} alt="video" />
                          <span data-purpose="video-content-length">
                            {data.cousrseDetails?.duration}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="ud-block-list-item ud-block-list-item-large ud-block-list-item-tight ud-block-list-item-neutral ud-text-md">

                        <div className="ud-block-list-item-content">
                          <img width="64" height="64" src={article} />
                          <span data-purpose="num-articles">{data.cousrseDetails?.articles} articles</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="ud-block-list-item ud-block-list-item-large ud-block-list-item-tight ud-block-list-item-neutral ud-text-md">

                        <div className="ud-block-list-item-content">
                          <img width="32" height="32" src={external_resource} alt="external-resource-project-management-outline-black-m-oki-orlando-3" />
                          <span data-purpose="num-additional-resources">
                            {data.cousrseDetails?.downloadResources} downloadable resource
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul className="ud-unstyled-list ud-block-list incentive-list">
                    <li>
                      <div className="ud-block-list-item ud-block-list-item-large ud-block-list-item-tight ud-block-list-item-neutral ud-text-md">

                        <div className="ud-block-list-item-content">
                          <img width="50" height="50" src={ringer_volume} alt="ringer-volume" />
                          <span data-purpose="devices-access-incentive">
                            Access on mobile and Laptop
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="ud-block-list-item ud-block-list-item-large ud-block-list-item-tight ud-block-list-item-neutral ud-text-md">

                        <div className="ud-block-list-item-content">
                          <img width="32" height="32" src={experimental_trophy_serif} alt="experimental-trophy-serif" />
                          <span data-purpose="incentive-certificate">
                            Certificate of completion
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="incentives--incentives-container--1QKGj">
                <h2 className="ud-heading-xl incentives--header--2F4_e" data-purpose="header" style={{ marginTop: '0px' }}>
                  Requirements:
                </h2>
                <ul style={{ lineHeight: '40px', color: '#303F9F', fontSize: '16px', fontWeight: '600' }}>
                  {renderDetails}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}



