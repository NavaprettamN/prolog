import React from 'react'
import "../NavBar.css"

const NavBarP = () => {
  return (
    <nav>
        <div className='name'>
            Prolog
        </div>
        <div className='nav-links'>
            <a href='/profile'>Home</a>
            <a href='#'>Prologs</a>
            <a href='#'>Create Prologs</a>
            <a href='#'>Logout</a>
        </div>
    </nav>
  )
}

export default NavBarP