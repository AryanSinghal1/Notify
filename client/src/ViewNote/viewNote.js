import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { editNotes, viewNotes } from '../Slices';
import './viewNote.css'
function ViewNote({deletedNotes}) {
    const dispatch = useDispatch(); 
    const currNote = useSelector(state=>state.counter.currentNote);
    const handleDelete = async()=>{
      deletedNotes(currNote);
      dispatch(viewNotes(false));
  }
  return (
    <div className='viewDiv'>
      <div className='createNotes'>
      <div className='Notes'>
        <CloseIcon onClick={(e)=>{
      dispatch(viewNotes(false));}} style={{position:'absolute' ,right:'10px',top:'10px', fontSize:'30px', cursor:'pointer'}}/>
        <div className='viewContainer'>
        <div className='view'>
          <div className='notesInfoContainer'>
          <div className='notesTitle'>
          <p>{currNote.title}</p>
          </div>
          <div className='notesDesc'>
          <p>{currNote.description}</p>
          </div>
          </div>
          <div className='editNotes'>
          <button className='editNotesButton' onClick={(e)=>{handleDelete()}}>Delete</button>
          <button className='editNotesButton' onClick={(e)=>{dispatch(editNotes(true));
      dispatch(viewNotes(false));}}>Edit</button>
          </div>
        </div>
        </div>
        </div>
        </div></div>
  )
}

export default ViewNote