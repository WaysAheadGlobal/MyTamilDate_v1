import { useGoogleLogin } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import backarrow from "../../assets/images/backarrow.jpg";
import google from "../../assets/images/google 1.jpg";
import logo2 from "../../assets/images/logo2.png";
import responsivebg from "../../assets/images/responsive-bg.png";
import './sign-in-options.css';
import { API_URL } from '../../api';
import { useCookies } from '../../hooks/useCookies';


export const SignInOptions = () => {

    const navigate = useNavigate();
    const cookies = useCookies();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    "Authorization": `Bearer ${tokenResponse.access_token}`
                }
            });
            const data = await response.json();
            const userEmail = data.email;

            const res = await fetch(`${API_URL}/user/login/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    usingGoogle: true
                })
            });

            const resData = await res.json();
            
            if (res.ok) {
                cookies.setCookie('token', resData.token, 30);
                cookies.setCookie('userId', resData.Result[0].user_id);                
                navigate('/user/home');
            }
        },
        onError: (error) => {
            console.log(error);
        },

    });

    const goToSignIn = () => {
        navigate("/signIn");
    };


    const goToSignInEmail = () => {
        navigate("/signinemail");
    };

    return (
        <div className='signin-options-container'>
            <div className='signin-options-bg'>
                <Image className='responsive-bg' src={responsivebg}></Image>
            </div>
            <Container className='signin-options-main'>
                <Container className='signin-options-content'>

                    <Container className='logo-progressbar1'>

                        <Container className='logo-arrow1'>
                            <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
                            <Image src={logo2} alt="Logo" className='logo1' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                        {/* <div className='track-btn1'>
                            <div></div>
                        </div> */}
                    </Container>

                    <Container className='signin-options-text'>
                        {/* <Image src={blank} /> */}
                        <span>Hi! It's good to see you again.</span>
                        <div className='signin-option-btn'>
                            <Button className='opt1' onClick={goToSignIn}>Login with Phone number</Button>
                            <Button className='opt2' onClick={goToSignInEmail}>Login with email</Button>
                        </div>
                    </Container>
                    <Container className='signin-options-details'>


                        <Container className='sign-in-or-option'>
                            <Container className='or-line'>
                                <div className='line'></div>
                                <span>or</span>
                                <div className='line'></div>
                            </Container>
                            <button
                                className='google-option'
                                style={{
                                    position: 'relative',
                                    backgroundColor: 'white',
                                }}
                                onClick={login}
                            >
                                <Image src={google} alt="Google" />Login using Google
                            </button>
                            <p>New here? Create an account? <a href='./signup' className='signup-signin'> Sign Up</a></p>
                            {/* <p>By continuing you accept our <br /><a className="signup-links" href="/PrivacyPolicy">Privacy Policy</a> and <a className="signup-links" target="_blank" href='/Tnc'>Terms of Use</a></p> */}
                        </Container>
                    </Container>

                </Container>
            </Container>








        </div >
    );
};
