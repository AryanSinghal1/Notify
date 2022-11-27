import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css';
function Navbar() {
  const navigate = useNavigate();
  const logoutUser = async()=>{
    await axios.get('/logout').then(e=>navigate('/logout')).catch(e=>console.log(e));
  }
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
      <Link onClick={()=>{logoutUser()}}>Logout</Link>
    </div>
  </div>
  </div>
  )
}

export default Navbar