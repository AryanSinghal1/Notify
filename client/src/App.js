import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login/Login';
import Register from './Register/Register';
import {BrowserRouter as Router} from 'react-router-dom'
import Hello from './Hello';
import Hello2 from './Hello2';
import Navbar from './Navbar';
import { Provider } from 'react-redux';
import Store from './Store';
import Scheduling from './Scheduling';
function App() {
  return (
    <Provider store={Store}>
    <Router>
     <div className="App">
      <Routes>
    <Route exact path='/' element={<Login/>}/>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/home' element={<Home/>}/> 
    <Route exact path='/scheduling' element={<Scheduling/>}/> 
       </Routes>
     </div>
     </Router>
     </Provider>
  );
}

export default App;
