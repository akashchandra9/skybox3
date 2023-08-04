import React from 'react';
import {useNavigate,useLocation} from "react-router-dom"
import './file.css'
import axios from 'axios'
import  { useState } from "react";
import {useDropzone} from 'react-dropzone'
import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Detail = () => {
const navigate = useNavigate();
const location = useLocation();
  const {username}  = location.state;  
  const[backenddata,setbackenddata]=useState([])
  const [uploadProgress, setUploadProgress] = useState(0);
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
    const handleFileUpload = () => {
      const formData = new FormData();
      selectedFile.forEach((file2)=>{
        formData.append('file',file2)
      })
      // formData.append('file', selectedFile);
  axios.post('api/upload/user',user);
      axios
        .post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },
        })
        .then(res => {
          
          toast.success(res.data);
          setUploadProgress(0);
        })
        .catch((error) => {
          console.error(error);
        });
      }
      const filePreviews = selectedFile.map((file, index) => (
        <div key={index}>
          {file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ maxWidth: '200px' }}
            />
          ) : (
            <p>{file.name}</p>
          )}
        </div>
      ));

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
		
    <div className='dropzone'>
      <Dropzone onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps({multiple:true}) }/>
            <p>Drag and drop a file here, or click to select a file</p>
          </div>
          
        )}
      </Dropzone>
      <button onClick={handleFileUpload}>Upload File</button>
      {uploadProgress > 0 && (
          <div className='progress-bar' style={{ width: `${uploadProgress}%` }}>
            {uploadProgress}%
          </div>
        )}
     
    </div>
    {filePreviews}

  
<ToastContainer/>
	</>
)
};

export default Detail;
