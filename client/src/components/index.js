import React from "react";
import './index.css'
const Index=()=>{



    return(
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
<img className='indexpic' src="2.png"></img>
        
        </>





    )






}

export default Index;