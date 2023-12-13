import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../services/css/counselling.css";
import {  toast,ToastContainer  } from 'react-toastify';
import axios from 'axios';
const Logout = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // Get the navigation function from react-router-dom
  const navigate = useNavigate();

  // Function to handle the logout action
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    axios.get(`${BACKEND_URL}/users/logout`, { headers: headers })
    .then(res=>{
      if(res) alert("You are successfully loged out")
    })
  .catch(err=>toast.error(err));
    toast.success("logout successfully");
    // Redirect to the /login page
    navigate('/login');
  };

  return (
    <div className='containerCoun'>
    <ToastContainer/>
      <p>Are you sure you want to log out?</p>
      <button className='submit' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
