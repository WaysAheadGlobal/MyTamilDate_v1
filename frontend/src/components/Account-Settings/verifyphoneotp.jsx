import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Container, Button } from 'react-bootstrap';
import { useCookies } from '../../hooks/useCookies';
import { API_URL } from '../../api';


const VerifyPhoneModal = ({errorMessagephone,seterrorMessagephone, modalPhoneNumber, setModalPhoneNumber, setResendTimer,resendTimer,fetchData, showUserPhoneotp, handleClosePhoneotp, handleShowsuccessphone }) => {
    
    const [otpCode1, setOtpCode1] = useState('');
    const [otpCode2, setOtpCode2] = useState('');
    const [otpCode3, setOtpCode3] = useState('');
    const [otpCode4, setOtpCode4] = useState('');
    const [otpErrorMessage, setOtpErrorMessage] = useState('');
    
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const {getCookie,setCookie} = useCookies();
    // Refs for input fields
    const otpCode1ref = useRef(null);
    const otpCode2ref = useRef(null);
    const otpCode3ref = useRef(null);
    const otpCode4ref = useRef(null);

    useEffect(() => {
        const savedPhoneNumber = getCookie('phoneNumber');
        if (savedPhoneNumber) {
            setModalPhoneNumber(savedPhoneNumber);
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
    }, []);

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

    const handleSubmitOtp = async (e) => {
        e.preventDefault();
        setOtpErrorMessage('');
        const otp = otpCode1 + otpCode2 + otpCode3 + otpCode4;
        console.log(modalPhoneNumber,otp)
        console.log(getCookie('token'))
        if (otp.length !== 4) {
            setOtpErrorMessage('*Invalid OTP, please re-enter again');
        } else {
            try {
                console.log(modalPhoneNumber,otp)
                const response = await fetch(`${API_URL}customer/setting/updatephone`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('token')}`
                    },
                    
                    body: JSON.stringify({ phone: modalPhoneNumber, otp })
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    fetchData();
                    setResendTimer(120);
                    setIsResendDisabled(true);
                    handleClosePhoneotp();
                    handleShowsuccessphone();
                } else {
                    setOtpErrorMessage(result.message || 'Failed to verify OTP');
                }
            } catch (error) {
                console.error('Error:', error);
                setOtpErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    const handleResendOtp = async (e) => {
        e.preventDefault();
        if (resendTimer === 0) {
            try {
                const response = await fetch(`${API_URL}customer/setting/updatephone/otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('token')}`
                    },
                    body: JSON.stringify({ phone: modalPhoneNumber })
                });

                const result = await response.json();
                if (response.ok) {
                  
                    setResendTimer(120); 
                    setIsResendDisabled(true); 
                } else {
                    seterrorMessagephone(result.message || 'Failed to send OTP');
                }
            } catch (error) {
                console.error('Error:', error);
                setOtpErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <Modal show={showUserPhoneotp} centered>
            <Modal.Header>
                <Modal.Title>Verify Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmitOtp} className=''>
                    <Container className='entercode-content' style={{ marginBottom: "100px" }}>
                        <div>
                            <Form.Group controlId="formCode" className='entercode-form-group'>
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                    <Form.Control
                                        className={`entercode-input ${otpErrorMessage ? 'error' : ''}`}
                                        type="text"
                                        ref={otpCode1ref}
                                        placeholder=""
                                        value={otpCode1}
                                        onChange={(e) => handleCodeChange(e, setOtpCode1, otpCode2ref)}
                                        onKeyDown={(e) => handleKeyDown(e, null)}
                                        style={{ flex: 1 }}
                                    />
                                    <Form.Control
                                        className={`entercode-input ${otpErrorMessage ? 'error' : ''}`}
                                        type="text"
                                        ref={otpCode2ref}
                                        placeholder=""
                                        value={otpCode2}
                                        onChange={(e) => handleCodeChange(e, setOtpCode2, otpCode3ref)}
                                        onKeyDown={(e) => handleKeyDown(e, otpCode1ref)}
                                        style={{ flex: 1, marginLeft: '10px' }}
                                    />
                                    <Form.Control
                                        className={`entercode-input ${otpErrorMessage ? 'error' : ''}`}
                                        type="text"
                                        ref={otpCode3ref}
                                        placeholder=""
                                        value={otpCode3}
                                        onChange={(e) => handleCodeChange(e, setOtpCode3, otpCode4ref)}
                                        onKeyDown={(e) => handleKeyDown(e, otpCode2ref)}
                                        style={{ flex: 1, marginLeft: '10px' }}
                                    />
                                    <Form.Control
                                        className={`entercode-input ${otpErrorMessage ? 'error' : ''}`}
                                        type="text"
                                        ref={otpCode4ref}
                                        placeholder=""
                                        value={otpCode4}
                                        onChange={(e) => handleCodeChange(e, setOtpCode4, null)}
                                        onKeyDown={(e) => handleKeyDown(e, otpCode3ref)}
                                        style={{ flex: 1, marginLeft: '10px' }}
                                    />
                                </div>
                                {otpErrorMessage && <Form.Text className="text-danger error-message">{otpErrorMessage}</Form.Text>}
                            </Form.Group>
                            <div className='resend-timer'>
                                <a href='' onClick={handleResendOtp} disabled={isResendDisabled}>Resend code</a>
                                <span>{formatTime(resendTimer)}</span>
                            </div>
                        </div>
                    </Container>
                    <Button variant="outline-danger" className="btn-cancel" onClick={handleClosePhoneotp}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="btn-save" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default VerifyPhoneModal;
