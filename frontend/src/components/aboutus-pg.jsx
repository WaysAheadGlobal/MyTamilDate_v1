import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './aboutus-pg.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Image, Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { NavBar } from './nav';
import { Join } from './join';
import { Footer } from './footer';
import abtbg from "../assets/images/abtus-bg.png";
import abtr from "../assets/images/abtr.png";
import abtl from "../assets/images/abtl.png";
export const AboutUsPage = () => {
    return (
        <>

            <NavBar />




            <Container className='abt-main'>



                <Container className='abt1-main'>
                    <Row fluid className="abt1-row">
                        <Col fluid className="abt1-col" xs={12} md={12}>
                            <div className="abt1-item">
                                <Image fluid className='abt1-image' src={abtbg} />
                                <div className="abt1-detail">

                                    <p>ABOUT US</p>
                                    <h3>myTamilDate.com has been the most trusted dating community for single Tamils around the world for close to a decade! We’re the premiere dating site for diaspora Tamils and have the largest membership base in Canada, USA, UK & more.</h3>
                                </div>
                            </div>
                        </Col>
                    </Row>

               </Container>


                <Container className='abt2-main'>

                    <div className='abt2-imgl'>
                        <Image className='abt2-img'  src={abtl} ></Image>
                        <p>Sanjutha & Roban</p>
                        <a href="">Read their story</a>

                    </div>
                    <div className='abt2-mid'>
                        <div className='abt2-txt'>
                            <p>
                                Proven Success
                            </p>
                            <span>
                                We’ve been helping single Tamils meet, date and marry for years. On their own terms & their own timelines.
                            </span>
                        </div>
                        <a href="">Get Started</a>


                    </div>





                    <div className='abt2-imgr'>
                        <Image  className='abt2-img' src={abtr}></Image>
                        <p>Abi & John</p>
                        <a href="">Read their story</a>

                    </div>


                </Container>





            </Container>






















            <Footer />

        </>





















    );
}