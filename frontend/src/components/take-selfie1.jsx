import React, { useState, useRef, useCallback,useEffect } from 'react';
import { Container, Image, Button, Row, Col, Modal } from 'react-bootstrap';

import Cropper from 'react-easy-crop';
import backarrow from "../assets/images/backarrow.jpg";
import logo from "../assets/images/MTDlogo.png";
import './take-selfie1.css';
import { useNavigate } from 'react-router-dom';
import responsivebg from "../assets/images/responsive-bg.png";
import pic from "../assets/images/pic.png";
import dont from "../assets/images/do.png";
import doo from "../assets/images/dont.png";
import addplus from "../assets/images/add-plus.png";

export const Selfie = () => {

    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState({ main: null, first: null, second: null });
    const [showModal, setShowModal] = useState(false);
    const [showCropModal, setShowCropModal] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [currentImageKey, setCurrentImageKey] = useState(null);
    const [showDosDontsModal, setShowDosDontsModal] = useState(false);
    const [selectedDosDonts, setSelectedDosDonts] = useState(null);

    const fileInputRefMain = useRef(null);
    const fileInputRefFirst = useRef(null);
    const fileInputRefSecond = useRef(null);

    const handleFileChange = (event, imageKey) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImageToCrop(imageURL);
            setCurrentImageKey(imageKey);
            setShowCropModal(true);
        }
    };

    const handleClick = (imageKey) => {
        if (imageKey === 'main') {
            fileInputRefMain.current.click();
        } else if (imageKey === 'first') {
            fileInputRefFirst.current.click();
        } else if (imageKey === 'second') {
            fileInputRefSecond.current.click();
        }
    };

    const handleNextClick = () => {
        if (!selectedImages.main || !selectedImages.first || !selectedImages.second) {
            setShowModal(true);
        } else {
            navigate("/located");
        }

        // navigate("/located");
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropSave = () => {
        console.log('Attempting to save cropped image:', imageToCrop, croppedAreaPixels);

        // Ensure croppedAreaPixels is not null before proceeding
        if (!croppedAreaPixels) {
            throw new Error('No cropped area to save');
        }

        getCroppedImg(imageToCrop, croppedAreaPixels)
            .then(croppedImage => {
                console.log('Cropped image URL:', croppedImage);

                setSelectedImages(prevState => ({
                    ...prevState,
                    [currentImageKey]: croppedImage
                }));

                setShowCropModal(false);

                console.log('Cropped image saved successfully');
            })
            .catch(error => {
                console.error('Error cropping image:', error);
                // Handle errors if any during cropping
            });
    };

    const handleCropCancel = () => {
        setShowCropModal(false);
        setImageToCrop(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
    };

    const getCroppedImg = (imageSrc, crop) => {
        const canvas = document.createElement('canvas');
        const image = new Image();
        const promise = new Promise((resolve, reject) => {
            image.onload = () => {
                const ctx = canvas.getContext('2d');
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;
                canvas.width = crop.width;
                canvas.height = crop.height;
                ctx.drawImage(
                    image,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    crop.width,
                    crop.height
                );

                canvas.toBlob(blob => {
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }
                    const fileUrl = URL.createObjectURL(blob);
                    resolve(fileUrl);
                }, 'image/jpeg');
            };
            image.src = imageSrc;
        });
        return promise;
    };

    const handleDosDontsClick = () => {
        // Here you can set initial dos and don'ts if needed
        setShowDosDontsModal(true);
    };

    const handleDosDontsClose = () => {
        setShowDosDontsModal(false);
    };
    useEffect(() => {
        // Automatically show the dos and don'ts modal when the component mounts
        setShowDosDontsModal(true);
    }, []);

    return (
        <div className='selfie-container'>
            <div className='selfie-bg'>
                <Image className='responsive-bg' src={responsivebg}></Image>
            </div>
            <Container className='selfie-main'>
                <Container className='logo-progressbar6'>
                    <Container className='logo-arrow6'>
                        <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
                        <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                    </Container>
                    <div className='track-btn6'>
                        <div></div>
                    </div>
                </Container>
                <Container className='selfie-text'>
                    <Image className='selfie-icon' src={pic}></Image>
                    <p className='pic-heading'>Add your photos</p>
                </Container>
                <Container>
                    <p className='pic-text'>
                        Use pics of yourself which clearly show your face, your hobbies & more! Check out more tips here.<br />
                        <a href='#' onClick={handleDosDontsClick}>Click here</a>
                    </p>
                </Container>
                <Container className='selfie-adding'>
                    <Row className='selfie-row' onClick={() => handleClick('main')}>
                        <Col md={12} className='selfie-box1'>
                            {!selectedImages.main && (
                                <>
                                    <Image className='selfie-icon' src={addplus}></Image>
                                    <span>Add main photo</span>
                                </>
                            )}
                            {selectedImages.main && <Image src={selectedImages.main} className="user-picture1" alt="Selected" fluid />}
                            <input
                                type="file"
                                ref={fileInputRefMain}
                                onChange={(e) => handleFileChange(e, 'main')}
                                style={{ display: 'none' }}
                            />
                        </Col>
                    </Row>
                    <Row className='selfie-row2'>
                        <Col md={6} className='selfie-box2' onClick={() => handleClick('first')}>
                            {!selectedImages.first && (
                                <>
                                    <Image className='selfie-icon' src={addplus} style={{marginTop:'5px'}}></Image>
                                    <span>Add photo</span>
                                </>
                            )}
                            {selectedImages.first && <Image src={selectedImages.first} className="user-picture2" alt="Selected" fluid />}
                            <input
                                type="file"
                                ref={fileInputRefFirst}
                                onChange={(e) => handleFileChange(e, 'first')}
                                style={{ display: 'none' }}
                            />
                        </Col>
                        <Col md={6} className='selfie-box2' onClick={() => handleClick('second')}>
                            {!selectedImages.second && (
                                <>
                                    <Image className='selfie-icon' src={addplus} style={{marginTop:'5px'}}></Image>
                                    <span>Add photo</span>
                                </>
                            )}
                            {selectedImages.second && <Image src={selectedImages.second} className="user-picture2" alt="Selected" fluid />}
                            <input
                                type="file"
                                ref={fileInputRefSecond}
                                onChange={(e) => handleFileChange(e, 'second')}
                                style={{ display: 'none' }}
                            />
                        </Col>
                    </Row>
                </Container>
                <Button
                    variant="primary"
                    type="button"
                    className='selfie-next-btn'
                    onClick={handleNextClick}
                    style={{
                        background: (selectedImages.main || selectedImages.first || selectedImages.second) ? 'linear-gradient(90deg, #9663BF 0%, #4B164C 100%)' : ' #E5E5E5',
                        color: (selectedImages.main || selectedImages.first || selectedImages.second) ? '#FFFFFF' : '#6C6C6C'
                    }}
                >
                    Next
                </Button>
                <Modal centered className="selfie-modal" show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Body className='selfie-modal-body'>
                        3 photos required
                        <Button variant="secondary" className='selfie-modal-btn' onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Body>
                </Modal>

                <Modal centered className="crop-modal" show={showCropModal} onHide={handleCropCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crop your photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='crop-modal-body'>
                        {imageToCrop && (
                            <Cropper
                                image={imageToCrop}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 3} // Change aspect ratio as needed
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        )}
                    </Modal.Body>
                    <Modal.Footer className='crop-modal-footer'>
                        <button variant="secondary" className='crop-cancel-btn' onClick={handleCropCancel}>
                            Cancel
                        </button>
                        <button variant="secondary" className='crop-save-btn' onClick={handleCropSave}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal centered className="dos-donts-modal" show={showDosDontsModal} onHide={handleDosDontsClose}>
                    <Modal.Header className='do-donts-head' closeButton>
                   
                    </Modal.Header>
                    <Modal.Body className='dos-donts-modal-body'>
                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                            <div style={{ alignItems:'center',display: 'flex', flexDirection: 'column' }}>
                                <h5>Do’s</h5>
                                <Image  style={{ marginBottom:'-20px',zIndex:'10' }}src={doo}></Image>
                                <ul className='dos'>
                                    <li><p><span>Light it up</span>: Use good lighting, natural light is best. Avoid shadows.</p></li>
                                    <li><p><span>Keep it real</span>: Use authentic pics of yourself which clearly show your face.</p></li>
                                    <li><p><span>Show off your personality</span>: Love traveling? Have a special hobby? Don't hesitate to show it off through your pics.</p></li>
                                </ul>
                            </div>
                            <div style={{ alignItems:'center',display: 'flex', flexDirection: 'column' }}>
                                <h5>Don’t</h5>
                                <Image  style={{ marginBottom:'-20px',zIndex:'10' }}src={dont}></Image>
                                <ul className='dos'>
                                    <li><p><span>Hide your face</span>: Ensure your face is clearly visible. Avoid sunglasses or hats that hide your face.</p></li>
                                    <li><p><span>Fake it</span> Avoid heavy filters or overly edited photos. Stay authentic to how you look in real life. You're fabulous as you are!</p></li>
                                    <li><p><span>Add too many pics with others</span>: Group photos can be confusing as members might not know who you are. Solo pics are ideal!</p></li>
                                </ul>
                            </div>
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleDosDontsClose}>
                            Close
                        </Button>
                    </Modal.Footer> */}
                </Modal>
            </Container>
        </div>
    );
};




