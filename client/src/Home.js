import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer/Footer';
import './Home.css'
import Navbar from './Navbar/Navbar'
import { allNotes } from './Slices';
import { Link } from 'react-router-dom';
function Home() {
  const [note, setNote] = useState({});
  const [noteArr, setNoteArr] = useState([]);
  const user = useSelector(state=>state.counter.user);
  const handleChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    note.userId = user._id;
    console.log(note);
    await axios.post('/create', note);
  }
  const handleEdit = async(e)=>{
    await axios.put('/edit',{})
  }
  console.log(user);
  return (
    user?.email?
    <div className='mainHomePage'>
    <Navbar/>
    <div className="content">
      <div className='contentMainContainer'>
      <div className='contentMain'>
        <div className='contentMainText'>
      <p style={{fontSize:"30px"}}>Live Your Life A Hassle-Free Way</p>
      <p style={{fontSize:"20px"}}>Start by creating a Note</p>
      </div>
      <div className='contentMainButton'>
      <button className="btn">
        <Link to="/notes" style={{color:"white"}}>Click to create one</Link>
      </button>
      </div>
      </div>
      </div>
    </div>
    <Footer/>
    </div>
    :<div className='mainLoginContainer'>
      <div className='notifyMainPage'>
      <p className='NotifyMain'>NOTIFY</p>
      </div>
      <div className='logoutMain'>
        <p>You are not logged In. <Link to='/'>Login Here</Link></p>
      </div>
    </div>
    )
}

export default Home