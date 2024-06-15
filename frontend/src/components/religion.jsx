import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './religion.css';
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import { Container, Image, Button } from 'react-bootstrap';
import responsivebg from "../assets/images/responsive-bg.png";
import religion from "../assets/images/religion.png";
import lang from "../assets/images/lang.png";
import { useNavigate } from 'react-router-dom';

const religions = [
    'Hindu', 'Christian', 'Muslim', 'Jewish', 'Buddhist', 'Other', 'Prefer not to say'
]; 

const languages = [
    'Hindi', 'English', 'Telugu', 'Tamil', 'German', 'Spanish', 'French'
];

export const Religion = () => {


    const navigate = useNavigate();
    const goToEdu = () => {
        navigate("/edu");
      };





    return (
        <div className='religion-container'>
            <div className='religion-bg'>
                <Image className='responsive-bg' src={responsivebg}></Image>
            </div>
            <Container className='religion-main'>
                <Container className='religion-content'>
                    <Container className='logo-progressbar8'>
                        <Container className='logo-arrow8'>
                            <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
                            <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                        <div className='track-btn8'>
                            <div></div>
                        </div>
                    </Container>
                    <Container className='religion-details'>
                        <div className='your-religion'>
                            <Container className='religion-text'>
                                <Image className='about-yourself-icon' src={religion}></Image>
                                <p>What is your religion?</p>
                            </Container>
                            <Container className='all-religion'>
                                {religions.map((religion, index) => (
                                    <div key={index} className='religion-item'>
                                        {religion}
                                    </div>
                                ))}
                            </Container>
                        </div>
                        <div className='your-lang'>
                            <Container className='religion-text'>
                                <Image className='about-yourself-icon' src={lang}></Image>
                                <p>What is your preferred language?</p>
                            </Container>
                            <Container className='all-lang'>
                                {languages.map((language, index) => (
                                    <div key={index} className='lang-item'>
                                        {language}
                                    </div>
                                ))}
                            </Container>
                        </div>
                    </Container>
                    <Button variant="primary" type="submit" className='religion-nxt-btn' onClick={goToEdu}>
                        Next
                    </Button>
                </Container>
            </Container>
        </div>
    );
};
