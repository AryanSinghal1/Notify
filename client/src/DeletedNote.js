import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletedNotes, allNotes, showTrash } from './Slices';
import './DeletedNotes.css';
import './Note.css'
    function DeletedNote(props) {
    const dispatch = useDispatch();
    const [data, setData] = useState({title: props.title,description: props.desc, user: props.userId, id:props.id});
    const user = JSON.parse(localStorage.getItem("User"));
    const getNotes = async() =>{
        await axios.post('http://localhost:8000/notes', {"userId":user._id}).then(e=>{dispatch(allNotes(e.data.notes));}).catch(e=>console.log(e));
    }
    const handleRestore = () => {
        const currentTrash = JSON.parse(localStorage.getItem("trashNotes"));
        const currentRestoreTrash = currentTrash.filter(x=>x._id!==props.id);
        localStorage.setItem("trashNotes",JSON.stringify(currentRestoreTrash));
        props.getIt(currentRestoreTrash);
        window.location.reload();
    }
    const handleDelete = async()=>{
        await axios.post('/delete',{user:user._id,id:props.id}).then(e=>getNotes());
        const currentTrash = JSON.parse(localStorage.getItem("trashNotes"));
        const updatedTrash = currentTrash.filter(x=>x._id!==props.id);
        localStorage.setItem("trashNotes",JSON.stringify(updatedTrash));
        props.getIt(updatedTrash);
    }
  return (
    <>
    <div className='notesCardMain' onClick={()=>{props.getIt(data)}}>
    <div className='notesCardMainContainer'>
    <div className='notesCardDeletedTitle'>
    <p>{props.title}</p>
        </div>
        <div className='notesCardDeletedDesc'>
    <p className='notesCardDescPara'>{props.desc}</p>
        </div>
        <div className='actionButtons'>
            <button className='Button' onClick={handleRestore}>Restore</button>
            <button className='Button' onClick={handleDelete}>Delete</button>
        </div>
    <div>
    </div>
    </div>
    </div>
    </>
  )
}

export default DeletedNote