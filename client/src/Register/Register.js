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
    <div className='mainLoginContainer'>
      <div className='notifyMainPage'>
    <p className='NotifyMain'>NOTIFY</p>
      </div>
  <div className='mainLoginFormContainer'>
  <form className='mainRegisterForm' onChange={handleChange} onSubmit={handleSubmit}>
  <div className='signInText'>
    <p>Register</p>
      </div>
      <div className='loginformInputContainer'>
    <div className='loginformInput'>
    <p className='registerinputLabels'>Enter Name</p>
      <input className='registerInputFields' type="text" name="Name" placeholder="Enter Name"></input>
      </div>
      <div className='loginformInput'>
      <p className='registerinputLabels'>Enter Email</p>
      <input type="text" className='registerInputFields' name="Email" placeholder="Enter Email"></input>
      </div>
      <div className='loginformInput'>
      <p className='registerinputLabels'>Enter Password</p>
      <input type="text" className='registerInputFields' name="Password" placeholder="Enter Password"></input>
      </div>
      <div className='loginformInput'>
      <p className='registerinputLabels'>Re-Enter Password</p>
      <input type="text" className='registerInputFields' name='CPassword' placeholder="Confirm Password"></input>
        </div>
      <div className='submitButton'>
      <input type="Submit" value="Register"></input>
      </div>
      </div>
      <div className='loginUser'>
        <p>Already Registered? <a href='/'>Login Here</a></p>
      </div>
  </form>
  </div>
  </div>
  )
}

export default Register