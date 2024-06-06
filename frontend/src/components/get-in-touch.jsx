import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './get-in-touch.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Image, Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import getbg from '../assets/images/getintouch-bg.png';
import verify from '../assets/images/verified.png';
import Modal from 'react-bootstrap/Modal';
import { SlArrowDown } from "react-icons/sl";
import { NavBar } from './nav';


function SuccessfullModal(props) {
    return (
  
      <Modal
  
        {...props}
        size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          backgroundColor: "#000000B2"
        }}
  
      >
  
  
  
        <Modal.Body className='getintouch-modal'>
  
         
  
          <div className=' getetintouch-model-main'>
            <div className='getintouch-close'>
              <button type="button" className="btn-close" onClick={props.onHide} style={{ color: '#FFFFFF', padding: '10px' }} >
              </button>
            </div>
            <div className='getintouch-model-content'>
              <Image className='verify-img' src={verify}></Image>
              <span >"Thanks! We've received your submission and will be in touch."</span>
            </div>
          </div>
  
  
        </Modal.Body>
  
      </Modal>
  
    );
  }









export const GetInTouch = () => {

    const [modalShow, setModalShow] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        areaOfConcern: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // You can add form submission logic here (e.g., API call)
    };






    return (

        <>
            <NavBar />
            <div className='getintouch-main'>
                <p>Get in Touch</p>
                <Container className='getintouch-content' >


                    <Container className='getintouch-form-container'>
                        <span>Let’s connect</span>
                        <Form onSubmit={handleSubmit} className='getintouch-form'>
                            <Form.Group controlId="formName" className='getintouch-group'>
                                <Form.Control className='getintouch-input'
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail " className='getintouch-group'>
                                <Form.Control className='getintouch-input'
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formPhone" className='getintouch-group'>
                                <Form.Control className='getintouch-input'
                                    type="text"
                                    placeholder="Phone Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formAreaOfConcern" className='getintouch-group with-icon'>
                                <Form.Control className='getintouch-input'
                                    // as="select"
                                    name="areaOfConcern"
                                    value={formData.areaOfConcern}
                                    onChange={handleChange}
                                    placeholder="Area of Concern"

                                >
{/* 
                                    <option value="">Select Area of Concern</option>
                                    <option value="support">Support</option>
                                    <option value="sales">Sales</option>
                                    <option value="general">General Inquiry</option> */}
                                </Form.Control>
                                <SlArrowDown className="arrow-icon" />
                            </Form.Group>

                            <Form.Group controlId="formMessage" className='getintouch-group'>
                                <Form.Control className='getintouch-message'
                                    as="textarea"
                                    placeholder="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button variant="primary" className='getintouch-btn'  onClick={() => setModalShow(true)}   type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Container>

                    <Container className='get-bg-container'>
                    <Image className='get-bg' src={getbg}></Image>
                    </Container>








                </Container>

            </div>



            <SuccessfullModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

        </>







    );
}