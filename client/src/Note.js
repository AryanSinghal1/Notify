import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import { deletedNotes } from './Slices';
import './Note.css'
function Note(props) {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.counter.user);
    const data = {title: props.title,
        description: props.desc,
        user: props.userId,
        _id:props.id}
        let date = new Date(props.date).toLocaleDateString();
        let time = new Date(props.date).toLocaleTimeString();
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
        const addFavorite = async() =>{
            const noteFav = {
                user: user._id,
                _id: props.id
            }
              await axios.put('/favNote', noteFav).then((e)=>{})
            }
        const remFavorite = async() =>{
            const noteFav = {
                user: user._id,
                _id: props.id
            }
              await axios.put('/remFavNote', noteFav).then((e)=>{})
            }
            
        return (<>
    <div className='notesCardMain' onClick={()=>{props.getIt(data)}}>
    <div className='notesCardMainContainer'>
    {props.fav?<StarIcon style={{position:'absolute', top:0, right:0, cursor:'pointer', color:'#ffff00', stroke:'black', strokeWidth:'1px'}} onClick={()=>{remFavorite()}}></StarIcon>:<StarBorderOutlinedIcon style={{position:'absolute', top:0, right:0, cursor:'pointer'}} onClick={()=>{addFavorite()}}></StarBorderOutlinedIcon>}
    <div className='notesCardTitle'>
    <p>{props.title}</p>
            <p style={{fontSize:"10px"}}>{date}</p>
        </div>
        <div className='notesCardDesc'>
            <div className='tagButton'><p>Hello</p></div>
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