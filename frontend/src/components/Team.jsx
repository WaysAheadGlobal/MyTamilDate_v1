import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Team.css';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import st1 from '../assets/images/st1.png'
import st2 from '../assets/images/st2.png'
import st3 from '../assets/images/st3.png'

export const Team = () => {
    return (
        <>


            <Container fluid className='main-team'>
                <div className='team-text'>
                    <div className='team-title'>
                        
                       
                    </div>
                    <span className='team-heading' >Get Acquainted with the Passionate Individuals Dedicated to Enhancing Your Smart Energy Experience.</span>
                </div>
                <Container className='team-content'>
                <Row  fluid className="team-row">
                        <Col fluid className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st1} />
                                <div className="team-detail">
                                    <span className='person-title'>Co-founder</span>
                                    <span className='person-name'>Stewart Karry</span>
                                </div>
                            </div>
                        </Col>
                        <Col className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st2} />
                                <div className="team-detail">
                                    <span className='person-title'>Co-founder</span>
                                    <span className='person-name'>Tim Koulee</span>
                                </div>
                            </div>
                        </Col>
                        <Col className="team-col" xs={12} md={3}>
                            <div className="team-item">
                                <Image fluid className='team-image' src={st3} />
                                <div className="team-detail">
                                    <span className='person-title'>CEO</span>
                                    <span className='person-name'>Toupe Walman</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container> 






















        </>
    );
}
