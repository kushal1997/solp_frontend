// AuthContext.js

import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import { BACKEND_URL } from "../config/constraints";
import { useHistory } from "react-router";
// import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext({
  token: null,
  role: null,
  res: null,
  success: null,
  userId: null,
  setUser: () => { },
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [res, setRes] = useState(null);
  const [success, setSuccess] = useState(null)
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  //  console.log(dbHost);
  //  const backendURL = process.env.BACKEND_UR;
  // console.log(backendURL); 
  console.log(process.env);
  const setUser = (user) => {
    const headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    };
    // const apiURL="http://localhost:8080/users/login"
    // const apiBackendURL="http://backendvideo.stepsoflearningprocess.com:8001/users/login"
    // console.log("token",token)
    // console.log("success",success);
    try {
      axios.post(`${BACKEND_URL}/users/login`, user, { headers: headers })
        .then((res) => {
          if (res.data.success === true) {
            const tokenFromStorage = localStorage.setItem('token', res.data.data.token);
            // console.log(res.data.data.token);
            if (tokenFromStorage) {
              setToken(localStorage.getItem('token'));
            }
            setRole(res.data.role);
            setRes(res);
            setSuccess(res.data.success);
            setUserId(res.data.userId);

            if (res.data.success === true && res.data.role === "admin") {
              alert("Successfull Login")
              navigate("/admin");
            } else if (res.data.success === true) {
              alert("Successfull Login")
              navigate("/userPage");
            }
          }
          else {
            alert("Wrong Credentials")
          }
        });
    } catch (error) {
      console.log("error", error)
    }

  };

  return (
    <AuthContext.Provider value={{ token, role, res, success, userId, setUser,isLoggedIn, setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
