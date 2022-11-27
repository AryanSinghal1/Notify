import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { editNotes } from '../Slices';
import './EditNote.css'

function EditNote({title, desc, id, data}) {
  const dispatch = useDispatch();
  const note = useSelector(state=>state.counter.currentNote);
  const [updateNote, setUpdateNote] = useState({title: note.title, description: note.description});
  const user = useSelector(state=>state.counter.user);
  const handleChange = (e) =>{
    setUpdateNote({...updateNote, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    updateNote.user = user._id;
    updateNote.id = note.id;
    await axios.put('/update', updateNote).then((e)=>{dispatch(editNotes(false));data()});
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
          <input className='formInputs' value={updateNote.title} type="text" name="title" placeholder='Title'></input>
          <label className='formInputLabel' htmlFor='description'>Description</label>
          <textarea className='formInputs' value={updateNote.description} type="text" name="description" placeholder='Description' rows="5" cols="50"></textarea>
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