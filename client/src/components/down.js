import React,{useState} from "react";
import axios from 'axios'
import fileDownload from 'js-file-download'
import './file2.css'
import {useNavigate,useLocation} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Down = () => {
  const navigate = useNavigate();
const location = useLocation();
  const {username2}  = location.state; 
  const username=username2;
  const[download,setdow]=useState('')
  const [downloadProgress, setDownloadProgress] = useState(0);
  const[backenddata,setbackenddata]=useState([])
  var user5 = {
    username:username
  }
  axios.post('/api/site',user5)
.then(res=>{
  console.log(res)
  setbackenddata(res.data);
  });
  function handleDownload () {
    if(download=='')
    {
      toast.error("please write file name")
    }
    else{


    var user={
      download:download,
      username:username
    }
    axios.post('/api/down',user, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setDownloadProgress(progress);
      },
    })
    .then((res) => {
      toast.success('success')
      fileDownload(res.data, download)
      setDownloadProgress(0);
    })
    .catch(()=>
    {
      toast.error("file not found")
    })
  }}
 
    const [files, setFiles] = useState([]);
  function show(){
    var user={
      username:username
    }
    axios.post('/api/files',user)
      .then((response) => {
        setFiles(response.data);
      })
  }
 function dow(file){
  
  setdow(file);
  

 }
 function del(){
  if(download=='')
    {
      toast.error("please write file name")
    }
    else{

  var user={
    download:download,
    username:username
  }
  axios.post('api/delete',user).then((res)=>{
    toast.success("Deleted");
    show();
  }).catch((err)=>{
    toast.error("File not found and Not deleted")
  })

  
    }
 } 

   
  return(  
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
  <div className="down">
<input className="inputdown" type='text' placeholder="enter file name" value={download} onChange={(e)=>{setdow(e.target.value)}} ></input>
<br></br>
  <button className="download" onClick={handleDownload}>Download</button>
  <button className="show" onClick={show}>Show files:</button>
  <button className="delete" onClick={del}>Delete</button>
  {downloadProgress > 0 && (
        <div className='progress-bar' style={{ width: `${downloadProgress}%` }}>
          {downloadProgress}%
        </div>
      )}
  <ToastContainer/>
  <div>
        <h1>Files Available:</h1>
        {/* <ol> */}
          {files.map((file, index) => (
            <h6 key={index}>{file}<button onClick={()=>dow(file)}>download</button></h6>
          ))}
        {/* </ol> */}
      </div>
  </div>
  </>
  )
  
}

export default Down;