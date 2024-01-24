import { useState } from "react"
import React from "react";
import "./LoginPage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({setToken, setUserId}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/login", {
        username, password
      });
      if(res.status == 200) {
        const token = res.data.token;
        const userId = res.data.userId;
        console.log(res);
        setToken(token);
        localStorage.setItem('userId', userId);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
        <div className='container'>
            <div className='title'>
                Login
            </div>
            <div className='form'>
                <label for="username">Username : </label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <label for="password">Password : </label>
                <input type='text' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button onClick={handleSubmit}>Login In</button>
            </div>
        </div>
    </>
  )
}

export default LoginPage