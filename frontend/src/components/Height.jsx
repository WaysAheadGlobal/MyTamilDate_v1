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


const height = [
    "5'9\" (175 cm)",
    "5'10\" (177 cm)",
    "5'11\" (180 cm)",
    "6'0\" (182 cm)",
    "6'1\" (185 cm)",
    "6'2\" (187 cm)",
]

export default function Height() {
    const navigate = useNavigate();
    const { getCookie } = useCookies();
    const [selectedHeight, setSelectedHeight] = useState(null);

    /* useEffect(() => {
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
                /* if (data.country && data.location_string) {
                    setSelectedCountry(countryOptions.find(country => country.label === data.country));
                    setSelectedCity({ value: data.location_string, label: data.location_string });
                    const foundCity = cityOptions[data.country].find(city => city.label === data.location_string);
                    setSelectedCity(foundCity);
                }
            })
            .catch(error => console.error('Error fetching location:', error));
    }, []); */

    const handleHeightSelect = (height) => {
        setSelectedHeight(height);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Selected Height:', selectedHeight);

        // Make POST request to save location
        fetch(`${API_URL}/customer/users/height`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },

            body: JSON.stringify({
                height: selectedHeight,
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
                        <p>How tall are you?</p>
                    </Container>
                    <Container className='located-details'>
                        <Container className='located-country' style={{
                            overflow: 'hidden',
                        }}>
                            <input type="text" value={selectedHeight} readOnly style={{
                                paddingInline: '0.5rem',
                                paddingBlock: '0.75rem',
                                width: '100%',
                                border: "none",
                                fontSize: "large"
                            }} />
                            <div className='scroll-container-vertical' style={{
                                height: '13rem',
                                maxHeight: '13rem',
                            }}>
                                {height.map((height) => (
                                    <div
                                        key={height}
                                        className={`scroll-item ${selectedHeight === height ? 'selected' : ''}`}
                                        onClick={() => handleHeightSelect(height)}
                                    >
                                        {height}
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </Container>
                    <Button variant="primary" type="submit" className='located-nxt-btn' onClick={handleSubmit}>
                        Next
                    </Button>
                </Container>
            </Container>
        </div>
    );
};
