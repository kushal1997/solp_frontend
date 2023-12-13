import React, { useContext, useEffect } from 'react'
import "./admin.css"
import { useState } from 'react';
import AuthContext from '../context/AuthContext';
// import { BACKEND_URL } from '../config/constraints';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UpdateUser } from './forms/UpdateUser';
import retrive from "../assets/retrive.svg"
import dustbin from "../assets/dustbin.png"
import { DeleteUser } from './forms/DeleteUser';
import search from "../assets/search-v1.png"
import edit from "../assets/edit.png"
// const API_URL = "http://localhost:8080/users/get_users/all";
// const API_URL = `${process.env.SERVER_URL}/users/get_users/all`;


export const AllUsers = () => {
    const navigate=useNavigate();
    /**
     * Handles the edit action for an item.
     * @param {object} item - The item to be edited.
     * @returns None
     */
    const [showUpdateForm, setUpdateForm] = useState(false);
    const [showDeleteForm, setDeleteForm] = useState(false);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [isId, setId] = useState(0);
    const handelEdit = (item) => {
        setId(item);
        setUpdateForm(true)
    }
    console.log("isID", isId);
    /**
     * Checks if the user is authenticated and has the role of "admin" before rendering the component.
     * If the user is not authenticated or does not have the role of "admin", it redirects to the login page.
     * @returns {JSX.Element | null} - The component to render or null if the user is not authenticated or does not have the role of "admin".
     */
    const { role, success,setIsLoggedIn } = React.useContext(AuthContext);
    
    const token = localStorage.getItem('token');
    // console.log(token)
    if (!token && role !== "admin" && success !== true) {
        <Navigate to="/login" />
    }


    /**
     * Manages the state of users and openIndex.
     * @param {Array} users - The array of users.
     * @param {Function} setUsers - The function to update the users state.
     * @param {number} openIndex - The index of the currently open content.
     * @param {Function} setOpenIndex - The function to update the openIndex state.
     * @returns None
     */
    const [users, setUsers] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleContent = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    /**
     * Filters the list of users based on the search text.
     * @param {string} searchText - The text to search for in the user's name or email.
     * @returns {Array} - An array of users that match the search text.
     */
    const [searchText, setSearchText] = useState('');
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())


    );

    /**
     * Creates a new Headers object with the Authorization header set to the provided token.
     * @param {string} token - The authorization token to include in the header.
     * @returns A new Headers object with the Authorization header set.
     */
    const headers = new Headers({
        Authorization: `Bearer ${token}`
    });
    // console.log(headers)
    /**
     * Fetches the list of all users from the backend API and sets the state with the retrieved data.
     * @returns None
     */
    const [resfresh,setRefresh]=useState(0);
    useEffect(() => {
        fetch(`${BACKEND_URL}/users/get_users/all`, {
            headers
        })
            .then((response) => response.json())
            .then((data) => {
                const filteredUsers = [...data.users].filter(
                  (user) => !user.isDELETED 
                );
                console.log(filteredUsers);
                setUsers(filteredUsers);
              }).catch(err => {
                alert("Session Timeout", err);
                setIsLoggedIn(false);
                navigate("/login")
              });
    }, [resfresh])



    /**
     * Handles the change event of a dropdown menu by fetching data from the backend API
     * based on the selected option and updating the state with the retrieved data.
     * @param {Event} event - The change event object.
     * @returns None
     */
    const[option,setOption]=useState("all");
    const handleDropdownChange = (event) => {
        const selectedOption = event.target.value;

        console.log(option);
        setOption(selectedOption);
        if(selectedOption === "delete"){
            fetch(`${BACKEND_URL}/users/get_deleted_user`, {
                headers
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.users);
                    setUsers(data.users);
                    setOption(selectedOption);
                }).catch(err => {
                    alert("Session Timeout", err);
                    setIsLoggedIn(false);
                    navigate("/login")
                  });

        }else {
            fetch(`${BACKEND_URL}/users/get_users/${selectedOption}`, {
                headers
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.users);
                    setUsers(data.users);
                    setRefresh(resfresh+1)
                }).catch(err => {
                    alert("Session Timeout", err);
                    setIsLoggedIn(false);
                    navigate("/login")
                  });
        }
    }
    const handeldelete = (value) => {
        setDeleteForm(true)
        setId(value); 
    }
    const handelretrive=(value)=>{
        fetch(`${BACKEND_URL}/users/retrive_user/${value}`, {
            method: 'GET',
            headers
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              alert("User is Retrived");
              setRefresh(resfresh+1);
              return response.json(); // You may adjust this based on your response format
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }




    return (

        <div className='adminContent'>
            <div className='div1'>
                <div className='div2'>
                    <div className="all">
                        <h1>Users</h1>
                        <div className='allInner'>
                            <div className="search-box">
                                <button class="btn-search"><img width="35" height="35" src={search} alt="search--v1" /></button>

                                <input type="text" className="input-search" placeholder="Filter User ..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>

                            <div className="box">

                                <select  onChange={handleDropdownChange}>
                                    <option value='all'>All Users</option>
                                    <option value='html'>HTML users</option>
                                    <option value='css'>CSS Users</option>
                                    <option value='react'>React Users</option>
                                    <option value='js'>Javascript Users</option>
                                    <option value='node'>Node Users</option>
                                    <option value='delete'>Deleted Users</option>
                                </select>
                            </div>
                        </div>


                        <div className="tableContent">
                            <table className="table" >
                                <thead style={{ "borderBottomWidth": "1px" }}>
                                    <th>Candidate Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Edit</th>
                                    <th>Delete / Retrive</th>

                                </thead>
                                <tbody>

                                    {/* * Renders a table row for each item in the filteredUsers array.
                         * @param {Array} filteredUsers - An array of user objects to render in the table.
                         * @returns The rendered table rows. */}

                                    {filteredUsers.map((item) => (
                                        <tr>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>{item.email}</td>
                                            <td>{item.password}</td>


                                            <td>
                                                <a onClick={() => handelEdit(item._id)} className='float-right'>
                                                    <img width="25" height="25" src={edit} alt="edit" style={{ cursor: "pointer" }} />
                                                </a>
                                            </td>
                                            {
                                                item.isDELETED ?
                                                    (
                                                        <td>
                                                            <a onClick={() => handelretrive(item._id)} className='float-right'>
                                                                <img width="25" height="25" src={retrive} alt="checkmark" style={{ cursor: "pointer" }} />
                                                            </a>
                                                        </td>
                                                    )
                                                    :
                                                    (
                                                        <td>
                                                            <a onClick={() => handeldelete(item._id)} className='float-right'>
                                                                <img width="25" height="25" src={dustbin} alt="external-Dustbin-web-design-and-development-solid-design-circle" style={{ cursor: "pointer" }} />
                                                            </a>
                                                        </td>
                                                    )
                                            }


                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        {
                            showUpdateForm ? <UpdateUser setUpdateForm={setUpdateForm} isId={isId} /> : ""
                        }
                        {
                            showDeleteForm ? <DeleteUser setDeleteForm={setDeleteForm} isId={isId} resfresh={resfresh} setRefresh={setRefresh}/> : ""
                        }

                    </div>
                </div>
            </div>
        </div>

    )
}



