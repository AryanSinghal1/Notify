import React, { useState } from 'react'
import './Register.css'
import axios from 'axios';
function Register() {
    const [user, setUser] = useState({});
    const handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUser({...user, [name]: value})
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(user.CPassword==user.Password){
            console.log(user);
            await axios.post("http://localhost:8000/register", user).then(()=>{console.log("success")}).catch(e=>console.log(e));
            setUser({});
        }else{
            alert("Wrong Password")
        }
    }
  return (
    <div className='mainLogin'>
    <p className='NotifyMain'>NOTIFY</p>
  <div className='mainRegisterFormContainer'>
  <form className='mainLoginForm' onChange={handleChange} onSubmit={handleSubmit}>
    <p style={{fontSize:"30px", fontWeight:600}}>Register</p>
    <div className='registerFormInput'>
    <p className='inputLabels'>Enter Name</p>
      <input className='inputFields' type="text" name="Name" placeholder="Enter Name"></input>
      </div>
      <div className='registerFormInput'>
      <p className='inputLabels'>Enter Email</p>
      <input type="text" className='inputFields' name="Email" placeholder="Enter Email"></input>
      </div>
      <div className='registerFormInput'>
      <p className='inputLabels'>Enter Password</p>
      <input type="text" className='inputFields' name="Password" placeholder="Enter Password"></input>
      </div>
      <div className='registerFormInput'>
      <p className='inputLabels'>Re-Enter Password</p>
      <input type="text" className='inputFields' name='CPassword' placeholder="Confirm Password"></input>
        </div>
      <div className='submitButton'>
      <input type="Submit" value="Register"></input>
      </div>
  </form>
  </div>
  </div>
  )
}

export default Register