import React from 'react';
import images from '../images/callcenter.png';
import './mediaScreen.css';
import Subheader from './Subheader';
import { useLocation } from 'react-router-dom';


export const Services = () => {
    const location =useLocation();
    return (
      <>
      {
        location.pathname === '/services' && <Subheader heading='Our Services'/>
      }
        <section className='hero-contact'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8'>
                        <h2 style={{color:'#000',marginLeft:'70px',fontFamily:'cursive'}}>We offers a wide range of training programs:-</h2>
                        <ul className='serv_p'>
                            <li>Programers focus on IT and soft skills development.</li>
                            <li>Courses designed to meet modern job market demands.</li>
                            <li>Aim to equip individuals with career-enhancing knowledge and skills.</li>
                            <li>Training programs offer valuable course certificates upon successful completion.</li>
                            <li> Certificates attest to newly acquired expertise.</li>
                            <li>Training programs cater to both technical skills in Information Technology and soft skills.</li>
                            <li> Soft skills include communication, teamwork, and leadership.</li>
                            <li>Expert instructors with real-world experience</li> 
                            <li>Practical, hands-on knowledge</li>
                            <li>Immediate application in professional lives</li>
                            <li>Commitment to excellence</li>
                            <li>Focus on helping individuals reach their full potential</li>
                            <li> Gateway to a brighter and more successful future in IT and beyond</li>
                        </ul>
                    </div>
                  
                    <div className='col-md-4'>
                        <img src={images} style={{ height: '75%', width: '90%' }} className='footer-img' />
                    </div> 
                  
                </div>
            </div>
        </section>
      </>
  
    )
}


