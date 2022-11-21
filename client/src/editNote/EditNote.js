import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { editNotes } from '../Slices';
import './EditNote.css'

function EditNote() {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [note, setNote] = useState({});
  const user = useSelector((state)=>{return state.counter.user});
  const handleChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    note.userId = user._id;
    console.log(note);
    await axios.post('/create', note);
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
          <input className='formInputs' type="text" name="title" placeholder='Title'></input>
          <label className='formInputLabel' htmlFor='description'>Description</label>
          <textarea className='formInputs' type="text" name="description" placeholder='Description' rows="5" cols="50"></textarea>
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