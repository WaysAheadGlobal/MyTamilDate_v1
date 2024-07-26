
import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signin-email-otp.css';
import { useLocation, useNavigate } from 'react-router-dom';
import responsivebg from "../../assets/images/responsive-bg.png";
import backarrow from "../../assets/images/backarrow.jpg";
import logo from "../../assets/images/MTDlogo.png";
import code from "../../assets/images/code.png";

import { Container, Image, Form, Button } from 'react-bootstrap';
import { API_URL } from '../../api';
import { useCookies } from '../../hooks/useCookies';
import { useAlert } from '../../Context/AlertModalContext';

export const SignInEmailOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cookies = useCookies();
    const alertmodal = useAlert();
    const [timer, setTimer] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const intervalRef = useRef(null);
    const goToSignsuccessful = () => {
        window.location.assign('/user/home');
    };
    useEffect(() => {
       
            startTimer();
        
        return () => clearInterval(intervalRef.current);
    }, []);

    const startTimer = () => {
        clearInterval(intervalRef.current);
        setTimer(120);
        setCanResend(false);
        intervalRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev === 1) {
                    clearInterval(intervalRef.current);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const goToSigninEmailSuccessful = () => {
        navigate("/signinemailsuccessful");
    };




    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const code1ref = useRef(null);
    const code2ref = useRef(null);
    const code3ref = useRef(null);
    const code4ref = useRef(null);

    const handleCodeChange = (e, setter, nextRef) => {
        const value = e.target.value;
        if (!isNaN(value) && value.length <= 1) {
            setter(value);
            if (value.length === 1 && nextRef) {
                nextRef.current.focus();
            }
        }
    };

    const handleKeyDown = (e, prevRef) => {
        if (e.key === 'Backspace' && e.target.value === '' && prevRef) {
            prevRef.current.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = code1 + code2 + code3 + code4;
        if (code.length !== 4) {
            setErrorMessage('*Invalid code, please re-enter again');
        } else {
            setErrorMessage('');

        }

        const res = await fetch(`${API_URL}/user/login/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: location.state?.email,
                otp: code,
                usingGoogle: false
            })
        });

        const result = await res.json();
     console.log(result);
        if (res.ok) {
            cookies.setCookie('token', result.token, 30);
            cookies.setCookie('userId', result.Result[0].user_id);
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
                cookies.setCookie('Name', result.Result[0].first_name, 20);
                   goToSignsuccessful();
               } else {
                   setErrorMessage('Please signup firsttt');
               }
           }
            
        }
    };

    const handleResendCode = async () => {
        
       const  email= location.state?.email
        if (!email) {
            setErrorMessage('Please enter a valid email address');
            return;
        } else if (!email.includes('@')) {
            setErrorMessage('Please enter a valid email address');
            return;
        }
        const response = await fetch(`${API_URL}/user/login/email-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        });
        const data = await response.json();
        if (!response.ok) {
            setErrorMessage(data.message);
            return;
        }
        startTimer();
    
        setErrorMessage('');
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
                        {/* <div className='track-btn2'>
                        <div></div>
                    </div> */}
                    </Container>

                    <Container className='entercode-text'>
                        <Image src={code} />
                        {/* <p>Enter your verification code</p> */}
                        {/* <p>Please enter the 4-digit code sent to you at +1 (905)216-5247</p> */}
                    </Container>
                    <Form onSubmit={handleSubmit} className='entercode-form'>
                        <Container className='entercode-content'>
                            <div>
                                <Form.Group controlId="formCode" className='entercode-form-group'>
                                    <Form.Label className='entercode-lable'>Enter your verification code<br /><span>Please enter the 4-digit code sent to you at {location.state?.email}.</span></Form.Label>
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
    <a 
        href='#' 
        onClick={(e) => { 
            e.preventDefault(); 
            if (canResend) handleResendCode(); 
        }} 
        className={!canResend ? 'disabled' : ''}
        style={{ pointerEvents: !canResend ? 'none' : 'auto', color: !canResend ? 'grey' : 'initial' }}
    >
        Resend code
    </a>
    <span>{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')} sec</span>
</div>
                            </div>
                            <Button variant="primary" type="submit" onClick={handleSubmit} className='entercode-btn'>
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
