import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const ActivityTracker = ({setInactiveTime,inactiveTime}) => {
    
        console.log("inactiveTime",inactiveTime)
    const handleMouseActivity = () => {
        setInactiveTime(0);
    };

    const handleKeyboardActivity = () => {
        setInactiveTime(0);
    };

    const handleScreenActivity = () => {
        setInactiveTime(0);
    };

    useEffect(() => {
        const mouseMoveListener = () => handleMouseActivity();
        const keyDownListener = () => handleKeyboardActivity();
        const visibilityChangeListener = () => handleScreenActivity();

        document.addEventListener('mousemove', mouseMoveListener);
        document.addEventListener('keydown', keyDownListener);
        document.addEventListener('visibilitychange', visibilityChangeListener);

        // Start the timer only when the component mounts
        const interval = setInterval(() => {
            setInactiveTime((prevInactiveTime) => prevInactiveTime + 1);

            // Check if inactive for a certain duration (e.g., 5 minutes)
            if (inactiveTime >= 1 * 60) {
                // Token deletion logic here
                localStorage.removeItem("token");
                
            }
        }, 60); // Check every second

        // Clear the interval when the component is unmounted
        return () => {
            document.removeEventListener('mousemove', mouseMoveListener);
            document.removeEventListener('keydown', keyDownListener);
            document.removeEventListener('visibilitychange', visibilityChangeListener);
            clearInterval(interval);
        };
    }, []); // Empty dependency array to run only on mount

    // Function to start the timer after login


    return (
        <div>
            <p>Times'up You are Logged Out</p>
            <Link to="/">
                <button >Start Timer</button>
            </Link>
            {/* Your component content here */}
        </div>
    );
};

export default ActivityTracker;
