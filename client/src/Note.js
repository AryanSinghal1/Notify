import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deletedNotes } from './Slices';
import './Note.css'
function Note(props) {
    const dispatch = useDispatch();
    const data = {title: props.title,
        description: props.desc,
        user: props.userId,
        id:props.id}
    const handleSubmit = async(e) =>{
        e.preventDefault();
        await axios.put('/update', data);
    }
    const handleDelete = async()=>{
        const note = {
            description: props.desc,
            title: props.title,
            _id: props.id
        }
        dispatch(deletedNotes(note));
    }
  return (<>
    <div className='notesCardMain' onClick={()=>{props.getIt(data)}}>
    <div className='notesCardMainContainer'>
    <div className='notesCardTitle'>
    <p>{props.title}</p>
        </div>
        <div className='notesCardDesc'>
    <p className='notesCardDescPara'>{props.desc}</p>
        </div>
    <div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Note;