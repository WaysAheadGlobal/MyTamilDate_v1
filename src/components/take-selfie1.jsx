import React, { useState, useRef } from 'react';
import { Container, Image, Button,Modal } from 'react-bootstrap';
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import selfie from "../assets/images/add-selfie.png";
import './take-selfie1.css';
import bgg from "../assets/images/signup-bg.jpg";


















export const Selfie = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));

        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalShow = () => {
        setShowModal(true);
    };
    const [showModal, setShowModal] = useState(false);


   

    return (
        <div className='selfie-container'>
            <div className='selfie-bg'></div>
            <Container className='selfie-main'>
                <Container className='logo-progressbar5'>
                    <Container className='logo-arrow5'>
                        <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
                        <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                    </Container>
                    <div className='track-btn5'>
                        <div></div>
                    </div>
                </Container>
                <Container className='selfie-text'>
                    <p>Take a selfie</p>
                    <p>Please take a quick selfie to verify your identity. <a href='' >Click here</a> to view photo guidelines</p>
                </Container>
                <Container className='selfie-box' onClick={handleClick}>
                {selectedImage ? (<Image className='added-selfie' src={selectedImage} />) : ( <Image className='added-selfie' src={bgg} />)}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {/* {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>} */}
                  
                </Container>


                <button variant="primary"
                   
                   type="submit" className='selfie-next-btn'
                   style={{   background: selectedImage ? 'linear-gradient(90deg, #9663BF 0%, #4B164C 100%)' : ' #E5E5E5',
                   color: selectedImage ? '#FFFFFF' : '#6C6C6C'
                    }}
                   
                   
                   >
                      Next
                   </button>
            </Container>
        </div>
    );
};
