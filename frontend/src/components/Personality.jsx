import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Form, Image, InputGroup } from 'react-bootstrap';
import logo from "../assets/images/MTDlogo.png";
import backarrow from "../assets/images/backarrow.jpg";
import responsivebg from "../assets/images/responsive-bg.png";
import './job-title.css';

import { IoIosSearch } from "react-icons/io";
import { API_URL } from '../api';
import { useCookies } from '../hooks/useCookies';
import { useNavigate } from 'react-router-dom';

export default function Personality() {
    const [searchTerm, setSearchTerm] = useState('');
    const personalityListEndRef = useRef(null);
    const [hasAddedPersonality, setHasAddedPersonality] = useState(false);
    const [personalities, setPersonalities] = useState([]);
    const { getCookie } = useCookies();
    const [selectedPersonalities, setSelectedPersonalities] = useState([]);
    const navigate = useNavigate();

    const filteredPersonality = personalities.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));


    useEffect(() => {
        // Fetch existing location data on component mount
        fetch(`${API_URL}/customer/users/personality-options`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.personalities) {
                    setPersonalities(data.personalities);
                }
            })
            .catch(error => console.error('Error fetching location:', error));
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/customer/users/personalities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.personalities) {
                    console.log(data.personalities.map(p => p.name))
                    setSelectedPersonalities(data.personalities);
                }
            })
            .catch(error => console.error('Error fetching location:', error));
    }, [personalities]);

    useEffect(() => {
        if (hasAddedPersonality && personalityListEndRef.current) {
            personalityListEndRef.current.scrollIntoView({ behavior: 'smooth' });
            setHasAddedPersonality(false);
        }
    }, [hasAddedPersonality]);

    async function savePersonalities() {
        if (selectedPersonalities.length < 2 || selectedPersonalities.length > 8  ) {
            // Handle the case where there are fewer than 2 personalities selected
            return;
        }

        const response = await fetch(`${API_URL}/customer/users/personality`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify({ personalities: selectedPersonalities.map(p => p.id) }),
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            navigate("/profile-answers");
        } else {
            alert(data.message);
        }
    }

    return (
        <div className='job-container'>
            <div className='job-bg'>
                <Image className='responsive-bg' src={responsivebg} alt="Background"></Image>
            </div>
            <Container className='job-main'>
                <Container className='job-content'>
                    <Container className='logo-progressbar10'>
                        <Container className='logo-arrow10'>
                            <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} alt="Back Arrow" />
                            <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                        <div className='track-btn10'>
                            <div></div>
                        </div>
                    </Container>
                    <Container className='job-details'>
                        <div className='your-job'>
                            <Container className='job-text'>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="18" fill="url(#paint0_linear_778_6762)" />
                                    <path d="M17.3634 17.0496C17.328 16.3133 17.5856 15.5929 18.0798 15.046C18.574 14.499 19.2647 14.17 20.0009 14.1309C20.737 14.17 21.4277 14.499 21.922 15.046C22.4162 15.5929 22.6738 16.3133 22.6384 17.0496C22.6726 17.785 22.4144 18.5041 21.9202 19.0498C21.4261 19.5955 20.7361 19.9235 20.0009 19.9621C19.2657 19.9235 18.5757 19.5955 18.0815 19.0498C17.5874 18.5041 17.3292 17.785 17.3634 17.0496ZM28.7759 19.9996C28.7785 21.7416 28.2582 23.4443 27.2821 24.8871C27.2566 24.9312 27.2273 24.973 27.1946 25.0121C26.3882 26.1733 25.3127 27.122 24.06 27.7772C22.8073 28.4324 21.4146 28.7746 20.0009 28.7746C18.5872 28.7746 17.1945 28.4324 15.9417 27.7772C14.689 27.122 13.6135 26.1733 12.8071 25.0121C12.7745 24.973 12.7452 24.9312 12.7196 24.8871C11.9556 23.749 11.4688 22.4477 11.2985 21.0876C11.1281 19.7274 11.2789 18.3463 11.7386 17.0549C12.1984 15.7635 12.9544 14.5979 13.946 13.6514C14.9376 12.7049 16.1371 12.004 17.4485 11.6048C18.7599 11.2056 20.1466 11.1193 21.4973 11.3528C22.8481 11.5862 24.1253 12.133 25.2266 12.9492C26.3279 13.7654 27.2226 14.8283 27.839 16.0527C28.4554 17.2771 28.7762 18.6289 28.7759 19.9996ZM12.1634 19.9996C12.161 21.3312 12.4988 22.6414 13.1446 23.8059C14.5009 22.0246 17.1009 20.9121 20.0009 20.9121C22.9009 20.9121 25.5009 22.0246 26.8571 23.8059C27.4379 22.7595 27.7714 21.594 27.8321 20.3987C27.8927 19.2035 27.6789 18.0102 27.207 16.9104C26.7351 15.8105 26.0176 14.8334 25.1096 14.0537C24.2016 13.2741 23.1271 12.7127 21.9686 12.4126C20.81 12.1125 19.5981 12.0816 18.4258 12.3224C17.2535 12.5631 16.1518 13.0691 15.2053 13.8015C14.2588 14.5339 13.4925 15.4733 12.9652 16.5476C12.438 17.622 12.1637 18.8028 12.1634 19.9996Z" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear_778_6762" x1="21.4492" y1="0.5" x2="21.4491" y2="41.75" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FC8C66" />
                                            <stop offset="1" stopColor="#F76A7B" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <p>How would you describe your personality?</p>
                            </Container>
                            <InputGroup className='job-search-bar' style={{
                                overflow: "hidden",
                            }}>
                               
                                <Form.Control
                                    className='job-search'
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    style={{
                                        border: "none",
                                        outline: "none",
                                        height: "100%"
                                    }}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <InputGroup.Text className='search-icon' style={{
                                    position: "relative",
                                    top: "0rem",
                                }}><IoIosSearch /></InputGroup.Text>
                            </InputGroup>
                  <div>
                  {selectedPersonalities.length < 3 || selectedPersonalities.length > 8 ? (
                <p style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#4E1173",
                    lineHeight: "18.5%",
                    marginBottom: "20px"
                }}>Select 3-8 options</p>
            ) : null}
                  </div>
                          
                            <div style={{
                                maxHeight: "50vh",
                                overflow: "auto",
                            }}>
                                <div className="job-columns">
                                    {filteredPersonality.map((personality, index) => (
                                        <div
                                            key={index}
                                            className='job-item'
                                            onClick={() => {
                                                if (selectedPersonalities.find(p => p.name === personality.name)) {
                                                    setSelectedPersonalities(selectedPersonalities.filter(p => p !== personality));
                                                } else {
                                                    setSelectedPersonalities([...selectedPersonalities, personality]);
                                                }
                                            }}
                                            style={{
                                                backgroundColor: selectedPersonalities.find(p => p.name === personality.name) ? "#F7ECFF" : "transparent",
                                            }}
                                        >
                                            {personality.name}
                                        </div>
                                    ))}
                                    <div ref={personalityListEndRef} />
                                </div>
                            </div>
                        </div>
                    </Container>
                    <Button variant="primary" onClick={savePersonalities} type="submit" className='job-nxt-btn'>
                        Next
                    </Button>
                </Container>
            </Container>
        </div>
    );
};



