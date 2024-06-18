import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.css';
import { useNavigate } from 'react-router-dom';
import logo2 from "../../assets/images/logo2.png";
import blank from "../../assets/images/blank.png";
import responsivebg from "../../assets/images/responsive-bg.png";
import Flag from 'react-world-flags';
import backarrow from "../../assets/images/backarrow.jpg";
import { Container, Image, Form, Button, Dropdown,Modal, InputGroup, FormControl } from 'react-bootstrap';

const countries = [
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'CA', name: 'Canada', dialCode: '+1' },
    { code: 'IN', name: 'India', dialCode: '+91' },
    { code: 'AU', name: 'Australia', dialCode: '+36' },
];

export const SignIn = () => {

    const navigate = useNavigate();
    const goToEnterCode = () => {
        navigate("/signinphoneotp");
      };
      






    const [selectedCountry, setSelectedCountry] = useState('CA');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountryInfo, setSelectedCountryInfo] = useState(countries.find(country => country.code === 'CA'));
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCountrySelect = (countryCode) => {
        setSelectedCountry(countryCode);
        const countryInfo = countries.find(country => country.code === countryCode);
        setSelectedCountryInfo(countryInfo);
        setPhoneNumber(countryInfo.dialCode);
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


    const [errorMessage, setErrorMessage] = useState('');

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            setPhoneNumber(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (phoneNumber.length === 0) {
            setErrorMessage('Please enter phone number');
        } else if (phoneNumber.length < 10) {
            setErrorMessage('Phone number must be at least 10 digits');
        } else {
            setErrorMessage('');
            alert('Form submitted successfully');
        }

        console.log('Country:', selectedCountry);
        console.log('Dial Code:', selectedCountryInfo.dialCode);
        console.log('Phone Number:', phoneNumber);
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
                        {/* <div className='track-btn1'>
                            <div></div>
                        </div> */}
                    </Container>


                    <Container className='verify-phone-text'>
                        <Image src={blank} />
                    </Container>
                    <Container className='verify-phone-details'>
                        <Form onSubmit={handleSubmit} className='verify-phone-form'>
                            <Form.Group controlId="formPhoneNumber" className='verify-form-group'>
                                <Form.Label className='num-verify-lable'> Enter Phone Number</Form.Label>
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', }}>
                                    <Dropdown>
                                        <div id="dropdown-basic" onClick={() => setShowModal(true)} className='flag-box'>
                                            <Flag code={selectedCountry} style={{ width: '34px', height: '25px', marginRight: '10px' }} className='flag' />
                                            <span>{selectedCountryInfo.code}</span>
                                        </div>
                                        {/* <Dropdown.Menu className='flag-menu'>
                                            {countries.map((country) => (
                                                <Dropdown.Item key={country.code} onClick={() => handleCountrySelect(country.code)} className='flag-item'>
                                                    <Flag code={country.code} style={{ width: '24px', height: '18px', marginRight: '10px' }} />
                                                    {country.code}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu> */}
                                    </Dropdown>
                                    <Form.Control className={`num-verify-input ${errorMessage ? 'error' : ''}`}
                                        type="text"
                                        placeholder="(905)258-2258"
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        style={{ flex: 1, marginLeft: '10px' }}
                                    />
                                </div>
                                {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>}
                            </Form.Group>

                       
                            <Button variant="primary" type="submit"  onClick={goToEnterCode} className='verify-phone-btn'>
                                Next
                            </Button>
                        </Form>
{/*                    
                    <Container className='or-option'>
                        <Container className='or-line'>
                            <div className='line'></div>
                            <span>or</span>
                            <div className='line'></div>
                        </Container>
                        <p>New here? Create an account?<a href='./signup' className='signup-signin'>Sign Up</a></p>
                        <p>By continuing you accept our <br /><a className="signup-links" href="/PrivacyPolicy">Privacy Policy</a> and <a className="signup-links" target="_blank" href='/Tnc'>Terms of Use</a></p>
                    </Container> */}
                     </Container>
                   
                </Container>
            </Container>




            <Modal show={showModal} onHide={() => setShowModal(false)}
             centered
                dialogClassName="custom-modal"
            >
                {/* <Modal.Header closeButton>

                </Modal.Header> */}
                
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
