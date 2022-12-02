import axios from 'axios';
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css';
import { useSelector } from 'react-redux';
function Navbar() {
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const user = useSelector(state=>state.counter.user);
  const logoutUser = async()=>{
    await axios.get('/logout').then(e=>navigate('/logout')).catch(e=>console.log(e));
  }
  const source = user.photo?user.photo:'https://drcinc.org/wp-content/uploads/2017/05/vagmAzMznjBJGQf_sumV.gif'
  return (
    <div className="MainNavbarContainer">
<div className="MainNavbar">
  <div className='navbarLogo'>
    <h3>NOTIFY</h3>
  </div>
    <div className="links">
      <Link to="/notes">My Notes</Link>
      <Link to='/starred'>Starred</Link>
      <a href="#contact">Contact Us</a>
      <Link to='/trash'>Trash</Link>
      <Link onClick={()=>{logoutUser()}}>Logout</Link>
      <Link to='/profile'><div className='profile'>
        <img src={source} style={{width:'30px',height:'30px', borderRadius:'50%'}}></img>
        {/* <AccountCircleIcon style={{fontSize:"30px"}}/> */}
      </div></Link>
    </div>
  </div>
  </div>
  )
}

export default Navbar