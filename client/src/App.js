import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login/Login';
import Register from './Register/Register';
import {BrowserRouter as Router} from 'react-router-dom'
import Hello from './Hello';
import Hello2 from './Hello2';
import Navbar from './Navbar/Navbar';
import { Provider } from 'react-redux';
import Store from './Store';
import Scheduling from './Scheduling';
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
    <Route exact path='/scheduling' element={<Scheduling/>}/> 
    <Route exact path='/trash' element={<Trash/>}/> 
       </Routes>
     </Router>
     </Provider>
  );
}

export default App;
