import React from 'react'
import { useSelector } from 'react-redux'
import DeletedNote from '../DeletedNote'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

function Trash() {
    const trashNotes = useSelector((state)=>{return state.counter.deletedNotes})
    const user = useSelector((state)=>{return state.counter.user});
  return (
    <div className='mainNotesPage'>
        <Navbar/>
        <div className='notesMainContainer'>
        <div className='notesMain'>
            <div className='notesCreate'>
              <div className='empty'></div>
                <div className='searchNotes'>
                    <input type="text" placeholder="Search Notes"></input>
                </div>
                <div className='empty'>
                </div>
            </div>
            
            <div className='notesContainerMain'>
                {trashNotes?.map((e)=>{
          return(
          <>
          <DeletedNote id={e._id} title={e.title} desc={e.description} userId={user._id}/>
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