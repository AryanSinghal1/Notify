import React from 'react'
import Insta from "./Images/instagram.png"
import facebook from "./Images/facebook.png"
import email from "./Images/email.png"
import linkedin from "./Images/linkedin.png"
import './Home.css'
function Footer() {
  return (
<div id="contact">
    <div className="about">
      <div className="about-name">
        <h1>NOTIFY</h1>
      </div>
      <div className="about-info">
        <div className="aboutUs">
          <h2>About Us</h2>
          <p>Notify is a website to help you create</p>
          <p>Notes anytime anywhere free of cost.</p>
        </div>
        <div className="contactUs">
          <h2>Contact Us</h2>
          <div className="contactOptions">
          <img src={Insta} />
          <img src={facebook} />
          <img src={email} />
          <img src={linkedin} />
          </div>
        </div>
      </div>
    </div>
    <div className="line">
      <p>Notes App &copy; 2021. All Rights Reserved.</p>
    </div>
  </div>
  )
}

export default Footer