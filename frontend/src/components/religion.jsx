import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './religion.css';
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import { Container, Image, Button } from 'react-bootstrap';
import responsivebg from "../assets/images/responsive-bg.png";
import religionIcon from "../assets/images/religion.png";
import langIcon from "../assets/images/lang.png";
import { useNavigate } from 'react-router-dom';
import { useCookies } from '../hooks/useCookies';
import { API_URL } from '../api';

const religions = [
    'Hindu', 'Catholic', 'Christian', 'Buddhist', 'Muslim', 'Jewish', 'Spiritual', 'Other', 'Prefer not to say'
];

const languages = [
    'Hindi', 'English',  'Tamil', 'German', 'Danish', 'French'
];

export const Religion = () => {
    const { getCookie } = useCookies();
    const [allReligions, setAllReligions] = useState([]);
    const [selectedReligion, setSelectedReligion] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/customer/users/religions`,{
            method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`
                },
        })
            .then(response => response.json())
            .then(data => {
                setAllReligions(data.religions);
                if (data.userReligion) {
                    setSelectedReligion(data.userReligion.name);
                }
            })
            .catch(error => {
                console.error('Error fetching religions:', error);
            });
    }, []);

    const handleReligionClick = (e) => {
        e.preventDefault();

        const religionId = allReligions.find(r => r.name === selectedReligion)?.id;

        if (religionId) {
            fetch(`${API_URL}/customer/users/religions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`
                },
                body: JSON.stringify({ religionId }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Religion updated successfully:', data);
                    navigate("/edu");
                })
                .catch(error => {
                    console.error('Error updating religion:', error);
                });
        }
    };

    return (
        <div className='religion-container'>
            <div className='religion-bg'>
                <Image className='responsive-bg' src={responsivebg}></Image>
            </div>
            <Container className='religion-main'>
                <Container className='religion-content'>
                    <Container className='logo-progressbar8'>
                        <Container className='logo-arrow8'>
                            <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
                            <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                        <div className='track-btn8'>
                            <div></div>
                        </div>
                    </Container>
                    <Container className='religion-details'>
                        <div className='your-religion'>
                            <Container className='religion-text'>
                                <Image className='about-yourself-icon' src={religionIcon}></Image>
                                <p>What is your religion?</p>
                            </Container>
                            <Container className='all-religion'>
                                {religions.map((religion, index) => (
                                    <div
                                        key={index}
                                        className={`religion-item ${selectedReligion === religion ? 'active' : ''}`}
                                        onClick={() => setSelectedReligion(religion)}
                                    >
                                        {religion}
                                    </div>
                                ))}
                            </Container>
                        </div>
                        <div className='your-lang'>
                            <Container className='religion-text'>
                                <Image className='about-yourself-icon' src={langIcon}></Image>
                                <p>What is your preferred language?</p>
                            </Container>
                            <Container className='all-lang'>
                                {languages.map((language, index) => (
                                    <div
                                        key={index}
                                        className={`lang-item ${selectedLanguage === language ? 'active' : ''}`}
                                        onClick={() => setSelectedLanguage(language)}
                                    >
                                        {language}
                                    </div>
                                ))}
                            </Container>
                        </div>
                    </Container>
                    <Button variant="primary" type="submit" className='religion-nxt-btn' onClick={handleReligionClick}>
                        Next
                    </Button>
                </Container>
            </Container>
        </div>
    );
};
