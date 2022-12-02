import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { userLogin } from '../Slices'
import './Profile.css'
function Profile() {
    const user = useSelector(state=>state.counter.user);
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
    const source = user.photo?user.photo:'https://drcinc.org/wp-content/uploads/2017/05/vagmAzMznjBJGQf_sumV.gif'
    const handleUploadImages = (e) =>{
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (re) => {
        setProfilePhoto(re.target.result)
      };
    }
    const handleSubmit = async(e) =>{
      e.preventDefault();
      let updateUser={
        name:name,
        password:password,
        photo:profilePhoto,
        email:user.email
      }
      await axios.put('/updateUser',updateUser).then(e=>window.location.reload());
    }
    const currentName = name?name:user.name;
  return (
    
    <div className='mainNotesPage'>
        <Navbar/>
        <div className='notesMainContainer'>
        <div className='notesMain'>
            <div className='notesCreate'>
              <div className='empty'></div>
                <div className='searchNotes'>
                    <h2 className='myProfileText'>My Profile</h2>
                </div>
                <div className='empty'>
                </div>
            </div>
            
            <div className='profileContainerMain'>
                <div className='profileContainer'>
                    <div className='currentProfile'>
                        <div className='profileImage'>
                        <img src={source}></img>
                        </div>
                        <p className='profileName'>{user.name}</p>
                    </div>
                    <div className='updateProfile'>
                    <form className='mainProfileForm' onSubmit={handleSubmit}>
  <div className='signInText'>
    <p>Update Info</p>
      </div>
      <div className='loginformInputContainer'>
    <div className='loginformInput'>
    <p className='registerinputLabels'>Enter Name</p>
      <input className='registerInputFields' type="text" name="Name" placeholder="Enter Name" value={currentName} onChange={(e)=>{setName(e.target.value)}}></input>
      </div>
    <div className='loginformInput'>
    <p className='registerinputLabels'>Update Image</p>
      {/* <input className='registerInputFields' type="file" name="Photo" ></input> */}
      <input
                        id="photo"
                        className="document"
                        onChange={handleUploadImages}
                        accept="image/*"
                        type="file"
                        name="proPhoto"
                        ></input>
      </div>
      <div className='loginformInput'>
      <p className='registerinputLabels'>Enter New Password</p>
      <input type="password" className='registerInputFields' onChange={(e)=>{setPassword(e.target.value)}} name="Password" placeholder="Enter Password"></input>
      </div>
      <div className='submitButton'>
      <input type="Submit" value="Update" onChange={()=>{}}></input>
      </div>
      </div>
  </form>
                    </div>
                </div>
        </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Profile