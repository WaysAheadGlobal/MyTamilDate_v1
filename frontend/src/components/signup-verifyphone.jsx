import React, { useState } from 'react';
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



const countries = [
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'CA', name: 'Canada', dialCode: '+1' },
    { code: 'IN', name: 'India', dialCode: '+91' },
    { code: 'AU', name: 'Australia', dialCode: '+36' },
];


export const SignupPhone = () => {
    const navigate = useNavigate();
    const { phoneNumber, setPhoneNumber, } = useAppContext();
    const [selectedCountry, setSelectedCountry] = useState('CA');
    // const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountryInfo, setSelectedCountryInfo] = useState(countries.find(country => country.code === 'CA'));
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setCookie } = useCookies(); 

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
        country.dialCode.includes(searchTerm)
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
        const completePhoneNumber = selectedCountryInfo.dialCode + phoneNumber;
        if (phoneNumber.length === 0) {
            setErrorMessage('Please enter phone number');
        } else if (phoneNumber.length < 10) {
            setErrorMessage('Phone number must be at least 10 digits');
        } else {
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
                    alert(result.message);
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
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <Dropdown>
                                        <div id="dropdown-basic" onClick={() => setShowModal(true)} className='flag-box'>
                                            <Flag code={selectedCountry} style={{ width: '34px', height: '25px', marginRight: '10px' }} className='flag' />
                                            <span>{selectedCountryInfo.dialCode}</span>
                                        </div>
                                    </Dropdown>
                                    <Form.Control
                                        className={`num-verify-input ${errorMessage ? 'error' : ''}`}
                                        type="text"
                                        placeholder="(905)258-2258"
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        style={{ flex: 1, marginLeft: '10px' }}
                                    />
                                </div>
                                {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>}
                            </Form.Group>
                            <Button variant="primary" type="submit" className='verify-phone-btn'>
                                Next
                            </Button>
                        </Form>
                        <Container className='or-option'>
                            <Container className='or-line'>
                                <div className='line'></div>
                                <span>or</span>
                                <div className='line'></div>
                            </Container>
                            <p>Already have an account? <a href='' className='signup-signin'>Sign in here</a></p>
                            <p>By continuing you accept our <br /><a className="signup-links" href="/PrivacyPolicy">Privacy Policy</a> and <a className="signup-links" target="_blank" href='/Tnc'>Terms of Use</a></p>
                        </Container>
                    </Container>
                </Container>
            </Container>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                dialogClassName="custom-modal"
            >
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search Country"
                            aria-label="Search Country"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                    {filteredCountries.map((country) => (
                        <div key={country.code} className='flag-item' onClick={() => handleCountrySelect(country.code)}>
                            <Flag code={country.code} style={{ width: '24px', height: '18px', marginRight: '10px' }} />
                            {country.name} ({country.dialCode})
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    );
};
