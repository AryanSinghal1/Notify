import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createdNotes, deletedNotes } from './Slices';

function Note(props) {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({title: props.title,description: props.desc, user: props.userId, id:props.id});
    const handleChange = (e) =>{
        setData({...data, [e.target.name]:e.target.value});
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        // console.log(data);
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
  {edit&&<div>
    <form onChange={handleChange} onSubmit={handleSubmit}>
        <input name='title' type="text" value={data.title}></input>
        <input name='description' type="text" value={data.description}></input>
        <button type="submit" value="Submit"></button>
    </form>
    </div>}
    <div>{props.title}{props.desc}</div>
    <button onClick={()=>{setEdit(true)}}>Edit</button>
    <button onClick={()=>{handleDelete()}}>Delete</button>
    </>
  )
}

export default Note;