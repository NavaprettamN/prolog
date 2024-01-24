import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';
import { useState } from 'react';
import Profile from './components/Profile';
import CreateProLog from './components/ProfileComponents/CreateProLog';

function App() {
  const [token, setToken] = useState("");
  console.log(localStorage);
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Router>
        <Routes>
          <Route path='/' element={<><NavBar/> <LandingPage /></>} />
          <Route path='/login' element={<LoginPage setToken={setToken}/>} />
          <Route path='/signup' element={<Signup setToken={setToken}/>}/>
          <Route path='/profile/*' element={<Profile token={token} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;