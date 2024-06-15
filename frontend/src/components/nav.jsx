
import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './nav.css';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Image } from 'react-bootstrap';
import logo2 from "../assets/images/logo2.png";
import heartlogo from '../assets/images/heart-logo.png';




export const NavBar = () => {



  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (event) => {
    const targetLink = event.target.getAttribute("data-target");
    setActiveLink(targetLink);
  };


  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary Navbar-container sticky">
      <Container>
        <Navbar.Brand href="/" ><Image src={logo2} className='nav-logo' style={{ height: '50px', width: '144px' }}></Image></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="me-auto">

          </div>
          <Nav className='nav-link-container'>
            {/* 
      <Nav.Link target="_blank"  as={Link} to="/SuccessPage" >Success Stories</Nav.Link>
      <Nav.Link  target="_blank" as={Link} to="/aboutus" >About Us</Nav.Link>
      <Nav.Link  target="_blank"  href="https://tamilculture.com/user/mytamildatecom">Blogs</Nav.Link>
      <Nav.Link  target="_blank" as={Link} to="/FaqPage" >FAQs</Nav.Link>
      <Nav.Link  target="_blank" as={Link} to="/GetInTouch" >Contact Us</Nav.Link> */}
            <Nav.Link as={Link} to="/SuccessPage" data-target="success" >Success Stories</Nav.Link>
            <Nav.Link as={Link} to="/aboutus" data-target="AboutUs" >About Us</Nav.Link>
            <Nav.Link href="https://tamilculture.com/user/mytamildatecom" data-target="Blogs" >Blogs</Nav.Link>
            <Nav.Link as={Link} to="/GetInTouch" data-target="ContactUs" >Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



  );
}