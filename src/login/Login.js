import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from "../context/AuthContext";
import image from "../assets/q.png"

export const Login = () => {
    const [inactiveTime, setInactiveTime] = useState(0);
    const rememberedCredentials =localStorage.getItem("rememberedCredentials");
    console.log("rememberedCredentials",rememberedCredentials)
    useEffect(() => {
        const populateCredentialsFromLocalStorage = () => {
          if (rememberedCredentials) {
            const parsedCredentials = JSON.parse(rememberedCredentials);
            setRememberMe(!rememberMe)
            setCredentials({
              ...credentials,
              username: parsedCredentials.username,
              password: parsedCredentials.password,
            });
            console.log("get Credetialtials",credentials)
          }
        };
      
        populateCredentialsFromLocalStorage();
      }, []);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const { setUser } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [rememberMe, setRememberMe] = useState(false);
    
    const handleSubmit = (event) => {
        setInactiveTime(0);
        event.preventDefault();
        if (rememberMe) {
            // Save user details in local storage (for demonstration purposes)
            localStorage.setItem('rememberedCredentials', JSON.stringify(credentials));
          } else {
            // If "Remember Me" is not checked, clear any previously saved credentials
            localStorage.removeItem('rememberedCredentials');
          }
        if (token) {
            localStorage.removeItem("token");
        }
        setUser({
            email: credentials.username,
            password: credentials.password,
        });
    };
    return (
        <div className={styles.container}>
            {/* <h1 className={styles.heading}>Login Form</h1> */}
            <div className={styles.form_container}>
                <div className={styles.left}>
                    <img
                        className={styles.img}
                        src={image}
                        alt="login-img"
                    />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.from_heading}>Welcome Back!</h2>
                    <h6>Login to continue</h6>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className={styles.input}
                            name="username"
                            value={credentials.username}
                            onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
                            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your email"

                        />

                        <input
                            type="password"
                            className={styles.input}
                            name="password"
                            value={credentials.password}
                            onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your password"

                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            Remember Me
                        </label>
                        <button type="submit" className={styles.btn} >
                            Log In
                        </button>

                        <button type="button" className={styles.forbtn} onClick={() => navigate("/forgot")}>
                            Forgot Password
                        </button>

                        {/* <p className={styles.text}>
                        New Here ? <Link to="/signup">Sign Up</Link>
                    </p> */}
                    </form>
                    {/* <ActivityTracker setInactiveTime={setInactiveTime} inactiveTime={inactiveTime}/> */}
                </div>
            </div>
        </div>


        // <div className={styles.container}>
        //     <h1 className={styles.heading}>Log in Form</h1>
        //     <div className={styles.form_container}>
        //         <div className={styles.left}>
        //             <img
        //                 className={styles.img}
        //                 src="./images/login.jpg"
        //                 alt="login"
        //             />
        //         </div>
        //         <div className={styles.right}>
        //             <h2 className={styles.from_heading}>Members Log in</h2>
        //             <form onSubmit={handleSubmit}>
        //                 <input
        //                     type="text"
        //                     name="username"
        //                     placeholder="Username"
        //                     value={credentials.username}
        //                     onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
        //                 />
        //                 <input
        //                     type="password"
        //                     name="password"


        //                     placeholder="Password"


        //                     value={credentials.password}
        //                     onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
        //                 />

        //                 <button

        //                     type="submit">Login</button>
        //             </form>

        //             {/* <p className={styles.text}>or</p>
        // 			<button className={styles.google_btn} onClick={googleAuth}>
        // 				<img src="./images/google.png" alt="google icon" />
        // 				<span>Sign in with Google</span>
        // 			</button> */}
        //             {/* <p className={styles.text}>
        //                 New Here ? <Link to="/signup">Sign Up</Link>
        //             </p> */}
        //         </div>
        //     </div>
        // </div>
    );
};
