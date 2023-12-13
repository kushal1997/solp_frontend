import React from 'react'
import { Link } from 'react-router-dom'
import notify from '../images/notify.jpg'

export const UnderDevelopment = () => {
    return (
        <div className='under_development'>
            <img className='notify' src={notify} alt='notify' />
            {/* <h4>Please Go Back to
                <span>
                    <Link to="/">Home Page</Link>
                </span>
            </h4> */}
        </div>
    )
}
