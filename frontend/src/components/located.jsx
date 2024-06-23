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


const countryOptions = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'India', label: 'India' },
  { value: 'Australia', label: 'Australia' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'France', label: 'France' },
  { value: 'Germany', label: 'Germany' },
];

const cityOptions = {
  'United States': [
    { value: 'New York', label: 'New York' },
    { value: 'Los Angeles', label: 'Los Angeles' },
    { value: 'Chicago', label: 'Chicago' },
    // Add more cities as needed
  ],
  'Canada': [
    { value: 'Toronto', label: 'Toronto' },
    { value: 'Vancouver', label: 'Vancouver' },
    { value: 'Montreal', label: 'Montreal' },
    // Add more cities as needed
  ],
  'India': [
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Chennai', label: 'Chennai' },
    // Add more cities as needed
  ],
  'Australia': [
    { value: 'Sydney', label: 'Sydney' },
    { value: 'Melbourne', label: 'Melbourne' },
    { value: 'Brisbane', label: 'Brisbane' },
    // Add more cities as needed
  ],
  'United Kingdom': [
    { value: 'London', label: 'London' },
    { value: 'Manchester', label: 'Manchester' },
    { value: 'Edinburgh', label: 'Edinburgh' },
    // Add more cities as needed
  ],
  'France': [
    { value: 'Paris', label: 'Paris' },
    { value: 'Lyon', label: 'Lyon' },
    { value: 'Marseille', label: 'Marseille' },
    // Add more cities as needed
  ],
  'Germany': [
    { value: 'Berlin', label: 'Berlin' },
    { value: 'Munich', label: 'Munich' },
    { value: 'Frankfurt', label: 'Frankfurt' },
    // Add more cities as needed
  ],
};

export const Located = () => {
  const navigate = useNavigate();
  const { getCookie } = useCookies();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [locationData, setLocationData] = useState({ country: '', location_string: '' });

  useEffect(() => {
    // Fetch existing location data on component mount
    fetch(`${API_URL}/customer/users/locations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('token')}`
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.country && data.location_string) {
          setSelectedCountry(countryOptions.find(country => country.label === data.country));
          setSelectedCity({ value: data.location_string, label: data.location_string });
          const foundCity = cityOptions[data.country].find(city => city.label === data.location_string);
          setSelectedCity(foundCity);
        }
      })
      .catch(error => console.error('Error fetching location:', error));
  }, []);

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
        country: selectedCountry.label,
        location_string: selectedCity.label,
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
                    key={country.value}
                    className={`scroll-item ${selectedCountry === country ? 'selected' : ''}`}
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country.label}
                  </div>
                ))}
              </div>
            </Container>
            {selectedCountry && (
              <Container className='located-city'>
                <p>Select city</p>
                <div className='scroll-container-vertical'>
                  {cityOptions[selectedCountry.value].map((city) => (
                    <div
                      key={city.value}
                      className={`scroll-item ${selectedCity === city ? 'selected' : ''}`}
                      onClick={() => handleCitySelect(city)}
                    >
                      {city.label}
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
