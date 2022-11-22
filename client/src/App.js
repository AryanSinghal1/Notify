import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login/Login';
import Register from './Register/Register';
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux';
import Store from './Store';
import Notes from './Notes';
import Trash from './Trash/Trash';
function App() {
  return (
    <Provider store={Store}>
    <Router>
      <Routes>
    <Route exact path='/' element={<Login/>}/>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/home' element={<Home/>}/> 
    <Route exact path='/notes' element={<Notes/>}/>  
    <Route exact path='/trash' element={<Trash/>}/> 
       </Routes>
     </Router>
     </Provider>
  );
}

export default App;
