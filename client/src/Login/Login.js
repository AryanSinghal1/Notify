import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import './Login.css'
import {user} from '../Slices'
import { useDispatch } from 'react-redux';
function Login() {
  const dispatch = useDispatch();
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();
    const handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setLoginUser({...loginUser, [name]:value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        // await axios.post("http://localhost:8000/login", loginUser).then(e=>console.log(e)).catch(e=>console.log(e));
        await fetch("/login",{
          method  :"POST",
          headers : {
              Accept : "application/json",
              "Content-Type" : "application/json"
          },
          body:JSON.stringify(
            loginUser
          ),
          credentials : 'include'
      }).then(async(e)=>{
        const thisdata = await e.json();
        console.log(thisdata.loginUser);
        dispatch(user(thisdata.loginUser));
        if(thisdata.token){
          navigate('/home');
        }
      })
        setLoginUser({});
    }
  return (
    <div className='mainLogin'>
    <div className='mainLoginFormContainer'>
    <form className='mainLoginForm' onChange={handleChange} onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Enter Email"></input>
        <input type="text" name="password" placeholder="Enter Password"></input>
        <input type="Submit" value="Login"></input>
    </form>
    </div>
    </div>
  )
}

export default Login