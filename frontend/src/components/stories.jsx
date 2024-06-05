
import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stories.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Image, Form, Button } from 'react-bootstrap';

import st1 from '../assets/images/st1.png'
import st2 from '../assets/images/st2.png'
import st3 from '../assets/images/st3.png'


export const Stories = () => {
    return (
        <>
            <Container fluid className='main-team'>
                <div className='team-text'>
                   
                    <p className='team-heading' >They met their Match on <span style={{color:'#4E1173'}}>myTamilDate</span></p>
                </div>
                <Container className='team-content'>
                <Row  fluid className="team-row">
                        <Col fluid className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st1} />
                                <div className="team-detail">
                                    <span className='person-name'>Madhu & Niya</span>
                                    <span className='person-title'>It was love at first sight for Madhu and Niya...</span>
                                    <a href='' className='read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st2} />
                                <div className="team-detail">
                                    <span className='person-name'>Abi & John</span>
                                    <span className='person-title'>Abi & John Bonded Over Faith & Connection...</span>
                                    <a href='' className='read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st3} />
                                <div className="team-details">
                                    <span className='person-name'>Jenani & Nav</span>
                                    <span className='person-title'>Jenani & Nav Found Each Other At The Right Time...</span>
                                    <a  href="" className='read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Button className='more-success-btn'>More success stories</Button>
            </Container> 

        </>





    );}
