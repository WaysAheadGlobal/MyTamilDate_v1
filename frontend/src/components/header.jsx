
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './header.css';
import { Container, Image } from 'react-bootstrap';
import bgr from '../assets/images/r-bg.png';
import { useNavigate } from 'react-router-dom';
import logo2 from "../assets/images/logo2.png";

export const Headerlp = () => {
  const navigate = useNavigate();
  
  const goToSignup = () => {
    navigate("/signup");
  };

  const goToSignin = () => {
    navigate("/SignIn");
  };


  return (

    <div className='header-main'>
      <div className='header-content'>
        <div className='bg-l'>
          {/* <Image src={bgl} style={{ height: '100%', width: '100%' }} ></Image> */}
          <div className='header-shade'></div>
        </div>
        <div className='header-text'>
          <img src={logo2} className='main-logo'></img>
          <span>Meet Tamil Singles</span>
          <Container className='header-btn'>
            <button className='header-btnone' onClick={goToSignup}>
              Get Started
            </button>
            <button className='header-btntwo' onClick={goToSignin}>
              Returning? Login
            </button>
          </Container>
        </div>
        <div className='bg-r'>
          <Image src={bgr} style={{ height: '100%', width: '100%' }} ></Image>
        </div>
      </div>
    </div>
  );
}