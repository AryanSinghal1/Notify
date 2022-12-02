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

  return (
    <div className='mainNotesPage'>
        <Navbar/>
        <div className='notesMainContainer'>
        <div className='notesMain'>            
            <div className='notesContainerMain'>
                {starredNotes?.length!=0?starredNotes?.map((e)=>{
          return(
            <>
          <Note id={e._id} title={e.title} desc={e.description} fav={e.favorite} userId={user._id}/>
          </>
          )})
          :<div className='noNotes'>No Notes</div>}
        </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Starred