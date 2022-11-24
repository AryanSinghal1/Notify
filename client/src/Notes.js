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
import { createNotes } from './Slices'
import EditNote from './editNote/EditNote';
function Notes(props) {
    const dispatch = useDispatch();
    const [view, setView] = useState(false);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState({});
    const [noteData, setNoteData] = useState({});
    const [currentNotes, setCurrentNotes] = useState([]);
    const [currentTrashNotes, setCurrentTrashNotes] = useState(JSON.parse(localStorage.getItem("trashNotes")));
    const create = useSelector((state)=>{return state.counter.create})
    const edit = useSelector((state)=>{return state.counter.edit});
    const totalSearchData = currentNotes.filter(e=>e.title.toLowerCase().includes(search.toLowerCase()))
    const getNotes = async() =>{
      const user = localStorage.getItem("User");
      const currentUser = JSON.parse(user);
      setUser(currentUser);
      await axios.post('http://localhost:8000/notes', {"userId":currentUser._id}).then(e=>{
      const currentMyNotes = currentTrashNotes?e.data.notes.filter(x => currentTrashNotes?.every(x2 => x2._id !== x._id)):e.data.notes;
      setCurrentNotes(currentMyNotes);
      props.trashNotes(currentTrashNotes);
      localStorage.setItem("trashNotes", JSON.stringify(currentTrashNotes));
    })
  }
  useEffect(()=>{
    getNotes();
  },[]);

  const getDeletedNotes = (e) =>{
    currentTrashNotes?.push(e);
    getNotes();
  }

  const getViewData = (e) =>{
    setNoteData(e);
    setView(true);
  }
  const noteView = (e) =>{
    setView(e);
  }
  return (
    <div className='mainNotesPage'>
        {create&&<CreateNote notes={getNotes}></CreateNote>}
        {view&&<ViewNote view={noteView} desc={noteData.description} title={noteData.title} id={noteData.id} deletedNotes={getDeletedNotes}></ViewNote>}
        {edit&&<EditNote title={noteData.title} desc={noteData.description} id={noteData.id} data={getNotes}></EditNote>}
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
            
                {search==''?currentNotes.length!=0?currentNotes.map((e)=>{
                  return(
                    <>
            <div className='notesContainerMain'>
          <Note id={e._id} title={e.title} desc={e.description} userId={user._id} getIt={getViewData}/>
          </div>
          </>
          )
        }):<div className='noNotes'><p>No Notes, Click the Create New Icon to create one.</p></div>:totalSearchData?.map((e)=>{
          return(
            <>
            <div className='notesContainerMain'>
          <Note id={e._id} title={e.title} desc={e.description} userId={user._id} getIt={getViewData}/>
          </div>
          </>
          )
        })}
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Notes