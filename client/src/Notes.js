import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch, useSelector } from 'react-redux'
import CreateNote from './createNote/CreateNote'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'
import Note from './Note'
import ViewNote from './ViewNote/viewNote'
import './Notes.css'
import { allNotes, createNotes } from './Slices'
import EditNote from './editNote/EditNote';
function Notes() {
    const dispatch = useDispatch();
    const [view, setView] = useState(false);
    const [noteData, setNoteData] = useState({});
    const create = useSelector((state)=>{return state.counter.create})
    const edit = useSelector((state)=>{return state.counter.edit});
    console.log(edit);
  const user = useSelector((state)=>{return state.counter.user});
  const displayNotes = useSelector((state)=>{return state.counter.notes});
  const getNotes = async() =>{
    await axios.post('http://localhost:8000/notes', {"userId":user._id}).then(e=>{dispatch(allNotes(e.data.notes));}).catch(e=>console.log(e));
  }
  useEffect(()=>{
    getNotes()
  },[])
  const getViewData = (e) =>{
    setNoteData(e);
    setView(true);
  }
  const noteView = (e) =>{
    setView(e);
  }
  return (
    <div className='mainNotesPage'>
        {create&&<CreateNote></CreateNote>}
        {view&&<ViewNote view={noteView} desc={noteData.description} title={noteData.title} id={noteData._id}></ViewNote>}
        {edit&&<EditNote></EditNote>}
        <Navbar/>
        <div className='notesMainContainer'>
        <div className='notesMain'>
            <div className='notesCreate'>
              <div className='empty'></div>
                <div className='searchNotes'>
                    <input type="text" placeholder="Search Notes"></input>
                </div>
                <div className='createNotesPara'>
                  <CreateIcon/>
                    <p className='createPara' onClick={()=>{dispatch(createNotes(true))}}>Create One</p>
                </div>
            </div>
            
            <div className='notesContainerMain'>
                {displayNotes?.map((e)=>{
          return(
          <>
          <Note id={e._id} title={e.title} desc={e.description} userId={user._id} getIt={getViewData}/>
          </>
          )
        })}
            </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Notes