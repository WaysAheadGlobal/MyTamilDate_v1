import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './basic-details.css';
import { useNavigate } from 'react-router-dom';
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import google from "../assets/images/google 1.jpg";
import mail from "../assets/images/Gmail.jpg";
import calender from "../assets/images/calender.jpg";
import responsivebg from "../assets/images/responsive-bg.png";
import basicdetails from "../assets/images/basic-details.png";

import { Container, Image, Form, Button, } from 'react-bootstrap';

export const BasicDetails = () => {

   const navigate = useNavigate();
   const goToAboutYour = () => {
       navigate("/abtyourself");
     };



   const [yourName, setYourName] = useState('');
   const [yourLastName, setYourLastName] = useState('');
   const [email, setEmail] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [showInfo, setShowInfo] = useState(false);

   const handleNameChange = (e) => {
      setYourName(e.target.value);
   };

   const handleLastNameChange = (e) => {
      setYourLastName(e.target.value);
   };

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      // Simple validation for demonstration purposes
      if (yourName.trim() === '' || email.trim() === '') {
         setErrorMessage('*Please fill in all required fields');
      } else {
         setErrorMessage('');
         alert(`Form submitted successfully: \nName: ${yourName} \nLast Name: ${yourLastName} \nEmail: ${email}`);
      }
   };
   const toggleInfoVisibility = () => {
      setShowInfo(!showInfo);
   };





   return (
      <div className='basicdetails-container'>
         <div className='basic-details-bg'>
            <Image className='responsive-bg' src={responsivebg}></Image>
         </div>
         <Container className='basicdetails-main'>
            <Container className='basicdetails-content'>

               <Container className='logo-progressbar4'>

                  <Container className='logo-arrow4'>
                     <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
                     <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                  </Container>
                  <div className='track-btn4'>
                     <div></div>
                  </div>
               </Container>
               <Container className='basic-details-text'>
                  <Image className='basic-detail-icon' src={basicdetails}></Image>
                  <p>Tell us about yourself</p>

               </Container>
               <Container className='basic-details-details'>
                  <Form onSubmit={handleSubmit} className='basic-details-form'>
                     <Form.Group controlId="formName" className='basic-details-group'>
                        <Form.Label className='basic-details-label'>What's your name?</Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                           <Form.Control
                              className={`basic-details-input custom-input ${errorMessage ? 'error' : ''}`}
                              type="text"
                              placeholder="First name"
                              value={yourName}
                              onChange={handleNameChange}
                              style={{ flex: 1, }}
                           />
                        </div>
                        {/* {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>} */}
                     </Form.Group>

                     <Form.Group controlId="formName" className='basic-details-group purplebox'>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>

                           <Form.Control
                              className="basic-details-input-verify custom-input"
                              type="text"
                              placeholder="Last name (Optional)"
                              value={yourLastName}
                              onChange={handleLastNameChange}
                              style={{ flex: 1, marginTop: '12px', marginBottom: '24px' }}
                           />
                           <div className="last-name-why-div">
                              <Button className='last-name-why' onClick={toggleInfoVisibility} >
                                 ?
                              </Button>

                           </div>


                        </div>
                        <Container className={`why-info ${showInfo ? '' : 'why-info-hidden'}`}>
                           <span>Why last name?</span>
                           <p>It helps us to build trusted and authentic community
                              for you and others.
                              Only your first name is shown publicly.</p>
                        </Container>
                     </Form.Group>




                     {/* <Form.Group controlId="formEmail" className='basic-details-group' style={{ marginTop: '24px' }}>
                     <Form.Label className='basic-details-label'>Enter your Email *</Form.Label>
                     <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '' }}>
                        <Form.Control
                           className={`basic-details-input-verify custom-input ${errorMessage ? 'error' : ''}`}
                           type="email"
                           placeholder="Example@gmail.com"
                           value={email}
                           onChange={handleEmailChange}
                           style={{ flex: 1 }}

                        />
                          <div className={`verify-btn-div ${errorMessage ? 'error' : ''}`}>
                     <button  className='verify-btn'>
                        Verify
                     </button>
                  </div>

                     </div>
                     {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>}
                  </Form.Group> */}
                     <Form.Group controlId="formbday" className='basic-details-group'>
                        <Form.Label className='basic-details-label'>When is Your Birthday? </Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                           <Form.Control
                              className={`basic-details-input-verify custom-input ${errorMessage ? 'error' : ''}`}
                              type="text"
                              placeholder="Day / Month / Year"
                              value=""
                              style={{ flex: 1 }}
                           />
                           <div className="birthday-div">
                              {/* Open modal when button is clicked */}
                              <Button className='calender-btn custom-button'><Image src={calender} /></Button>
                           </div>
                        </div>
                        <span className='calculated-age'>Your age will be displayed as 24</span>
                        {/* {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>} */}
                     </Form.Group>

                     <Button variant="primary" type="submit" onClick={goToAboutYour} className='basic-details-btn'>
                        Next
                     </Button>

                  </Form>
                  {/* <Button variant="primary" type="submit" className='basic-details-btn'>
                        Next
                     </Button> */}
               </Container>

               {/* <Container className='or-option'>
                        <Container className='or-line'>
                           <div className='line'></div>
                           <span>or</span>
                           <div className='line'></div>
                        </Container>
                        <p>Already have an account? <a href='' style={{ color: '#9663BF' }}>Sign in here</a></p>
                        <Container className='google-mail'>
                           <a href=''> <Image src={google} alt="Google" />Sign Up using Google</a>
                           <a href=''> <Image src={mail} alt="Mail" /></a>
                        </Container>
                     </Container> */}
            </Container>

         </Container>




      </div>
   );
}

