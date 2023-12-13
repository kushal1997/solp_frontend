import React from 'react';
import s from '../images/s.gif';


const Subheader = ({heading,subheading}) => {

  
  return (
    <>
      <section className='sub-img' style={{background: `url(${s})` }}  >
        <div className='container-fluid' style={{backgroundColor:'#000'}}>
          <div className='row'>
            <div class="hero-text">
                <h1 style={{fontSize:'50px'}}>{heading}</h1>
                {/* <h3>Certification Course for Beginners</h3> */}
                <h3 style={{fontSize:'25px'}}>{subheading}</h3>
                {/* <Link to='/contact'><button className='sub-btn'>Contact Us</button></Link> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Subheader;
