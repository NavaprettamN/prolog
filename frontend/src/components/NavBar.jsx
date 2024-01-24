import React from 'react'
import "./NavBar.css"

const NavBar = () => {
  return (
    <nav>
        <div className='name'>ProLog</div>
        <div className='nav-links'>
            <a href='#home'>Home</a>
            <a href='#about'>About</a>
            <a href='#contact'>Contact</a>
            <a href='/login'>Login</a>
        </div>
    </nav>
  )
}

export default NavBar