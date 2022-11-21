import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer/Footer';
import CreateNote from './createNote/CreateNote';
import './Home.css'
import Diary from './Images/background.jpg'
import plus from './Images/plus.png'
import Navbar from './Navbar/Navbar'
import Note from './Note';
import { allNotes, createNotes } from './Slices';
import EditNote from './editNote/EditNote';
import { Link } from 'react-router-dom';
function Home() {
  const dispatch = useDispatch();
  const create = useSelector((state)=>{return state.counter.create})
  const edit = useSelector((state)=>{return state.counter.edit})
  const [note, setNote] = useState({});
  // const user = useSelector((state)=>{return state.counter.user});
  const [user, setUser] = useState({});
  const displayNotes = useSelector((state)=>{return state.counter.notes});
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
      {/* <img src={Diary} /> */}
      {/* <h1>Live Your Life A Hassle-Free Way</h1>
      <h2>Start by creating a Note</h2>
      <button className="btn">
        <a href="#main-content" style={{color:"white"}}>Click to create one</a>
      </button> */}
    </div>
    <Footer/>
    </div>
    :"NoLogin"
    )
}

export default Home