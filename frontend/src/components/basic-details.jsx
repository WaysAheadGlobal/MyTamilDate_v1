import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './basic-details.css';
import { useNavigate } from 'react-router-dom';
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import calender from "../assets/images/calender.jpg";
import responsivebg from "../assets/images/responsive-bg.png";
import basicdetails from "../assets/images/basic-details.png";

import { Container, Image, Form, Button } from 'react-bootstrap';
import { useAppContext } from '../Context/UseContext';

export const BasicDetails = () => {
  const { userDetails, setUserDetails } = useAppContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
   const value = e.target.value.replace(/\s/g, '');
    setUserDetails(prevDetails => ({
      ...prevDetails,
      first_name: value
    }));
  };

  const handleLastNameChange = (e) => {
   const value = e.target.value.replace(/\s/g, '');
    setUserDetails(prevDetails => ({
      ...prevDetails,
      last_name: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for demonstration purposes
    if (userDetails.first_name.trim() === '') {
      setErrorMessage('*Please fill in all required fields');
    } else {
      setErrorMessage('');
      alert(`Form submitted successfully: \nName: ${userDetails.first_name} \nLast Name: ${userDetails.last_name}`);
      console.log(userDetails);
      navigate("/abtyourself");
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
                    value={userDetails.first_name}
                    onChange={handleNameChange}
                    style={{ flex: 1 }}
                  />
                </div>
                {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>}
              </Form.Group>

              <Form.Group controlId="formLastName" className='basic-details-group purplebox'>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Form.Control
                    className="basic-details-input-verify custom-input"
                    type="text"
                    placeholder="Last name (Optional)"
                    value={userDetails.last_name}
                    onChange={handleLastNameChange}
                    style={{ flex: 1, marginTop: '12px', marginBottom: '24px' }}
                  />
                  <div className="last-name-why-div">
                    <Button className='last-name-why' onClick={toggleInfoVisibility}>
                      ?
                    </Button>
                  </div>
                </div>
                <Container className={`why-info ${showInfo ? '' : 'why-info-hidden'}`}>
                  <span>Why last name?</span>
                  <p>It helps us to build a trusted and authentic community for you and others. Only your first name is shown publicly.</p>
                </Container>
              </Form.Group>

              <Form.Group controlId="formBirthday" className='basic-details-group'>
                <Form.Label className='basic-details-label'>When is Your Birthday?</Form.Label>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Form.Control
                    className={`basic-details-input-verify custom-input ${errorMessage ? 'error' : ''}`}
                    type="text"
                    placeholder="Day / Month / Year"
                    value={userDetails.birthday}
                    onChange={(e) => setUserDetails(prevDetails => ({
                      ...prevDetails,
                      birthday: e.target.value
                    }))}
                    style={{ flex: 1 }}
                  />
                  <div className="birthday-div">
                    <Button className='calender-btn custom-button'><Image src={calender} /></Button>
                  </div>
                </div>
                <span className='calculated-age'>Your age will be displayed as 24</span>
              </Form.Group>

              <Button variant="primary" type="submit" className='basic-details-btn'>
                Next
              </Button>
            </Form>
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default BasicDetails;
