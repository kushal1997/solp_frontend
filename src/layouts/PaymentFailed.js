
import { Link } from 'react-router-dom'
import "./navbar.css"

import React from 'react'

export const PaymentFailed = () => {
    return (
        <>
            <div className="contentPayFailed">
                <div className="wrapper-1">
                    <div className="wrapper-2">
                        <h1>Payment Transaction Failed !</h1>
                        <p>We're sorry, but your transaction could not be completed at this time.</p>
                        <br />
                        <p>If you have entered correct details then contact us.</p>
                        <br /><br />
                        <Link to="/" className="go-home">go home</Link>
                    </div>

                </div>
            </div>
            <link
                href="https://fonts.googleapis.com/css?family=Kaushan+Script|Source+Sans+Pro"
                rel="stylesheet"
            />
        </>

    )
}
