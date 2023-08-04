import React from 'react';
import {useNavigate} from "react-router-dom"
import './login.css'
import axios from 'axios'
import  { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
const navigate = useNavigate();


const[backenddata,setbackenddata]=useState([])

  const[username,setusername]=useState('')
  const[password,setpass]=useState('')
  const[fullname,setfull]=useState('')
  const[gmail,setgamil]=useState('')
  function senddata(){ 

    var user = {
      username:username,
      password:password,
      fullname:fullname,
      gmail:gmail
    }
    axios.post('/api/register',user)
    .then(res=>{
      console.log(res)
   //   setbackenddata(res.data)
   if(res.data==='registered')
   toast.success("Registered")
   else
      toast.error(res.data)
    }).catch(err=>{
      setbackenddata(err);
    })
   

  }

  

  

return (
<>
<ul>
  <li><a href="/">Home</a></li>
  <li><a href="#news">Plans</a></li>
  <li className="dropdown">
    <a href="javascript:void(0)" class="dropbtn">Account</a>
    <div className="dropdown-content">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
      <a href="/forget">Forgot Password</a>
    </div>
  </li>
</ul>
<div className='form2'>
<label for="username">Username:</label>
  <input type="text" placeholder='Username' value={username} onChange={(e)=>{setusername(e.target.value)}} /><br></br>
  <label for="password">Password:</label>
  <input type="password" placeholder='Password' value={password} onChange={(e)=>{setpass(e.target.value)}} /><br></br>
  <label for="fullname">Fullname:</label>
  <input type="fullname" placeholder='Fullname' value={fullname} onChange={(e)=>{setfull(e.target.value)}} /><br></br>
  <label for="email">email:</label>
  <input type="email" placeholder='Email' value={gmail} onChange={(e)=>{setgamil(e.target.value)}} /><br></br><br></br>
  <button className='log' onClick={senddata}>Register</button>
  <ToastContainer />  
<br></br>
  <a href='/login'>Back to login</a>
  </div>

</>
)
};

export default Register;
