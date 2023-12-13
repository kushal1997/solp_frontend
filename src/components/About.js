import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';
import sl1 from '../images/sl1.jpg';
import sl2 from '../images/sl2.jpg';
import sl3 from '../images/sl3.jpg';
import './mediaScreen.css';
import Subheader from './Subheader';

export const About = () => {
  return (
    <section className='hero-about'>
      <Subheader heading='Our Company' />
      <div className='container'>
        <div className='row hero_row'>
          <div className='col-md-8'>
            <p><h2 style={{ color: '#000', fontFamily: 'fantasy' }}>Join us today to embark on a transformative journey of learning and skill development!</h2>
              <span style={{ color: '#000', fontWeight: 'bold', fontSize: '25px' }}>W</span>elcome to "Steps of Learning Process" ! We are the premier platform for online learning, with a specialization in coding and programming. As a subsidiary of <a href="https://www.dayacs.com/" target="_blank" rel="noopener noreferrer">Daya Consultancy Services PVT. LTD.</a>, we benefit from the extensive expertise and experience of our parent company while maintaining our own unique identity and specialization with our following GST no - <a style={{color: "rgb(97, 97, 245)",fontWeight: 'bold'}}>21AAICD8098A1ZT</a>. Our unique approach to education includes real-time live project work, providing students with hands-on experience. With a diverse range of online courses, we empower learners to master the latest technologies and skills. Join us on this journey of continuous learning and skill development.</p>

            <p><span style={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>E</span>nrollment - Students begin their journey by enrolling in our platform, gaining access to our extensive library of courses.</p>
            <p><span style={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>C</span>ourse Selection - Learners choose from a variety of specialized coding courses tailored to their interests and career goals.</p>
            <p><span style={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>R</span>eal-Time Learning - Our instructors engage students in live, interactive lessons, ensuring a dynamic and immersive learning experience.</p>
            <p><span style={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>P</span>roject Integration - Practical knowledge is gained through real-time Live Project work, where students apply what they've learned in a real-world context.</p>
            <p><span style={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>S</span>kill Mastery - Through consistent practice, students master coding skills that empower them in their careers.</p>
            <p><span style={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>C</span>ertification - Upon successful completion, students receive certifications to validate their expertise.</p>
            {/* <p><span style={{color:'#000',fontWeight:'bold',fontSize:'15px'}}> C</span>areer Pathways - We guide our graduates toward various career opportunities, ensuring they are well-equipped for success.</p> */}


          </div>
          <div className='col-md-4'>
            <Carousel>
              <div>
                <img src={sl2} />
                <p className="legend">SLP</p>
              </div>
              <div>
                <img src={sl1} />
                <p className="legend">SLP</p>
              </div>
              <div>
                <img src={sl3} />
                <p className="legend">SLP</p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}


