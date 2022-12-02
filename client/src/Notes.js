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
import { allNotes, createNotes, currentNote, deletedNotes, viewNotes } from './Slices'
import EditNote from './editNote/EditNote';
function Notes() {
    const dispatch = useDispatch();
    const view = useSelector(state=>state.counter.view);
    const [search, setSearch] = useState('');
    const user = useSelector(state=>state.counter.user);
    const [currentNotes, setCurrentNotes] = useState([]);
    const currentTrashNotes = useSelector(state=>state.counter.deletedNotes);
    const create = useSelector((state)=>{return state.counter.create})
    const edit = useSelector((state)=>{return state.counter.edit});
    const totalSearchData = currentNotes.filter(e=>e.title.toLowerCase().includes(search.toLowerCase()))
    const getNotes = async() =>{
      await axios.post('http://localhost:8000/notes', {"userId":user._id}).then(e=>{
      const currentMyNotes = currentTrashNotes?e.data.notes.filter(x => currentTrashNotes?.every(x2 => x2._id !== x._id)):e.data.notes;
      setCurrentNotes(currentMyNotes);
      dispatch(allNotes(currentMyNotes));
    })
  }
  getNotes();

  const getDeletedNotes = (e) =>{
    dispatch(deletedNotes(e));
    getNotes();
  }

  const getViewData = (e) =>{
    dispatch(currentNote(e));
    dispatch(viewNotes(true));
  }
  return (
    <div className='mainNotesPage'>
        {create&&<CreateNote notes={getNotes}></CreateNote>}
        {view&&<ViewNote deletedNotes={getDeletedNotes}></ViewNote>}
        {edit&&<EditNote data={getNotes}></EditNote>}
        <Navbar/>
        <div className='notesMainContainer'>
        <div className='notesMain'>
            <div className='notesCreate'>
              <div className='empty'></div>
                <div className='searchNotes'>
                    <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search Notes"></input>
                </div>
                <div className='createNotesPara'>
                  <CreateIcon/>
                    <p className='createPara' onClick={()=>{dispatch(createNotes(true))}}>Create New</p>
                </div>
            </div>
            
            <div className='notesContainerMain'>
                {search==''?currentNotes.length!=0?currentNotes.map((e)=>{
                  return(
                    <>
          <Note id={e._id} title={e.title} desc={e.description} date={e.date} fav={e.favorite} userId={user._id} getIt={getViewData}/>
          </>
          )
        }
        // </div>
        ):<div className='noNotes'><p>No Notes, Click the Create New Icon to create one.</p></div>:totalSearchData?.map((e)=>{
          return(
            <>
            {/* <div className='notesContainerMain'> */}
          <Note id={e._id} title={e.title} desc={e.description} userId={user._id} getIt={getViewData}/>
          {/* </div> */}
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