import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from './Footer';
import CloseIcon from '@mui/icons-material/Close';
import './Home.css'
import Diary from './Images/diary.png'
import plus from './Images/plus.png'
import Navbar from './Navbar'
function Home() {
  const [currentUser, setCurrentUser] = useState({});
  const [create, setCreate] = useState(false);
  const [note, setNote] = useState({});
  const user = useSelector((state)=>{return state.counter.user});
  const getUser = () =>{
    setCurrentUser(user);
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
  useEffect(()=>{
    getUser();
  },[]);

  return (
    currentUser.email?<>
    <Navbar/>
  <div className="main">
    <div className="content">
      <img src={Diary} />
      <h1>Live Your Life A Hassle-Free Way</h1>
      <h2>Start by creating a Note</h2>
      <button className="btn">
        <a href="#main-content">Click to create one</a>
      </button>
    </div>
  </div>
  <div id="main-content">
    <h1><u>Your Notes</u></h1>
    <div className="notes-container">
    {create&&<div className='createDiv'>
      <div className='createNotes'>
      <div className='Notes'>
        <CloseIcon onClick={()=>{setCreate(false)}} style={{position:'absolute' ,right:'0', fontSize:'30px', cursor:'pointer'}}/>
        <p className='notesInfo'>Create A Note</p>
        <form className='form' onChange={handleChange} onSubmit={handleSubmit}>
          <div className='inputLabelsContainer'>
          <label className='formInputLabel' htmlFor='title'>Title</label>
          <input className='formInputs' type="text" name="title" placeholder='Title'></input>
          <label className='formInputLabel' htmlFor='description'>Description</label>
          <textarea className='formInputs' type="text" name="description" placeholder='Description' rows="5" cols="50"></textarea>
          </div>
          <div className='submitButton'>
          <input type="submit" value="Create"></input>
          </div>
        </form>
        </div>
        </div></div>}
      <div className="all-notes">
        <div className="note-div">
          <img src={plus} onClick={()=>{setCreate(true)}}/>
        </div>
      </div>
    </div>
    <div className="create-container">
      <div className="note-container">
        <div className="note-container1">
          <h3>Enter Title</h3>
          <input type="text" id="title" placeholder="Enter Title" />
          <h3>Enter Description</h3>
          <textarea type="text" id="desc" placeholder="Enter Description" rows="4" cols="50"></textarea>
          <div className="btns">
            <button id="create" className="btn1">Create</button>
            <button id="exit" className="btn1">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div className="create-container create-container1">
      <div className="note-container">
        <div className="note-container1">
          <div id="edit-title"></div>
          <div id="edit-desc"></div>
          <div className="btns btns2">
          </div>
        </div>
      </div>
    </div>
    <div className="create-container create-container2">
      <div className="note-container">
        <div className="note-container1">
          <h3>Enter Title</h3>
          <input type="text" id="title-edit" placeholder="Enter Title" />
          <h3>Enter Description</h3>
          <textarea type="text" id="desc-edit" placeholder="Enter Description" rows="4" cols="50"></textarea>
          
          <div className="btns btns3">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="deleted-content">
    <h1><u>Deleted Notes</u></h1>
    <button className="exitBtn">Exit</button>
    <div className="notes-container del">
      <div className="all-notes1">
      </div>
    </div>
    </div>
    <Footer/>
    </>:"NoLogin"
    )
}

export default Home