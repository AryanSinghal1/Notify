import React from 'react'
import Calendar from 'rc-year-calendar';
import './Scheduling.css'
function Scheduling() {
  return (
    <Calendar displayHeader={false} year={2022} minDate={new Date()} onDayClick={(date, events)=>{console.log(date)}}></Calendar>
  )
}

export default Scheduling