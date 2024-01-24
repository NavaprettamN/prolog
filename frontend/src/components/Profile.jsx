import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBarP from './ProfileComponents/NavBarP';


const Profile = ({token}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const getUserData = async() => {
      try {
        console.log(localStorage.getItem('userId'));
        const res = await axios.get(`http://localhost:4000/user/${localStorage.getItem('userId')}`);
        setUsername(res.data.username);
      }
      catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if(!token && !userId) {
            console.log("rerouting to login");
            navigate("/login");
        } else {
          setUserId(localStorage.getItem('userId'));
          getUserData();
        }
    }, [token, navigate]);

    const signout = ()=> {
      localStorage.setItem('userId', "");
      navigate('/login');
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