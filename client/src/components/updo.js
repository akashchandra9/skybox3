import React from 'react';
import {useNavigate,useLocation} from "react-router-dom"
import './file.css'
import axios from 'axios'
import  { useState } from "react";
import {useDropzone} from 'react-dropzone'
import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Updo = () => {
const navigate = useNavigate();
const location = useLocation();
  const {username}  = location.state;  
  const[backenddata,setbackenddata]=useState([])
var name;
var user = {
  username:username
}
axios.post('/api/site',user)
.then(res=>{
  console.log(res)
  setbackenddata(res.data);
  });
  const {getRootProps, getInputProps} = useDropzone()
 
    const [selectedFile, setSelectedFile] = useState([]);
    function upload(){
        navigate('/detail',{ state: { username: username } })
    }
    function download(){
        navigate('/down',{ state: { username2: username } })
    }

return (
	<>
  <ul>
  <li><a href="/">Home</a></li>
  <li><a href="#news">Plans</a></li>
  <li className="dropdown">
    <a href="javascript:void(0)" class="dropbtn">Hello {backenddata}</a>
    <div className="dropdown-content">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
      <a href="/forget">Forgot Password</a>
    </div>
  </li>
</ul>

  {/* <p>Hello {backenddata}</p> */}
 

  <button className='upbutton' onClick={upload}><b>Upload</b></button>
  <br></br><br></br>
  <button className='downbutton' onClick={download}><b>Download</b></button>

	</>
)
};

export default Updo;
