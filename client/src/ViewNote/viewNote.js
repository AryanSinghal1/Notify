import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { deletedNotes, editNotes } from '../Slices';
import './viewNote.css'
function ViewNote({view, title, desc, id}) {
    const dispatch = useDispatch(); 
    const handleDelete = async()=>{
      const note = {
          description: desc,
          title: title,
          _id: id
      }
      dispatch(deletedNotes(note));
  }
  return (
    <div className='viewDiv'>
      <div className='createNotes'>
      <div className='Notes'>
        <CloseIcon onClick={(e)=>{view(false);}} style={{position:'absolute' ,right:'10px',top:'10px', fontSize:'30px', cursor:'pointer'}}/>
        <div className='viewContainer'>
        <div className='view'>
          <div className='notesInfoContainer'>
          <div className='notesTitle'>
          <p>{title}</p>
          </div>
          <div className='notesDesc'>
          <p>{desc}</p>
          </div>
          </div>
          <div className='editNotes'>
          <button className='editNotesButton' onClick={(e)=>{handleDelete()}}>Delete</button>
          <button className='editNotesButton' onClick={(e)=>{dispatch(editNotes(true));view(false)}}>Edit</button>
          </div>
        </div>
        </div>
        </div>
        </div></div>
  )
}

export default ViewNote