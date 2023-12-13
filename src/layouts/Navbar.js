import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';
import { FaBars } from 'react-icons/fa';
// import { ImCross } from 'react-icons/im';
import logo from '../images/logo1.png';
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import '../components/mediaScreen.css';
import AuthContext from '../context/AuthContext';

export const Navbar = () => {
  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext);

  const handleLogin = () => {
  
    // Upon successful login, store the authentication token in localStorage and update isLoggedIn
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Send a request to the backend to logout
    // Upon successful logout, remove the token from localStorage and update isLoggedIn
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  // const [mobile, setMobile] = useState(false)

  // const [corRotated, setcorRotated] = useState(true);
  // const [corSubMenu, setcorSubMenu] = useState(false);

  // const oncorClick = () => {
  //   setcorRotated(!corRotated);
  //   setcorSubMenu(!corSubMenu);
  // }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        {/* <a class="navbar-brand" href="#">Navbar</a> */}
        <Link to='/' class="navbar-brand">
          <img src={logo} alt="dy" className='logo' />
        </Link>
        <Link to='/'>
          <h2 className='text_nav'> STEPS OF LEARNING PROCESS</h2>
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <li className="nav-link">
                <NavLink to='/'>
                  Home
                </NavLink>
              </li>
            </li>
            <li class="nav-item">
              <li className="nav-link">
                <NavLink to='/about'>
                  About
                </NavLink>
              </li>
            </li>
            <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Certification
              </Link>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link to="/courses/js" className="dropdown-item" >
                  JAVASCRIPT
                </Link>
                <Link to="/courses/html_css" className="dropdown-item" >
                  HTML
                </Link>

                <Link to="/under_development" className="dropdown-item" >
                  CSS
                </Link><Link to="/under_development" className="dropdown-item" >
                  React
                </Link>
              </div>
            </li>
            <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Learning & Development
              </Link>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link to="/under_development" className="dropdown-item" >
                  HR Training
                </Link>
                <Link to="/under_development" className="dropdown-item" >
                  Trainer Profile
                </Link>

                <Link to="/under_development" className="dropdown-item" >
                  Strategic Core Member
                </Link>
                <Link to="/under_development" className="dropdown-item" >
                  It Training
                </Link>
                <Link to="/under_development" className="dropdown-item" >
                  Blogs
                </Link>
              </div>
            </li>
            
            <li class="nav-item">
              <li className="nav-link">
                <NavLink to='/services'>
                  Services
                </NavLink>
              </li>
            </li>
            <li class="nav-item">
              <li className="nav-link">
                <NavLink to='/contact'>
                  Contact
                </NavLink>
              </li>
            </li>
            <li class="nav-item">
              <li className="nav-link">
                {(isLoggedIn) ? (
                  <NavLink to='/' onClick={handleLogout}>
                    Logout
                  </NavLink>
                ) : (
                  <NavLink to='/login' onClick={handleLogin}>
                    Login
                  </NavLink>
                )}
              </li>

            </li>

          </ul>
        </div>
      </nav>


    </>
  );
};
