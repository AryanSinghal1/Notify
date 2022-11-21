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
        localStorage.setItem("User",JSON.stringify(thisdata.loginUser));
        if(thisdata.token){
          navigate('/home');
        }
      })
        setLoginUser({});
    }
  return (
    <div className='mainLoginContainer'>
      <div className='notifyMainPage'>
      <p className='NotifyMain'>NOTIFY</p>
      </div>
    <div className='mainLoginFormContainer'>
    <form className='mainLoginForm' onChange={handleChange} onSubmit={handleSubmit}>
      <div className='signInText'>
      <p>Sign In</p>
      </div>
      <div className='formInputContainer'>
      <div className='formInput'>
      <p className='inputLabels'>Enter Email</p>
        <input className='inputFields' type="text" name="email" placeholder="Enter Email"></input>
        </div>
        <div className='formInput'>
        <p className='inputLabels'>Enter Password</p>
        <input className='inputFields' type="text" name="password" placeholder="Enter Password"></input>
        </div>
        <div className='submitButton'>
        <input type="Submit" value="Login"></input>
        </div>
        </div>
    <div className='registerUser'>
      <p>New to Notify? <a href='/register'>Register Here</a></p>
    </div>
    </form>
    </div>
    </div>
  )
}

export default Login