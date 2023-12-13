import React from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  // const { rol } = React.useContext(AuthContext);
  const tokenData = localStorage.getItem("token");

  return tokenData ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
