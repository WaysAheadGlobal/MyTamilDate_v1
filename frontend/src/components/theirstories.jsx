import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theirstories.css';

import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import st1 from '../assets/images/st1.png';
import st2 from '../assets/images/st2.png';
import st3 from '../assets/images/st3.png';

export const TheirStories = () => {
    const navigate = useNavigate();

    const goTomorestories = () => {
        navigate("/SuccessPage");
    };

    return (
        <Container fluid className='story-main'>
            <div className='story-text'>
                <p className='story-heading'>
                    They met their Match on <span style={{ color: '#4E1173' }}>myTamilDate</span>
                </p>
            </div>
            <Container className='story-content'>
                <div className="story-row">
                    <div className="story-col">
                        <div className="story-item">
                            <img className='story-image' src={st1} alt="Madhu & Niya" />
                            <div className="story-detail">
                                <span className='story-name'>Madhu & Niya</span>
                                <span className='story-title'>It was love at first sight for Madhu and Niya...</span>
                                <a href='' className='story-read-more'>Read more</a>
                            </div>
                        </div>
                    </div>
                    <div className="story-col">
                        <div className="story-item">
                            <img className='story-image' src={st2} alt="Abi & John" />
                            <div className="story-detail">
                                <span className='story-name'>Abi & John</span>
                                <span className='story-title'>Abi & John Bonded Over Faith & Connection...</span>
                                <a href='' className='story-read-more'>Read more</a>
                            </div>
                        </div>
                    </div>
                    <div className="story-col">
                        <div className="story-item">
                            <img className='story-image' src={st3} alt="Jenani & Nav" />
                            <div className="story-detail">
                                <span className='story-name'>Jenani & Nav</span>
                                <span className='story-title'>Jenani & Nav Found Each Other At The Right Time...</span>
                                <a href='' className='story-read-more'>Read more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Button className='more-success-btn' onClick={goTomorestories}>More success stories</Button>
        </Container>
    );
};
