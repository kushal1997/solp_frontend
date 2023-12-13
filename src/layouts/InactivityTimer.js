import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


export const InactivityTimer = () => {
    const navigate=useNavigate();
    const [idleTime, setIdleTime] = useState(0);
    // console.log("idleTime:",idleTime);
    const logoutThreshold =30* 60000; // 60 seconds (1 minute)
  
    useEffect(() => {
      const resetTimer = () => {
        setIdleTime(0);
      };
  
      const handleIdle = () => {
        setIdleTime((prevIdleTime) => prevIdleTime + 1000); // Increment idle time every second
  
        if (idleTime >= logoutThreshold) {
          // Logout user after reaching logout threshold
          localStorage.removeItem("token");
          alert('You have been inactive for too long and have been logged out.');
          navigate("/login")
          // Perform logout logic (e.g., redirect to login page)
        }
      };
  
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
  
      const intervalId = setInterval(handleIdle, 1000); // Check for inactivity every second
  
      return () => {
        clearInterval(intervalId);
        window.removeEventListener('mousemove', resetTimer);
        window.removeEventListener('keydown', resetTimer);
      };
    }, [idleTime]);
  
    
  };
  
