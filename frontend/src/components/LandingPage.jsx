import React from 'react'
import './LandingPage.css'
import aboutimg from '../assets/about-img.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Signup from './Signup'
const LandingPage = () => {

    const navigate = useNavigate();
    const contact = [
        {
            id: 1,
            type: "instagram",
            image: aboutimg,
            link: "https://www.instagram.com/navaprettam_n/"
        },
        {
            id: 2,
            type: "LinkedIn",
            image: aboutimg,
            link: "https://www.instagram.com/navaprettam_n/"
        },
        {
            id: 3,
            type: "LinkedIn",
            image: aboutimg,
            link: "https://www.instagram.com/navaprettam_n/"
        }
    ]
    
    const handleSignup = () => {
        navigate("/signup");
    }

    const handleLogin = () => {
        navigate("/login");
    }
  return (
    <>
        <div id ="home" className='container-1'>
            <div className='title'>
                ProLog
            </div>
            <div className='desc'>
                Your Progress logger
            </div>
            <div className='buttons'>
                <div>
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div>
                <button onClick={handleSignup}>Sign up</button>
                </div>
            </div>
        </div>
        <div id="about" className='container-2'>
            <div className='about'>
                <h1>
                    About ProLog
                </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem expedita rerum exercitationem nihil? Ducimus rem porro sed iste dolor libero illum eveniet! Veritatis, molestiae saepe. Esse ratione in sint quidem.</p>
            </div>
            <div className='about-img'>
                <img src={aboutimg} alt=''/>
            </div>
        </div>
        <div id="contact" className='container-3'>
            <div className='contact-title'>
                Contact Me
            </div>
            <div className='contact-info'>
                {
                    contact.map(({id, type, image, link}) => (
                        <div key={id} className=''>
                            <a href={link}><img src={image} alt='' className='contact-img'/></a>
                            <p>{type}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default LandingPage