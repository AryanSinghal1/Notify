import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createNotes } from '../Slices';
import './CreateNote.css';
function CreateNote(props) {
    const dispatch = useDispatch();
    const [note, setNote] = useState({});
  const user = useSelector((state)=>{return state.counter.user});
    const handleChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
      }
      const handleSubmit = async(e) =>{
        e.preventDefault();
        note.userId = user._id;
        console.log(note);
        await axios.post('/create', note).then((e)=>{dispatch(createNotes(false));
          props.notes();}).catch(e=>console.log(2));
        
      }
  return (
    <div className='createDiv'>
      <div className='createNotesContainer'>
        <CloseIcon onClick={()=>{dispatch(createNotes(false))}} style={{position:'absolute' ,right:'20px', top:'20px', fontSize:'30px', cursor:'pointer', zIndex:4}}/>
      <div className='createNotesDiv'>
        <div className='notesCreateInfoContainer'><p className='notesCreateInfo'>Create A Note</p></div>
        <form className='createForm' onChange={handleChange} onSubmit={handleSubmit}>
          <div className='inputCreateLabelsContainer'>
          <label className='formInputLabel' htmlFor='title'>Title</label>
          <input className='formInput1' type="text" name="title" placeholder='Enter Title'></input>
          <label className='formInputLabel' htmlFor='description'>Description</label>
          <textarea className='formInputs' type="text" name="description" placeholder='Enter Description' rows="5"></textarea>
          </div>
          <div className='createButton'>
          <input type="submit" className='createNotesButton' value="Create"></input>
          </div>
        </form>
        </div>
        </div></div>
  )
}

export default CreateNote