
import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './storiess.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Image, Form, Button } from 'react-bootstrap';

import st1 from '../assets/images/st1.png'
import st2 from '../assets/images/st2.png'
import st3 from '../assets/images/st3.png'
import { useNavigate } from 'react-router-dom';



export const Stories = () => {


   
    const navigate = useNavigate();


    const goTomorestories = () => {
        navigate("/SuccessPage");
      };
    return (
        <>
            <Container fluid className='story-main'>
                <div className='story-text'>
                   
                    <p className='story-heading' >They met their Match on <span style={{color:'#4E1173'}}>myTamilDate</span></p>
                </div>
                <Container className='story-content'>
                <Row  fluid className="story-row">
                        <Col fluid className="story-col" xs={12} md={3}>
                            <div className="story-item">
                                <Image fluid className='story-image' src={st1} />
                                <div className="story-detail">
                                    <span className='story-name'>Madhu & Niya</span>
                                    <span className='story-title'>It was love at first sight for Madhu and Niya...</span>
                                    <a href='' className='story-read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="story-col" xs={12} md={3}>
                            <div className="story-item">
                                <Image fluid className='story-image' src={st2} />
                                <div className="story-detail">
                                    <span className='story-name'>Abi & John</span>
                                    <span className='story-title'>Abi & John Bonded Over Faith & Connection...</span>
                                    <a href='' className='story-read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="story-col" xs={12} md={3}>
                            <div className="story-item">
                                <Image fluid className='story-image' src={st3} />
                                <div className="story-details">
                                    <span className='story-name'>Jenani & Nav</span>
                                    <span className='story-title'>Jenani & Nav Found Each Other At The Right Time...</span>
                                    <a  href="" className='story-read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Button className='more-success-btn' onClick={goTomorestories}>More success stories</Button>
            </Container> 

        </>





    );}
