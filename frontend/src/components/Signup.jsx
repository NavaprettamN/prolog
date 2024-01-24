import React, { useState } from 'react'
import axios from 'axios'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
const Signup = ({setToken}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(username, password);
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/signup", {
        username,
        password,
      });
      if(res.status == 201) {
        const token = res.data.token;
        setToken(token);
        navigate("/profile"); 
      }
      
    }catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
        <div className='title'>
            Signup
        </div>
        <div className='form'>
            <label for="username">Username : </label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <label for="password">Password : </label>
            <input type='text' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button onClick={handleSubmit}>Sign up</button>
        </div>
    </div>
  )
}

export default Signup