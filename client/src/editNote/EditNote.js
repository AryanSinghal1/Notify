import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { editNotes } from '../Slices';
import './EditNote.css'

function EditNote({title, desc, id, data}) {
  const dispatch = useDispatch();
  const [note, setNote] = useState({title: title, description: desc});
  const user = useSelector((state)=>{return state.counter.user});
  const handleChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    note.user = user._id;
    note.id = id;
    console.log(note);
    await axios.put('/update', note).then((e)=>{dispatch(editNotes(false));data()});
  }
  return (
    <div className='editDivContainer'>
      <div className='editNotesDiv'>
      <div className='editNotesContainer'>
        <CloseIcon onClick={()=>{dispatch(editNotes(false))}} style={{position:'absolute' ,right:'0', fontSize:'30px', cursor:'pointer'}}/>
        <div className='notesInfoDiv'>
        <p className='notesInfo'>Edit A Note</p>
        </div>
        <form className='editForm' onChange={handleChange} onSubmit={handleSubmit}>
          <div className='editInputLabelsContainer'>
          <label className='formInputLabel' htmlFor='title'>Title</label>
          <input className='formInputs' value={note.title} type="text" name="title" placeholder='Title'></input>
          <label className='formInputLabel' htmlFor='description'>Description</label>
          <textarea className='formInputs' value={note.description} type="text" name="description" placeholder='Description' rows="5" cols="50"></textarea>
          </div>
          <div className='submitButton'>
          <input type="submit" value="Edit"></input>
          </div>
        </form>
        </div>
        </div></div>
  )
}

export default EditNote