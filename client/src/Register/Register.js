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
    <div className='mainRegisterContainer'>
    <div className='mainRegisterFormContainer'>
    <form onChange={handleChange} onSubmit={handleSubmit} className='mainRegisterForm'>
        <input type="text" name="Name" placeholder="Enter Name"></input>
        <input type="text" name="Email" placeholder="Enter Email"></input>
        <input type="text" name="Password" placeholder="Enter Password"></input>
        <input type="text" name='CPassword' placeholder="Confirm Password"></input>
        <input type="submit" value="Register"></input>
    </form>
    </div>
    </div>
  )
}

export default Register