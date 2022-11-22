import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Footer from './Footer/Footer';
import './Home.css'
import Navbar from './Navbar/Navbar'
import { allNotes } from './Slices';
import { Link } from 'react-router-dom';
function Home() {
  const dispatch = useDispatch();
  const [note, setNote] = useState({});
  const [user, setUser] = useState({});
  const getNotes = async() =>{
    await axios.post('http://localhost:8000/notes', {"userId":user._id}).then(e=>{dispatch(allNotes(e.data.notes));}).catch(e=>console.log(e));
  }
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
  useEffect(()=>{
    getNotes();
    const currentUser = localStorage.getItem("User");
    setUser(JSON.parse(currentUser));
  },[]);

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
    :"NoLogin"
    )
}

export default Home