import React from 'react';
import {useNavigate} from "react-router-dom"
import './login.css'
import axios from 'axios'
import  { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {

  
const navigate = useNavigate();

const[backenddata,setbackenddata]=useState([])

  const[username,setusername]=useState('')
  const[password,setpass]=useState('')
  function senddata(){ 

    var user = {
      username:username,
      password:password
    }
    axios.post('/api/login',user)
    .then(res=>{
      console.log(res)
      setbackenddata(res.data)
      if(res.data==='success'){
      toast.success("Login Successful")
      }
      else
       toast.warning(res.data)

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
		
    <div className="App">

  <div className='form2'>
    <form>
  <label for="username"><b>Username:</b></label>
  <input type="text" id="username" placeholder='Username' value={username} onChange={(e)=>{setusername(e.target.value)}} /><br></br>
  <label for="password"><b>Password:</b></label>
  <input type="password" id="password" placeholder='Password' value={password} onChange={(e)=>{setpass(e.target.value)}} /><br></br>
  </form>
  <br></br>
  <button className='log' onClick={senddata} ><b>Login</b></button>
  <ToastContainer />
  
  
  {backenddata === 'success' && navigate('/updo',{ state: { username: username } }) }
  <br></br>
  <a href='/register'>Register</a><br></br>
  <a href='/forget?'>Forget password</a>
  </div>
  </div>
    

	</>
)
};

export default Login;
