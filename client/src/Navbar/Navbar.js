import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
function Navbar() {
  return (
<div className="MainNavbarContainer">
<div className="MainNavbar">
  <div className='navbarLogo'>
    <h3>NOTIFY</h3>
  </div>
    <div className="links">
      <Link to="/notes">My Notes</Link>
      <a href="#contact">About Us</a>
      <a href="#contact">Contact Us</a>
      <Link to='/trash'>Trash</Link>
      <Link to='/logout'>Logout</Link>
    </div>
  </div>
  </div>
  )
}

export default Navbar