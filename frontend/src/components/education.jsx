import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './education.css';
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import { useNavigate } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';
import responsivebg from "../assets/images/responsive-bg.png";
import edu from "../assets/images/education.png";

const educationLevels = [
    'Associates', 'Bachelors', 'Doctorate', 'High school', 'Masters', 'Trade school', 'Prefer not to say'
];

export const Education = () => {
    const navigate = useNavigate();
    const goTojobTitle = () => {
        navigate("/jobtitle");
      };



    return (
        <div className='education-container'>
            <div className='education-bg'>
                <Image className='responsive-bg' src={responsivebg} alt="Background"></Image>
            </div>
            <Container className='education-main'>
                <Container className='education-content'>
                    <Container className='logo-progressbar9'>
                        <Container className='logo-arrow9'>
                            <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} alt="Back Arrow" />
                            <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                        <div className='track-btn9'>
                            <div></div>
                        </div>
                    </Container>
                    <Container className='education-details'>
                        <div className='your-education'>
                            <Container className='education-text'>
                                <Image className='about-yourself-icon' src={edu} alt="Education Icon" />
                                <p>What’s the highest level you’ve attained?</p>
                            </Container>
                            <Container className='all-education'>
                                <div className="outer-div">
                                    <div className="first-div">
                                        <div className="inner-div">
                                            <div className="sub-inner-div">Associates</div>
                                            <div className="sub-inner-div">Bachelors</div>
                                        </div>
                                        <div className="inner-div">
                                            <div className="sub-inner-div">Doctorate</div>
                                            <div className="sub-inner-div">High school</div>
                                        </div>
                                        <div className="inner-div">
                                            <div className="sub-inner-div">Masters</div>
                                            <div className="sub-inner-div">Trade school</div>
                                        </div>
                                    </div>
                                    <div className="second-div">
                                    Prefer not to say
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </Container>
                    <Button variant="primary" type="submit" className='education-nxt-btn' onClick={goTojobTitle}>
                        Next
                    </Button>
                </Container>
            </Container>
        </div>
    );
};







