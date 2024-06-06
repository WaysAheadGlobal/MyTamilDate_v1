
import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './success-stories-pg.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Image, Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import st1 from '../assets/images/st1.png'
import st2 from '../assets/images/st2.png'
import st3 from '../assets/images/st3.png'
import st4 from '../assets/images/st4.png'
import st5 from '../assets/images/st5.png'
import st6 from '../assets/images/st6.png'


import { NavBar } from './nav'; 
import {Join} from './join';
import {Footer} from './footer';

export const SuccessPage=()=>
    {
        return(






            
            <div className='success-pg-main'>
            <NavBar/>
            <Container fluid className='success-pg-team'>
                <Container className='success-pg-text'>
                   
                    <p className='success-pg-heading' >Success Stories</p>
                    <p className='success-pg-sub'>Matches are made daily & serious relationships are created monthly across North America, Europe & more on MTD! Get to know some of our couples.</p>
                </Container>
                <Container className='team-content'>
                <Row  fluid className="team-row">
                        <Col fluid className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st2} />
                                <div className="successpg-details">
                                    <span className='person-name'>Madhu & Niya</span>
                                    <span className='person-title'>It was love at first sight for Madhu and Niya....</span>
                                    <a href='' className='read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st1} />
                                <div className="successpg-details">
                                    <span className='person-name'>Abi & John</span>
                                    <span className='person-title'>Abi & John Bonded Over Faith & Connection...</span>
                                    <a href='' className='read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st3} />
                                <div className="successpg-details">
                                    <span className='person-name'>Jenani & Nav</span>
                                    <span className='person-title'>Jenani & Nav Found Each Other At The Right Time...</span>
                                    <a  href="" className='read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                    </Row>



                    <Row  fluid className="team-row">
                        <Col fluid className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st4} />
                                <div className="successpg-details">
                                    <span className='person-name'>Agi & Ano</span>
                                    <span className='person-title'>Agi’s First Attempt With Online Dating Led Her To....</span>
                                    <a href='' className='read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st5} />
                                <div className="successpg-details">
                                    <span className='person-name'>Celine & Santhous</span>
                                    <span className='person-title'>A Gentle Push Towards Online Dating By Family Brought....</span>
                                    <a href='' className='read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st6} />
                                <div className="successpg-details">
                                    <span className='person-name'>Suji & Sinthu</span>
                                    <span className='person-title'>Suji & Sinthu's journey is a heartwarming example....</span>
                                    <a  href="" className='read-more'>Read more</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </Container> 















            <Join/>
        <Footer/>



            </div>
























        );
    }
