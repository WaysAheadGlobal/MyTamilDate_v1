import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./video2.css";
import { Container, Image, Form, Button, Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import vd1 from '../assets/images/vd1.png'
import vd2 from '../assets/images/vd2.png'
import vd3 from '../assets/images/vd3.png'
import CloseIcon from '@mui/icons-material/Close';

export const Video2 = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [videoURL, setVideoURL] = React.useState("https://www.instagram.com/reel/CbiMcvWDt_V/embed/");

    return (

        <Container className=' video2-main'>
            <VerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                videoURL={videoURL}
            />
            <p>Dating While Tamil? </p>
            <span style={{ textAlign: "center" }}>Check out the MTD community's tips & insights! </span>

            <Container className='video2-content'>
                <a onClick={() => {
                    setModalShow(true);
                    setVideoURL("https://www.instagram.com/reel/CbiMcvWDt_V/embed/");
                }} className='vid2' style={{ cursor: "pointer" }}>
                    <img className='video2-img' src={vd1}>
                    </img>
                    <div className='play-icon'></div>

                </a>
                <a onClick={() => {
                    setModalShow(true);
                    setVideoURL("https://www.instagram.com/reel/C6EPQwmvOPp/embed/");
                }} className='vid2' style={{ cursor: "pointer" }}>
                    <img className='video2-img' src={vd2} >

                    </img>
                    <div className='play-icon'></div>

                </a>
                <a onClick={() => {
                    setModalShow(true);
                    setVideoURL("https://www.instagram.com/reel/CsT1_nlB5VR/embed/");
                }} className='vid2' style={{ cursor: "pointer" }}>
                    <img className='video2-img' src={vd3}>
                    </img>
                    <div className='play-icon'></div>
                </a>
            </Container>
        </Container>
    );
}

function VerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Button onClick={props.onHide} style={{
                marginLeft: "auto",
                position: "relative",
                top: "1rem",
                right: "1rem",
                cursor: "pointer"
            }}>
                <CloseIcon
                    className='close-icon'
                ></CloseIcon>
            </Button>
            <Modal.Body>
                <iframe
                    style={{
                        height: "37rem",
                        width: "100%",
                        objectFit: "cover"
                    }}
                    title='reel'
                    src={props.videoURL}
                    frameborder="0"
                    allowfullscreen
                ></iframe>
            </Modal.Body>
        </Modal>
    );
}