import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router';
// import { BACKEND_URL } from '../config/constraints';
import "./forgo.css"

export const ForgotPassword = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  console.log(email);

  const [genOTP, setGenOTP] = useState(true);
  const [velOTP, setVelOTP] = useState(false);
  const [changePass, setChangePass] = useState(false);


  const handleGenOTP = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/generate_otp`, { email })
      .then((res) => {
        if (res.status === 200) {
          // Assuming the server returns the OTP in the response
          console.log(res.data.success)
          if (res.data.success === true) {
            setGenOTP(false);
            setVelOTP(true);
            setChangePass(false);
          }
        } else {
          console.error('Failed to generate OTP');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleVelOTP = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/validate_otp`, { email, otp })
      .then((res) => {
        if (res.status === 200) {
          // Assuming the server returns the OTP in the response
          console.log(res.data.success)
          if (res.data.success === true) {
            setGenOTP(false);
            setVelOTP(false);
            setChangePass(true);

          }
          if (res.data.success === false) {
            alert("Generate OTP again");
            setGenOTP(true);
            setVelOTP(false);
            setChangePass(false);
          }
        } else {
          console.error('Failed to generate OTP');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleChangePass = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/change_password`, { email, password })
      .then((res) => {
        if (res.status === 200) {
          // Assuming the server returns the OTP in the response
          console.log(res.data.success);
          if (res.data.success === true) {
            navigate("/login");
          }
        } else {
          console.error('Failed to generate OTP');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleSelectionChange = (newSelection) => {
    setSelectedValues(newSelection);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConPasswordVisibility = () => {
    setShowConPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <Fragment>
      
        
          <div className="forgotPass">
            {/* <h2 style={{ color: "#000" }}>Add user form</h2> */}
            {
              genOTP && (
                <>
                  <form className="genOTP" onSubmit={handleGenOTP}>
                  <h4>Generate Your OTP</h4>
                  <div className="project-mail">
                      <label htmlFor="Email">
                        Email Id
                        <input
                          type="email"
                          id="id"
                          placeholder="Enter your Email"
                          name="email"
                          value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                      </label>

                      <br />
                      <button type="submit" className="OTP1" style={{alignItems:'center'}}>
                        Generate OTP
                      </button>
                    </div>
                  </form>
                </>
              )
            }



            {
              velOTP && (
                <>
                  <form className='velOTP' onSubmit={handleVelOTP}>
                  <h4>Validate Your OTP</h4>
                  <div style={{display:"flex",flexDirection:"column"}}>
                    <label htmlFor="Email">
                        Email Id
                        <p style={{ color: "black" }}>{email}</p>
                      </label>
                      <label htmlFor="velOTP">
                        Enter OTP
                        <input
                          type="text"
                          id=""
                          placeholder="Enter your OTP"
                          name="otp"
                          value={otp} onChange={(e) => setOtp(e.target.value)}
                        />
                      </label>
</div>
                      <br />
                      <button type="submit" className="OTP2">
                        Validate OTP
                      </button>
                    
                  </form>
                </>
              )
            }


            {
              changePass && (
              
                  <form className="changePass" onSubmit={handleChangePass}>
                  <h4>Set Your New Password</h4>
                    <div className="project-mail">
                      <label htmlFor="Email">
                        Email Id
                        <p style={{ color: "black" }}>{email}</p>
                      </label>


                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="velOTP">Password:
                          <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="pass"
                            placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                          />
                          <i
                            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                            aria-hidden="true"
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }}
                          ></i>
                        </label>

                      </div>

                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="velOTP">Confirm Password:
                          <input
                            type={showConPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            id=""
                          />
                          <i
                            className={`fa ${showConPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                            aria-hidden="true"
                            onClick={toggleConPasswordVisibility}
                            style={{ cursor: 'pointer' }}
                          >
                          </i>
                        </label>

                      </div>
                      <button type="submit" className="OTP3"> Submit </button>
                    </div>

                  </form>
                
              )
            }
          </div>
        

    </Fragment>
  )
}
