import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup-verifyphone.css';

import logo2 from "../assets/images/logo2.png";

import blank from "../assets/images/blank.png";
import google from "../assets/images/google 1.jpg";
import mail  from "../assets/images/Gmail.jpg";
import Flag from 'react-world-flags';
import { Container, Image, Form, Button, Dropdown } from 'react-bootstrap';
import responsivebg from "../assets/images/responsive-bg.png";

const countries = [
   { code: 'US', name: 'United States', dialCode: '+1' },
   { code: 'CA', name: 'Canada', dialCode: '+1' },
   { code: 'IN', name: 'India', dialCode: '+91' },
   { code: 'AU', name: 'Australia', dialCode: '+036' },

  
];



export const SignupPhone = () => {



   const [selectedCountry, setSelectedCountry] = useState('CA'); 
   const [phoneNumber, setPhoneNumber] = useState('');
   const [selectedCountryInfo, setSelectedCountryInfo] = useState(countries.find(country => country.code === 'CA'));

   const handleCountrySelect = (countryCode) => {
      setSelectedCountry(countryCode);
      const countryInfo = countries.find(country => country.code === countryCode);
      setSelectedCountryInfo(countryInfo);
      setPhoneNumber(countryInfo.dialCode);
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
   {/* <Image src={responsivebg}></Image> */}
 </div>

    
      <Container className='signupphone-main'>
      <Container className='signupphone-content'>
         <Container className='logo-progressbar1'>
            <Image src={logo2} className='signup-logo' alt="Logo" style={{ backgroundColor: 'transparent', }} />
            <div className='track-btn1'>
               <div></div>
            </div>
         </Container>
         <Container className='verify-phone-text'>
            {/* <p>Verify your Phone</p>
            <p>By verifying your phone number, you’re helping us build a trusted and secure community</p> */
            <Image src={blank}></Image>
            }
         </Container>
         <Container className='verify-phone-details'>
            <Form onSubmit={handleSubmit} className='verify-phone-form'>
               <Form.Group controlId="formPhoneNumber" className='verify-form-group'>
                  <Form.Label className='num-verify-lable'> What's your phone number?</Form.Label>
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '' }}>
                     <Dropdown>
                        <Dropdown.Toggle as="div" id="dropdown-basic" className='flag-box' style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                           <Flag code={selectedCountry} style={{ width: '34px', height: '25px', marginRight: '10px' }} className='flag' />
                           <span>{selectedCountryInfo.code}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='flag-menu'>
                           {countries.map((country) => (
                              <Dropdown.Item key={country.code} onClick={() => handleCountrySelect(country.code)} className='flag-item'>
                                 <Flag code={country.code} style={{ width: '24px', height: '18px', marginRight: '10px' }} />
                                 {country.code}


                              </Dropdown.Item>
                           ))}
                        </Dropdown.Menu>
                     </Dropdown>
                     <Form.Control className={`num-verify-input ${errorMessage ? 'error':''}`}
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
         </Container>


         <Container className='or-option'>
            <Container className='or-line'>
               <div className='line'></div>
               <span>or</span>
               <div className='line'></div>
            </Container>
            <p>Already have an account? <a href='/SignIn' className='signup-signin' style={{ color: '#4E1173' }}>Sign in here</a></p>
            {/* <Container className='google-mail'>
               <a href=''> <Image src={google}></Image>Sign Up using Google</a>
               <a href=''> <Image src={mail}></Image></a>
               
            </Container> */}
            <p>By continuing you accept our <br/><a  className="signup-links " targrt="_blank" href="/PrivacyPolicy">Privacy Policy</a> and <a className="signup-links " targrt="_blank" href='/Tnc'>Terms of Use</a></p>

         </Container>
         </Container>
      </Container>
      </div>
   );

}