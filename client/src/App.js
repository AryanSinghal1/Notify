import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login/Login';
import Register from './Register/Register';
import {BrowserRouter as Router} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Notes from './Notes';
import Trash from './Trash/Trash';
import { useEffect } from 'react';
import Logout from './Logout';
import { userLogin } from './Slices';
import Starred from './Starred/Starred';
import Profile from './Profile/Profile';
function App() {
  const dispatch = useDispatch();

  const getData = () =>{
    fetch("/authenticate",{
      method  :"GET",
      headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
      },
      credentials : 'include'
  }).then(async(e)=>{
      const thisdata = await e.json();
      dispatch(userLogin(thisdata.user));
  }).catch((e)=>console.log(e));
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <Router>
      <Routes>
    <Route exact path='/' element={<Login/>}/>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/home' element={<Home/>}/> 
    <Route exact path='/notes' element={<Notes/>}/>  
    <Route exact path='/trash' element={<Trash/>}/> 
    <Route exact path='/starred' element={<Starred/>}/> 
    <Route exact path='/logout' element={<Logout/>}/> 
    <Route exact path='/profile' element={<Profile/>}/> 
       </Routes>
     </Router>
  );
}

export default App;
