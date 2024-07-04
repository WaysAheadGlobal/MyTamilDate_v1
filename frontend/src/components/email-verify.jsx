import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './email-verify.css';
import { useNavigate } from 'react-router-dom';
import responsivebg from "../assets/images/responsive-bg.png";
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import message from "../assets/images/message.png";

import mail from "../assets/images/Gmail.jpg";
import { Container, Image, Form, Button } from 'react-bootstrap';
import { useCookies } from '../hooks/useCookies';
import { API_URL } from '../api';

export const EmailVerify = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const { getCookie } = useCookies();
    const token = getCookie('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !email.includes('@')) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/customer/users/updateemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: email
                }),
            });

            const result = await response.json();
            if (response.ok) {
               
                navigate("/getstarted");
                setErrorMessage('');
            } else {
                setErrorMessage(result.message || 'Failed to update email, try again');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    }

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
                    </Container>
                    <Form onSubmit={handleSubmit} className='emailverify-form'>
                        <Container className='emailverify-content'>
                            <div style={{ width: '100%', alignItems: 'center' }}>
                                <Form.Group controlId="formCode" className='emailverify-form-group'>
                                    <Form.Label className='emailverify-lable'>Enter your email</Form.Label>
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
                </Container>
            </Container>
        </div>
    );
}
