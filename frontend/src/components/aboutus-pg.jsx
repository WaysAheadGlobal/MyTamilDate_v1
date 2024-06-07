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
import survey from "../assets/images/SURVEY.png";
import property from "../assets/images/PROPERTY.png";
import agent from "../assets/images/AGENT.png";
import moving from "../assets/images/MOVING HOME.png";
import abtr from "../assets/images/abtr.png";
import abtl from "../assets/images/abtl.png";
import abt4vid from "../assets/images/abtus-video.png";
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
                        <Image className='abt2-img' src={abtl} ></Image>
                        <p>Sanjutha & Roban</p>
                        <a href="https://tiethethali.com/sanjutha-roban/">Read their story</a>

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
                        <a href="/signup" target='_blank'>Get Started</a>


                    </div>





                    <div className='abt2-imgr'>
                        <Image className='abt2-img' src={abtr}></Image>
                        <p>Abi & John</p>
                        <a href="https://tamilculture.com/mytamildate-success-abi-john-bonded-over-faith-their-tamil-german-british-connection">Read their story</a>

                    </div>


                </Container>





                <Container className='abt3-main'>
                    <p >Benefits of myTamilDate</p>
                    <Container className='abt3-main-content'>
                        <Container className='abt3-one'>

                            <div className='abt3-top'>
                                <img className="abt3-img" src={survey}></img>
                                <div className='abt3-text'>
                                    <span >Trust & Authenticity</span>
                                    <p>We manually verify every profile to ensure authenticity. Phone verification
                                        is also required for added security.</p>
                                </div>
                            </div>


                            <div className='abt3-bottom'>
                                <img className="abt3-img" src={agent}></img>
                                <div className='abt3-text'>
                                    <span >Safety & Protection</span>
                                    <p>We prioritize creating a safe and trusted community, ensuring your platform experience
                                        and personal data protection.</p>

                                </div>
                            </div>

                        </Container>
                        <Container className='abt3-one'>

                            <div className='abt3-top'>
                                <img className="abt3-img" src={property}></img>
                                <div className='abt3-text'>
                                    <span >Flexible Platform</span>
                                    <p>We’re built for mobile first and enhanced for desktop too! The best part? You don’t have to download yet another app.</p>
                                </div>
                            </div>


                            <div className='abt3-bottom abt3-cus'>
                                <img className="abt3-img" src={moving}></img>
                                <div className='abt3-text'>
                                    <span >Personalized Service</span>
                                    <p>We care about your dating life like a good friend, offering profile help, messaging tips, and date ideas!</p>
                                </div>
                            </div>


                        </Container>









                    </Container>





                </Container>






                <Container className='abt4-main'>
              <a  target="_blank"href='https://www.instagram.com/reel/C4Bg5EWJZ8P/'>

                      <img className='abt4-bg' src={abt4vid}></img>



              </a>



                </Container>





            </Container>






















            <Footer />

        </>





















    );
}