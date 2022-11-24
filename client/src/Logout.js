import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Logout.css'
function Logout() {
    useEffect(()=>{
        localStorage.clear();
    })
  return (
    <div className='mainLoginContainer'>
        <div className='notifyMainPage'>
      <p className='NotifyMain'>NOTIFY</p>
      </div>
      <div className='logoutMain'>
        <p>You are Successfully Logged Out.</p>
        <Link to='/'>Login Here</Link>
      </div>
    </div>
  )
}

export default Logout