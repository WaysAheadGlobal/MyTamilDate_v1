import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './unsubscribeEmail.css'; 
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const UnsubscribeComponent = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();
    const handleUnsubscribe = () => {
        // Add your logic to unsubscribe here
        alert(`Unsubscribed from: ${selectedOption}`);
        navigate("/accoutsetting");
    };

    return (

        <div className='un-subscribe-container'>

            <Container className='desktop-left-side'>

                <h1>erere</h1>
            </Container>

               <Container>

 
             <div className="unsubscribe-container">
            <div className="unsubscribe-title">
                Please select the e-mails you’d like to turn off
            </div>
            <div className="unsubscribe-subtitle">
                Manage your email settings on myTamilDate. Pick what types of email you want to receive and their frequency.
            </div>
            <Form>
                <div className="unsubscribe-options">
                    <Form.Check
                        type="radio"
                        label="Likes unsubscribe"
                        name="unsubscribe"
                        id="unsubscribe1"
                        className="unsubscribe-option"
                        onChange={() => setSelectedOption('Likes unsubscribe')}
                    />
                    <Form.Check
                        type="radio"
                        label="Matches unsubscribe"
                        name="unsubscribe"
                        id="unsubscribe2"
                        className="unsubscribe-option"
                        onChange={() => setSelectedOption('Matches unsubscribe')}
                    />
                    <Form.Check
                        type="radio"
                        label="Messages unsubscribe"
                        name="unsubscribe"
                        id="unsubscribe3"
                        className="unsubscribe-option"
                        onChange={() => setSelectedOption('Messages unsubscribe')}
                    />
                    <Form.Check
                        type="radio"
                        label="Weekly summaries unsubscribe"
                        name="unsubscribe"
                        id="unsubscribe4"
                        className="unsubscribe-option"
                        onChange={() => setSelectedOption('Weekly summaries unsubscribe')}
                    />
                    <Form.Check
                        type="radio"
                        label="Special offers and promotions"
                        name="unsubscribe"
                        id="unsubscribe5"
                        className="unsubscribe-option"
                        onChange={() => setSelectedOption('Special offers and promotions')}
                    />
                </div>
                <div className="unsubscribe-note">
                    Please note that if your MTD account is active, you may still receive important maintenance, admin & legal email notifications from us to keep you informed.
                </div>
                <Button variant="primary" className="btn-unsubscribe" onClick={handleUnsubscribe}>
                    Unsubscribe
                </Button>
            </Form>
            </div>
        </Container>

        <Container className='desktop-Right-side'>

                <h1>erere</h1>
            </Container>

            </div>
    );
};

export default UnsubscribeComponent;
