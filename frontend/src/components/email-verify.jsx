
import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './email-verify.css';
import { useNavigate } from 'react-router-dom';
import responsivebg from "../assets/images/responsive-bg.png";
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import message from "../assets/images/message.png";
import google from "../assets/images/google 1.jpg";
import mail from "../assets/images/Gmail.jpg";
import { Container, Image, Form, Button } from 'react-bootstrap';

export const EmailVerify = () => {




    const navigate = useNavigate();
    // const goToGetstarted = () => {
    //     navigate("/getstarted");
    //   };
  
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
 

    const handleSubmit = (e) => {
        e.preventDefault();

       
        if (!email) {
            setErrorMessage('Please enter a valid email address');
            return;
        } else if (!email.includes('@')) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

       
        console.log('Email submitted:', email);

        
        setEmail('');
        setErrorMessage('');
        navigate("/getstarted");


        
    };

    return (
        <div className='emailverify-container'>
            <div className='emailverify-bg'>
            <Image className='responsive-bg' src={responsivebg}></Image>
            </div>
            <Container className='emailverify-main'>
            <Container className='emailverify-box'>
                <Container className='logo-progressbar3'>

                    <Container className='logo-arrow3'>
                        <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
                        <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                    </Container>
                    <div className='track-btn3'>
                        <div></div>
                    </div>
                </Container>

                <Container className='emailverify-text'>
                <Image src={message} />
                    {/* <p>Enter your verification code</p> */}
                    {/* <p>Please enter the 4-digit code sent to you at +1 (905)216-5247</p> */}
                </Container>
                <Form onSubmit={handleSubmit} className='emailverify-form'>
                <Container className='emailverify-content'>
                <div style={{ width: '100%', alignItems: 'center'}}>
                    <Form.Group controlId="formCode" className='emailverify-form-group'>
                    <Form.Label className='emailverify-lable'> Enter your email</Form.Label>
                      
                            <Form.Control
                                className={`emailverify-input ${errorMessage ? 'error' : ''}`}
                                type="text"
                                style={{ flex: 1 }}
                                placeholder="Example@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                              
                            />
                          
                     
                        {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>}
                    </Form.Group>
                   
                    </div>   
                    <Button variant="primary" type="submit" className='emailverify-btn'>
                        Next
                    </Button>
                    </Container>
                </Form>
                {/* <Container className='or-option'>
                    <Container className='or-line'>
                        <div className='line'></div>
                        <span>or</span>
                        <div className='line'></div>
                    </Container>
                    <p>Already have an account? <a href='' >Sign in here</a></p>
                    <Container className='google-mail'>
                        <a href=''><Image src={google} alt="Google" />Sign Up using Google</a>
                        <a href=''><Image src={mail} alt="Mail" /></a>
                    </Container>
                </Container> */}
            </Container>
           </Container>
        </div>
    );
}