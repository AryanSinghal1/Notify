import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DeletedNote from '../DeletedNote'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Note from '../Note'

function Starred() {
    const user = useSelector(state=>state.counter.user);
    const allNotes = useSelector(state=>state.counter.notes);
    const starredNotes = allNotes.filter(x=>x.favorite);
    const [search, setSearch] = useState('');
    const totalSearchData = search!==''?starredNotes.filter(e=>e.title.toLowerCase().includes(search.toLowerCase())):'';
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
                {search==''?starredNotes?.length!=0?starredNotes?.map((e)=>{
          return(
            <>
          <Note _id={e._id} title={e.title} desc={e.description} fav={e.favorite} userId={user._id}/>
          </>
          )
        }):<div className='noNotes'>No Notes</div>:totalSearchData?.map((e)=>{
          return(
            <>
          <Note _id={e._id} title={e.title} desc={e.description} fav={e.favorite} userId={user._id}/>
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

export default Starred