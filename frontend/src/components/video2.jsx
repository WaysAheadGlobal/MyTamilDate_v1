import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./video2.css";
import { Container, Image, Form, Button, Dropdown } from 'react-bootstrap';

import vd1 from '../assets/images/vd1.png'
import vd2 from '../assets/images/vd2.png'
import vd3 from '../assets/images/vd3.png'

export const Video2 = () => {
    return (

        <Container className=' video2-main'>
            <p>Dating While Tamil? </p>
            <span>Check out the MTD community's tips & insights! </span>

            <Container className='video2-content'>
                <a className='vid2' >
                    <img   className='video2-img' src={vd1}>
                    </img>
                    <div className='play-icon'></div>

                </a>
                <div className='vid2'>
                    <img  className='video2-img' src={vd2} >

                    </img>
                    <div className='play-icon'></div>
                </div>
                <a className='vid2'>
                    <img  className='video2-img' src={vd3}>
                    </img>
                    <div className='play-icon'></div>
                </a>



            </Container>






        </Container>































    );
}