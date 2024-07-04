import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './located.css';
import { useNavigate } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import responsivebg from "../assets/images/responsive-bg.png";
import location from "../assets/images/location.png";
import { useCookies } from '../hooks/useCookies';
import { API_URL } from '../api';


export const Located = () => {
  const navigate = useNavigate();
  const { getCookie } = useCookies();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_URL}/customer/users/location-options`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`
        },
      });
      const data = await response.json();
      console.log(data);
      setOptions(data);
      setCountryOptions(Object.keys(data));
    })()
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_URL}/customer/users/locations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`
        },
      });
      const data = await response.json();
      console.log(data);
      setSelectedCountry(data.country);
      setSelectedCity(data.id);
    })()
  }, [])

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Country:', selectedCountry);
    console.log('Selected City:', selectedCity);

    // Make POST request to save location
    fetch(`${API_URL}/customer/users/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('token')}`
      },

      body: JSON.stringify({
        location_id: selectedCity,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Location saved:', data);
        navigate("/religion");
      })
      .catch(error => console.error('Error saving location:', error));
  };

  return (
    <div className='located-container'>
      <div className='located-bg'>
        <Image className='responsive-bg' src={responsivebg}></Image>
      </div>
      <Container className='located-main'>
        <Container className='located-content'>
          <Container className='logo-progressbar7'>
            <Container className='logo-arrow7'>
              <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
              <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
            </Container>
            <div className='track-btn7'>
              <div></div>
            </div>
          </Container>
          <Container className='located-text'>
            <Image className='about-yourself-icon' src={location}></Image>
            <p>Where are you located?</p>
          </Container>
          <Container className='located-details'>
            <Container className='located-country'>
              <p>Select a country</p>
              <div className='scroll-container-vertical'>
                {countryOptions.map((country) => (
                  <div
                    key={country}
                    className={`scroll-item ${selectedCountry === country ? 'selected' : ''}`}
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country}
                  </div>
                ))}
              </div>
            </Container>
            {selectedCountry && (
              <Container className='located-city'>
                <p>Select city</p>
                <div className='scroll-container-vertical'>
                  {options[selectedCountry].map((city) => (
                    <div
                      key={city.id}
                      className={`scroll-item ${selectedCity === city.id ? 'selected' : ''}`}
                      onClick={() => handleCitySelect(city.id)}
                    >
                      {city.location_string}
                    </div>
                  ))}
                </div>
              </Container>
            )}
          </Container>
          <Button variant="primary" type="submit" className='located-nxt-btn' onClick={handleSubmit}>
            Next
          </Button>
        </Container>
      </Container>
    </div>
  );
};
