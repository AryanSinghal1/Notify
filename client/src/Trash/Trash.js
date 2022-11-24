import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DeletedNote from '../DeletedNote'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

function Trash() {
    const user = JSON.parse(localStorage.getItem("User"));
    const currentTrash = JSON.parse(localStorage.getItem("trashNotes"));
    const [trashNotes, setTrashNotes] = useState(currentTrash);
    const [search, setSearch] = useState('');
    const totalSearchData = search!==''?trashNotes.filter(e=>e.title.toLowerCase().includes(search.toLowerCase())):'';
    const getFunction = (e) =>{
      setTrashNotes(Object.values(e));
    }
const getAll = (e) =>{
  console.log(e);
}
  return (
    <div className='mainNotesPage'>
        <Navbar/>
        <div className='notesMainContainer'>
        <div className='notesMain'>
            <div className='notesCreate'>
              <div className='empty'></div>
                <div className='searchNotes'>
                    <input type="text" placeholder="Search Notes" value={search} onChange={(e)=>{setSearch(e.target.value)}}></input>
                </div>
                <div className='empty'>
                </div>
            </div>
            
                {search==''?trashNotes?.length!=0?trashNotes?.map((e)=>{
          return(
            <>
            <div className='notesContainerMain'>
          <DeletedNote id={e._id} title={e.title} desc={e.description} userId={user._id} getIt={getFunction} getAll={getAll}/>
          </div>
          </>
          )
        }):<div className='noNotes'>No Trash</div>:totalSearchData?.map((e)=>{
          return(
            <>
            <div className='notesContainerMain'>
          <DeletedNote id={e._id} title={e.title} desc={e.description} userId={user._id} getIt={getFunction} getAll={getAll}/>
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

export default Trash