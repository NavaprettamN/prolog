import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");

    const getUserData = async() => {
      try {
        const res = await axios.get('http://localhost:4000/user');
        console(res);
        setUsername(res.data.id);
      }
      catch (error) {
        console.log(error, "this is the error");
      }
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if(!token && !userId) {
            console.log("rerouting to login");
            navigate("/login");
        } else {
          setUserId(localStorage.getItem('userId'));
          getUserData();
        }
    }, [navigate]);

    const signout = ()=> {
      localStorage.setItem('userId', "");
      navigate('/login');
    }
  
  if(!userId) {
    return (
      <>
        <div className=''>
          yoo bitch!! you logged out
        </div>
      </>
    )
  }
  return (
    <>
      <div>{userId}{username}</div>
      <div>
        {/* <NavBarP /> */}
        <button onClick={signout}>sign out</button>
      </div>
    </>
  )
}

export default Profile