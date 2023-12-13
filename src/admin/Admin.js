import React from 'react'
import "./admin.css"
import { Fragment } from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import menu from "../assets/squared-menu.png"

export const Admin = () => {
  /**
   * Checks if a user is authenticated and has the necessary role to access a specific route.
   * If the user is not authenticated or does not have the required role, it redirects them to the login page.
   * @returns None
   */
  const { role, success } = React.useContext(AuthContext);
  const token = localStorage.getItem("token")
  if (!token && role !== "admin" && success !== true) {
    <Navigate to="/login" />
  }
  /**
   * Toggles the state of the dropdown menu.
   * @returns None
   */
  const [toggle, setToggle] = useState(false);
  const dropDownMenu = () => {
    setToggle(!toggle)
  }
 

  return (
    <Fragment>
      <div className="admin">
        <div className="adminHeader">
          <p onClick={dropDownMenu}>
            <img width="30"
              height="30"
              style={{cursor:"pointer"}}
              src={menu} alt="squared-menu" />
          </p>
          <h1>Welcome to admin page</h1>
        </div>
        <div className='sidebar'>

          {/* * Renders a sidebar menu based on the value of the toggle variable.
           * @param {boolean} toggle - Determines whether the sidebar menu should be displayed or not.
           * @param {function} handleOptionClick - Callback function to handle the click event on each menu option.
           * @returns The rendered sidebar menu component. */}

          {
            toggle ?
              <div className="sidebar-menu">
                {/* <p onClick={() => handleOptionClick('Logout')}>Logout</p> */}
                <Link to="/admin/add_user" onClick={()=>setToggle(!toggle)}>
                  <p>Add User</p>
                </Link>
                <Link to="/admin/all_users" onClick={()=>setToggle(!toggle)}>
                  <p>All Users</p>
                </Link>
                <Link to="/admin/upload" onClick={()=>setToggle(!toggle)}>
                  <p>Add Course Videos</p>
                </Link>
                <Link to="/admin/all_courses" onClick={()=>setToggle(!toggle)}>
                  <p>All Courses</p>
                </Link>
                <Link to="/admin/deleted_courses" onClick={()=>setToggle(!toggle)}>
                  <p>Deleted Courses</p>
                </Link>

              </div>
              : ''
          }
        </div>


      </div>
    </Fragment>
  )
}
