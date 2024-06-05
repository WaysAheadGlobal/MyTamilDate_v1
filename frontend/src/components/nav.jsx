
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './nav.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Image } from 'react-bootstrap';
import logo2 from "../assets/images/logo2.png";
import heartlogo from '../assets/images/heart-logo.png';




export const NavBar = () => {

return(






<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary Navbar-container">
<Container>
  <Navbar.Brand href="#home" ><Image src={heartlogo} style={{ height: '70px', width: '70px' }}></Image></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">

    </Nav>
    <Nav className='nav-link-container'>

      <Nav.Link  target="_blank" href="">Success Stories</Nav.Link>
      <Nav.Link target="_blank" href="#deets">About Us</Nav.Link>
      <Nav.Link  target="_blank"href="https://tamilculture.com/user/mytamildatecom
">Blogs</Nav.Link>
      <Nav.Link target="_blank" href="#deets">FAQs</Nav.Link>

    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>



);}