import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signin-phone-otp';
import { useNavigate } from 'react-router-dom';
import responsivebg from "../../assets/images/responsive-bg.png";
import backarrow from "../../assets/images/backarrow.jpg";
import logo from "../../assets/images/MTDlogo.png";
import code from "../../assets/images/code.png";
import google from "../../assets/images/google 1.jpg";
import mail from "../../assets/images/Gmail.jpg";
import { useAppContext } from '../../Context/UseContext';
import { Container, Image, Form, Button } from 'react-bootstrap';
import { useCookies } from '../../hooks/useCookies';
import { API_URL } from '../../api';
import { useAlert } from '../../Context/AlertModalContext';

export const SignInPhoneOTP = () => {
    const { getCookie, setCookie } = useCookies();
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const alertmodal = useAlert();
    const goToSignsuccessful = () => {
        window.location.assign('/user/home');
    };

    // State for OTP code inputs
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Refs for input fields
    const code1ref = useRef(null);
    const code2ref = useRef(null);
    const code3ref = useRef(null);
    const code4ref = useRef(null);

    // Resend OTP timer state and handler
    const [resendTimer, setResendTimer] = useState(120);
    const [isResendDisabled, setIsResendDisabled] = useState(true); // Initially disabled

    useEffect(() => {
        const savedPhoneNumber = getCookie('phoneNumber');
        if (savedPhoneNumber) {
            setPhoneNumber(savedPhoneNumber);
        }

        // Countdown logic
        const interval = setInterval(() => {
            setResendTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    setIsResendDisabled(false); // Enable resend button when timer reaches 0
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [getCookie, setPhoneNumber]);

    // Function to handle OTP code input change
    const handleCodeChange = (e, setter, nextRef) => {
        const value = e.target.value;
        if (!isNaN(value) && value.length <= 1) {
            setter(value);
            if (value.length === 1 && nextRef) {
                nextRef.current.focus();
            }
        }
    };

    // Function to handle Backspace and focus on previous input
    const handleKeyDown = (e, prevRef) => {
        if (e.key === 'Backspace' && e.target.value === '' && prevRef) {
            prevRef.current.focus();
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")
        const otp = code1 + code2 + code3 + code4;
        console.log(otp);
        console.log(phoneNumber);
        if (otp.length !== 4) {
            setErrorMessage('*Invalid OTP, please re-enter again');
        } else {
            setErrorMessage('');
            try {
                const token = getCookie('token');
                const response = await fetch(`${API_URL}/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({
                        phone: phoneNumber,
                        otp: otp
                    }),
                });

                const result = await response.json();
                console.log(result);
                if (response.ok) {
 
                    setResendTimer(120);
                    setErrorMessage("")
                    setIsResendDisabled(true);
                    setCookie('token', result.token, 15);
                    setCookie('userId', result.Result[0].user_id, 15);
                    if (result.Result && result.Result.length > 0) {
                         if(result.Result[0].approval === 40){
                            alertmodal.setModal({
                                show: true,
                                title: 'Incomplete Registration',
                                message: "To access the application's features, please complete your registration process first.",
                            });
                            
                            navigate('/basicdetails');
                            
                         }

                    else if (result.Result[0].approval === 10) {
                            navigate('/pending');
                        } else if (result.Result[0].approval === 30) {
                            navigate('/not-approved');
                        } else if (result.Result[0].approval === 20) {
                            setCookie('Name', result.Result[0].first_name, 20);
                            goToSignsuccessful();
                        } else {
                            setErrorMessage('Please signup first');
                        }
                    }
                    
                }
                else {
                    setErrorMessage(result.message || 'Failed to send OTP');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    }

    // Function to resend OTP
    const resendotp = async (e) => {
        e.preventDefault();
        if (resendTimer === 0) {
            try {
                const response = await fetch(`${API_URL}/user/login/otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: phoneNumber,
                    }),
                });

                const result = await response.json();
                if (response.ok) {

                    setResendTimer(120); // Reset timer to 2 minutes on successful resend
                    setIsResendDisabled(true); // Disable resend button after OTP is sent
                } else {
                    setErrorMessage(result.message || 'Failed to send OTP');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    // Function to format remaining time in mm:ss format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className='entercode-container'>
            <div className='entercode-bg'>
                <Image className='responsive-bg' src={responsivebg}></Image>
            </div>

            <Container className='entercode-main'>
                <Container className='entercode-box'>

                    <Container className='logo-progressbar2'>
                        <Container className='logo-arrow2'>
                            <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
                            <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                        <div className='track-btn2'>
                            <div></div>
                        </div>
                    </Container>

                    <Container className='entercode-text'>
                        <Image src={code} />
                    </Container>

                    <Form onSubmit={handleSubmit} className='entercode-form'>
                        <Container className='entercode-content'>
                            <div>
                                <Form.Group controlId="formCode" className='entercode-form-group'>
                                    <Form.Label className='entercode-lable'>Enter Verification Code</Form.Label>
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code1ref}
                                            placeholder=""
                                            value={code1}
                                            onChange={(e) => handleCodeChange(e, setCode1, code2ref)}
                                            onKeyDown={(e) => handleKeyDown(e, null)}
                                            style={{ flex: 1 }}
                                        />
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code2ref}
                                            placeholder=""
                                            value={code2}
                                            onChange={(e) => handleCodeChange(e, setCode2, code3ref)}
                                            onKeyDown={(e) => handleKeyDown(e, code1ref)}
                                            style={{ flex: 1, marginLeft: '10px' }}
                                        />
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code3ref}
                                            placeholder=""
                                            value={code3}
                                            onChange={(e) => handleCodeChange(e, setCode3, code4ref)}
                                            onKeyDown={(e) => handleKeyDown(e, code2ref)}
                                            style={{ flex: 1, marginLeft: '10px' }}
                                        />
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code4ref}
                                            placeholder=""
                                            value={code4}
                                            onChange={(e) => handleCodeChange(e, setCode4, null)}
                                            onKeyDown={(e) => handleKeyDown(e, code3ref)}
                                            style={{ flex: 1, marginLeft: '10px' }}
                                        />
                                    </div>
                                    {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>}
                                </Form.Group>

                                <div className='resend-timer'>
                                    <a href="#" onClick={resendotp} disabled={isResendDisabled}>Resend code</a>
                                    <span>{formatTime(resendTimer)} sec</span>
                                </div>
                            </div>
                            <Button variant="primary" type="submit" className='entercode-btn'>
                                Next
                            </Button>
                        </Container>
                    </Form>
                </Container>
            </Container>
        </div>
    );
};
