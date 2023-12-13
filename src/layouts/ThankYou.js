import React from 'react'
import { Link } from 'react-router-dom'

export const ThankYou = () => {
  return (
    <>
  <div className="contentThankYou">
    <div className="wrapper-1">
      <div className="wrapper-2">
        <h1>Thank you !</h1>
        <p>Thanks for joining Steps Of Learning Process program ...</p>
        <p></p>
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
