import React, { useEffect } from 'react'
import '../App.css';
import '../courses/component/mediaScreen.css'
import { Link } from 'react-router-dom';

export const Footer = () => {
  useEffect(() => {
    let mybutton = document.getElementById("btn-back-to-top");
    window.onscroll = function () {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    };
  }, [])

  const handleChange = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  return (
    <>
      <section className='footer_sec'>
        <div className='container-fluid '>
          <div className='row_footer'>

            <div className='col-md-6'>
              <p className='text_p'>Steps of Learning Process © 2023. <br className="row-break" /> All Rights Reserved.</p>
            </div>


            <div className='col-md-2' onClick={() => handleChange()}>
              <Link to='/policy/terms_and_condition'>
                <h6>Privacy Policy</h6>
              </Link>
            </div>

            <div className='col-md-4' onClick={() => handleChange()}>
              <Link to='/counselling_form'>
                <h6>Counselling Form</h6>
              </Link>

              <button type="button"
                class="btn btn-danger btn-floating btn-lg"
                id="btn-back-to-top"
                onClick={() => handleChange()}>
                <i class="fa fa-angle-up" style={{ fontSize: '48px', color: '#fff' }}></i>
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}



