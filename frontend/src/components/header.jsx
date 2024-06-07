
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Image } from 'react-bootstrap';

import heartlogo from '../assets/images/heart-logo.png';

import bgl from '../assets/images/l-bg.png'
import bgr from '../assets/images/r-bg.png'
import st3 from '../assets/images/st3.png'




import logo2 from "../assets/images/logo2.png";
import { useNavigate } from 'react-router-dom';

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
          <Image src={bgl} style={{ height: '100%', width: '100%' }} ></Image>
        </div>

        <div className='header-text'>
          <Image src={logo2} className='main-logo'></Image>
          <span>Meet Tamil Singles</span>
          <Container className='header-btn'>
            <button className='header-btnone' onClick={goToSignup}>
            Get Started
            </button>
            <button className='header-btntwo'  onClick={goToSignin}>
            Returning? Login
            </button>
          </Container>
        </div>
        <div className='bg-r'>
          <Image src={bgr} style={{ height: '100%', width: '100%' }} ></Image>
        </div>









      </div>



      <div className="story-col" >
                            <div className="story-item">
                                <img  className='story-image' src={st3} />
                                <div className="story-detail">
                                    <span className='story-name'>Jenani & Nav</span>
                                    <span className='story-title'>Jenani & Nav Found Each Other At The Right Time...</span>
                                    <a  href="" className='story-read-more'>Read more</a>
                                </div>
                            </div>
                        </div>







    </div>


























  );
}