import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './basic-details.css';
import { useNavigate } from 'react-router-dom';
import { Container, Image, Form, Button } from 'react-bootstrap';
import { useAppContext } from '../Context/UseContext';
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import calender from "../assets/images/calender.jpg";
import responsivebg from "../assets/images/responsive-bg.png";
import basicdetails from "../assets/images/basic-details.png";
import { useCookies } from '../hooks/useCookies';
import { API_URL } from '../api';

export const BasicDetails = () => {
  const { getCookie } = useCookies();
  const { userDetails, setUserDetails } = useAppContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [age, setAge] = useState(null);
  const navigate = useNavigate();
  const token = getCookie('token');

  useEffect(() => {
    // Fetch user profile details on mount
    fetch(`${API_URL}/customer/users/namedetails`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setUserDetails(data);
        if (data.birthday) {
          calculateAge(data.birthday);
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, [setUserDetails]);

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

  const handleBirthdayChange = (e) => {
    const value = e.target.value;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      birthday: value
    }));
    calculateAge(value);
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userDetails.first_name.trim() === '') {
      setErrorMessage('*Please fill in all required fields');
      return;
    }

    fetch(`${API_URL}/customer/users/namedetails`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userDetails)
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {

          setErrorMessage(data.errors.map(error => error.msg).join(', '));
        } else {
          setErrorMessage('');
          // alert('Profile updated successfully');
          console.log(data);
          navigate("/abtyourself");
        }
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        setErrorMessage('An error occurred while updating your profile.');
      });
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
                    value={userDetails.first_name || ''}
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
                    value={userDetails.last_name || ''}
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
                    type="date"
                    placeholder="Day / Month / Year"
                    value={userDetails.birthday || ''}
                    onChange={handleBirthdayChange}
                    style={{ flex: 1 }}
                  />
                  <div className="birthday-div">
                    
                  </div>
                </div>
                {age !== null && age !== 54 && <span className='calculated-age'>Your age is {age}</span>}
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
