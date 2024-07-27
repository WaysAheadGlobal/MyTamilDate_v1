import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup-verifyphone.css';
import { useNavigate } from 'react-router-dom';
import logo2 from "../assets/images/logo2.png";
import blank from "../assets/images/blank.png";
import responsivebg from "../assets/images/responsive-bg.png";
import Flag from 'react-world-flags';
import backarrow from "../assets/images/backarrow.jpg";
import { Container, Image, Form, Button, Dropdown, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { useAppContext } from '../Context/UseContext';
import { useCookies } from '../hooks/useCookies';
import { API_URL } from '../api';
import { countries } from "country-list-json";

export const SignupPhone = () => {
    const navigate = useNavigate();
    const { phoneNumber, setPhoneNumber, } = useAppContext();
    const [selectedCountry, setSelectedCountry] = useState('CA');
    const [selectedCountryInfo, setSelectedCountryInfo] = useState(countries.find(country => country.code === 'CA'));
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setCookie } = useCookies();

    const searchInputRef = useRef(null); // Reference for the search input

    const handleCountrySelect = (countryCode) => {
        setSelectedCountry(countryCode);
        const countryInfo = countries.find(country => country.code === countryCode);
        setSelectedCountryInfo(countryInfo);
        setPhoneNumber('');
        toggleModal();
    };

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dial_code.includes(searchTerm)
    );

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumber(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const completePhoneNumber = selectedCountryInfo.dial_code + phoneNumber;
        if (phoneNumber.length === 0) {
            setErrorMessage('*Phone is required');
        } 
        else {
            setErrorMessage('');
            try {
                const response = await fetch(`${API_URL}/user/signup/otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: completePhoneNumber,
                    }),
                });

                const result = await response.json();
                if (response.ok) {
                    
                    setCookie('phoneNumber', completePhoneNumber, 7);
                    navigate("/entercode");
                } else {
                    setErrorMessage(result.message || 'Failed to send OTP');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    useEffect(() => {
        if (showModal) {
            searchInputRef.current.focus(); 
        }
    }, [showModal]);
    

    return (
        <div className='signupphone-container'>
            <div className='signup-phone-bg'>
                <Image className='responsive-bg' src={responsivebg}></Image>
            </div>
            <Container className='signupphone-main'>
                <Container className='signupphone-content'>
                    <Container className='logo-progressbar1'>
                        <Container className='logo-arrow1'>
                            <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
                            <Image src={logo2} alt="Logo" className='logo1' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                        <div className='track-btn1'>
                            <div></div>
                        </div>
                    </Container>
                    <Container className='verify-phone-text'>
                        <Image src={blank} />
                    </Container>
                    <Container className='verify-phone-details'>
                        <Form onSubmit={handleSubmit} className='verify-phone-form'>
                            <Form.Group controlId="formPhoneNumber" className='verify-form-group'>
                                <Form.Label className='num-verify-lable'> What's your phone number?</Form.Label>
                                <div  style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <Dropdown  >
                                        <div id="dropdown-basic"  onClick={() => setShowModal(true)} className='flag-box' style={{
                                        borderColor  : errorMessage ? "red" : "",
                                    }}>
                                            <Flag code={selectedCountry} style={{ width: '34px', height: '25px', marginRight: '10px' }} className='flag' />
                                            <span>{selectedCountryInfo.dial_code}</span>
                                        </div>
                                    </Dropdown>
                                    <Form.Control
                                        className={`num-verify-input ${errorMessage ? 'error' : ''}`}
                                        type="text"
                                        placeholder="(xxx)xxx-xxx"
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        
                                        style={{ flex: 1, marginLeft: '10px' }}
                                    />
                                </div>
                                <div  style={{marginTop : "5px"}}>

                                {errorMessage && <Form.Text style={{marginTop : "10px"}} className="text-danger error-message">{errorMessage}</Form.Text>}
                                </div>
                            </Form.Group>
                            <button  type="submit" className='global-next-btn'>
                                Next
                            </button>
                        </Form>
                        <Container className='or-option'>
                            <Container className='or-line'>
                                <div className='line'></div>
                                <span>or</span>
                                <div className='line'></div>
                            </Container>
                            <p style={{
                                fontWeight: '600',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '14px',
                            }}>Already have an account? <a href='/signinoptions' className='signup-signin'>Sign in here</a></p>
                            <p style={{
                                fontWeight: '600',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '14px',
                            }}>By continuing you accept our <br /><a className="signup-links" href="/PrivacyPolicy">Privacy Policy</a> and <a className="signup-links" target="_blank" href='/Tnc'>Terms of Use</a></p>
                        </Container>
                    </Container>
                </Container>
            </Container>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered                
            >
                <Modal.Body style={{
                    maxHeight: "500px",
                    overflowY: "auto",
                    width: "100%",
                }}>
                    <InputGroup className="mb-3" style={{
                        position: 'sticky',
                        top: '0',
                        width: '100%',
                    }}>
                        <FormControl
                            placeholder="Search Country"
                            aria-label="Search Country"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            ref={searchInputRef} // Set reference for the input field
                        />
                    </InputGroup>
                    {filteredCountries.map((country) => (
                        <div key={country.code} className='flag-item' onClick={() => handleCountrySelect(country.code)}>
                            <Flag code={country.code} style={{ width: '24px', height: '18px', marginRight: '10px' }} />
                            {country.name} ({country.dial_code})
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    );
};
