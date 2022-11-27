import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DeletedNote from '../DeletedNote'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

function Trash() {
    const user = useSelector(state=>state.counter.user);
    const trashNotes = useSelector(state=>state.counter.deletedNotes);
    const [search, setSearch] = useState('');
    const totalSearchData = search!==''?trashNotes.filter(e=>e.title.toLowerCase().includes(search.toLowerCase())):'';
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
            
            <div className='notesContainerMain'>
                {search==''?trashNotes?.length!=0?trashNotes?.map((e)=>{
          return(
            <>
          <DeletedNote _id={e._id} title={e.title} desc={e.description} userId={user._id}/>
          </>
          )
        }):<div className='noNotes'>No Trash</div>:totalSearchData?.map((e)=>{
          return(
            <>
          <DeletedNote _id={e._id} title={e.title} desc={e.description} userId={user._id}/>
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

export default Trash