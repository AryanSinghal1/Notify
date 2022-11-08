import React from 'react'
import './Home.css'
function Navbar() {
  return (
<div className="Nav">
    <h3>NOTIFY</h3>
    <div className="links">
      <a href="#main-content">My Notes</a>
      <a href="#contact">About Us</a>
      <a href="#contact">Contact Us</a>
      <a id="trash">Trash</a>
    </div>
  </div>
  )
}

export default Navbar