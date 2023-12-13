import React from 'react'
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const User = () => {
  const { role ,token,success} = React.useContext(AuthContext);

  if (token && role !== "user" && success===true ) {
    <Navigate to="/login"/>
  }
  return (
    <div>User</div>
  )
}
