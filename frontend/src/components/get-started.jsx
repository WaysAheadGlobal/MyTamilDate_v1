import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './get-started.css';
import { useNavigate } from 'react-router-dom';

import { Container, Image, Form, Button, } from 'react-bootstrap';

export const GetStarted = () => {



    
    const navigate = useNavigate();
    const goToBasicDetails = () => {
        navigate("/basicdetails");
      };
      return(


        <Button onClick={goToBasicDetails}>get started</Button>

      )





}