import React from 'react';
import code from '../images/home.png';
import { Rating } from './Rating';
import { ReactVideoPlayer } from './ReactVideoPlayer';
import { Contact } from './Contact';
import './mediaScreen.css';



export const Home = () => {
  return (
    <section className='hero'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <img src= {code} />
          </div>
          <div className='col-md-6'>
            <h5>Certification Course for Beginners</h5>
            <h2>GET THE CHANCE TO <br /> PARTICIPATE IN A <br /> <span> REALTIME PROJECT</span>
           <br/> FROM THE COMFORT <br/> OF YOUR HOME</h2>
            <p>Learn how to Add Dynamic Client-Side Functions to your Web Pages using CSS & JavaScript etc.</p>
            <p>Created By DCS</p>
           {/* <Rating/> */}
            <p><i class="fa fa-pencil-square-o" style={{fontSize:'18px',color:'#4a5591'}}></i> &nbsp; Last Updated 30/23 &nbsp;&nbsp;
            <i class="fa fa-globe" style={{fontSize:'18px',color:'#4a5591'}}></i>  &nbsp; English</p>
          </div>
        </div>
     
        <ReactVideoPlayer/>
        <Contact/>

      </div>
    </section>
  )
}
