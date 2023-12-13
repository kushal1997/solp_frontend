import React, { useEffect, useState } from 'react'
import "../../login/forgo.css"
import axios from 'axios';
import { useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';
export const ChangePassword = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('token');
    const { userId } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    useEffect(() => {
        // Assume you make an API call here and set the response
        // For example, using the fetch function
        // Replace this with your actual API call
        fetch(`${BACKEND_URL}/users/profile/${userId}`, {
            headers
        })
            .then((response) => response.json())
            .then((data) => {
                setEmail(data.user.email);
                setPassword(data.user.password);
                setName(data.user.name);
            })
            .catch((error) => console.error('Error fetching API:', error));
    }, []);

    const postData = {
        name: name,
        email: email,
        password: password
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(postData);

        axios.post(`${BACKEND_URL}/users/update_user/${userId}/${userId}`, postData, { headers: headers })
            .then((res) => {
                if (res.status === 200) {
                    // Assuming the server returns the OTP in the response
                    console.log(res.data.success);
                    if (res.data.success === true) {
                        alert("Data is updated successfully");
                        navigate("/userPage");

                    }
                } else {
                    console.error('Failed to generate OTP');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <div className="forgotPass">
                <form className="genOTP" onSubmit={handleSubmit}>
                    <h4>Update User Details</h4>
                    <div className="project_mail">
                        <label htmlFor="name">
                            Name
                            <input
                                type="name"
                                id="id"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label htmlFor="Email">
                            Email Id
                            <input
                                type="email"
                                id="id"
                                placeholder="Enter your Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
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

                        <br />
                        <div style={{ display: "flex", flexDirection: "row", columnGap: "4rem" }}>
                            <button type="submit" className="OTP1" style={{ alignItems: 'center' }}>
                                Update
                            </button>
                            <button type="button" className="back_button" onClick={()=>navigate("/userPage")}>
                                Go Back
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>

    )
}


