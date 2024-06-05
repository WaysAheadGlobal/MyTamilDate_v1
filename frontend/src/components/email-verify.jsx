import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './email-verify.css';
import email from "../assets/images/Email-check.jpg";

import { Container, Image, Form, Button,} from 'react-bootstrap'


export const EmailVerify=()=>
    {
        return(

<div className='email-verify-container'>
         <div className='email-verify-bg'></div>
         <Container className='email-verify-main'>
         <Image src={email} style={{width:'90px',height:'90px'}}></Image>
         <p>We've sent a verification link to your email. Click the link in the email to access your myTamilDate account</p>
         <Button variant="primary" type="submit" className='email-verify-btn'> Continue</Button>
         </Container>


</div>

















        );
    }