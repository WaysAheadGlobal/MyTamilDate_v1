
import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pic-text.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Image, Form, Button } from 'react-bootstrap';
import heartlogo from '../assets/images/heart-logo.png'
import bgl from '../assets/images/l-bg.png'
import c1 from '../assets/images/c1.png'
import c2 from '../assets/images/c2.png'
import c3 from '../assets/images/c3.png'
import logo from "../assets/images/MTDlogo.png";



export const Pictext = () => {
    return (

        <div className='pic-text-main'>


            <div className='pic1-text1 lineht '>
                <Container className='pic1'>
                    <Image src={c1} className='c1'></Image>
                </Container>
                <div className='text1 '>
                    <h4> <span className='discover-love'>Discover Love </span>
                        with myTamilDate</h4>
                    <p>A surprise engagement at a myTamilDate couple's photoshoot! Find out how  <span style={{
                        color:
                            '#4E1173 '
                    }} className='abi-john'>Abi & John</span> Bonded Over Faith & Their Tamil-German-British Connection.</p>
                    <a href='https://tamilculture.com/mytamildate-success-abi-john-bonded-over-faith-their-tamil-german-british-connection' target="_blank" className='view-success-btn'>View Success Story</a>
                </div>
            </div>





            <div className='pic3-text3'>
               
                <div className='text1'>
                    <h4> 
                    Meet like-minded people from your community</h4>
                    <p>Connect with individuals in your local Tamil community who share similar interests, values, and cultural backgrounds, fostering a sense of belonging.</p>
                  
                </div>
                <Container className='pic1'>
                    <Image src={c2} className='c1'></Image>
                </Container>
            </div>



            <div className='pic1-text1'>
                <Container className='pic1'>
                    <Image src={c3} className='c1'></Image>
                </Container>
                <div className='text1'>
                    <h4> Discover meaningful connections</h4>
                    <p>Build deep and meaningful relationships with others who understand and appreciate your Tamil heritage, creating bonds that go beyond superficial interactions.</p>
                   
                </div>
            </div>





















        </div>











    );
}  