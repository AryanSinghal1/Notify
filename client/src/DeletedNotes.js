import React from 'react'

function DeletedNotes() {
  return (
    <div id="deleted-content">
    <h1><u>Deleted Notes</u></h1>
    <button className="exitBtn">Exit</button>
    <div className="notes-container del">
      <div className="all-notes1">
      </div>
    </div>
    </div>
  )
}

export default DeletedNotes