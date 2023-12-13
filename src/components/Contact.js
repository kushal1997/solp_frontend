import React from 'react';
import images from '../images/contact.png';
import loc from '../images/loc.png';
import phn from '../images/phn.png';
import mail from '../images/mail.png';
import web from '../images/web.png';
import './mediaScreen.css';
import Subheader from './Subheader';
import { useLocation } from 'react-router-dom';


export const Contact = () => {
  const location =useLocation();
  return (
    <>
    {
      location.pathname === '/contact' && <Subheader heading='Contact Us'/>
    }
      <section className='hero-contact'>
        <div className='container-fluid'>
       
          <div className='row'>
            <div className='col-md-8'>
              <div className='row'>
                <div className='col-md-5'>
                  <img src={loc} />
                  <h5>MAIN OFFICE</h5>
                  <p>B-19, 1<sup>st</sup> Floor,<br />
                    Bhubaneswar,Odisha</p>
                </div>
                <div className='col-md-5'>
                  <img src={phn} />
                  <h5>PHONE NUMBER</h5>
                  <p>(91)-8144802704</p>
                </div>

                <div className='col-md-5'>
                  <img src={mail} />
                  <h5>E-MAIL</h5>
                  <p>info@Dayacs.com</p>
                </div>
                <div className='col-md-5'>
                  <img src={web} />
                  <h5>WEBSITE</h5>
                  <p>stepsoflearningprocess.com</p>
                </div>
              </div>

            </div>


            <div className='col-md-4'>
              <img src={images} style={{ height: 'auto', width: '100%' }} className='footer-img' />
            </div>

          </div>
        </div>
      </section>
    </>

  )
}

