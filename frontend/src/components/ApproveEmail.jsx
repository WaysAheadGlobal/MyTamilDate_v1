import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import { API_URL } from '../api';
import logo from "../assets/images/MTDlogo.png";
import logo2 from "../assets/images/logo2.png";
import responsivebg from "../assets/images/responsive-bg.png";
import { useCookies } from '../hooks/useCookies';
import './job-title.css';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../Context/AlertModalContext';

export default function ApproveEmail() {
    const { getCookie } = useCookies();
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();
    const alert = useAlert();

    React.useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${API_URL}customer/user/email`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('token')}`
                    }
                });
                const result = await response.json();
                if (response.ok) {
                    setEmail(result.email);
                } else {
                    console.error('Error fetching user data:', result.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        })()
    }, []);

    const resendMail = async () => {
        try {
            const response = await fetch(`${API_URL}/user/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`
                },
            });

            if (response.ok) {
                console.log('Mail sent successfully! Please check your email.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const checkVerification = async () => {
        try {
            const response = await fetch(`${API_URL}/user/check-email-verification`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`
                },
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Email verified successfully!');
                if (data.emailVerified) {
                    alert.setModal({
                        show: true,
                        title: "Email Verified",
                        message: "Your email has been verified successfully!",
                        buttonText: "Okay",
                        onButtonClick: () => {
                            navigate("/pending");  
                        }
                    })                  
                } else {
                    alert.setModal({
                        show: true,
                        title: "Email Verification",
                        message: "Your email has not been verified yet. Please check your email and verify your email address.",
                        buttonText: "Resend mail",
                        showCancelButton: true,
                        onButtonClick: () => {
                            resendMail();
                        }
                    })  
                }
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='job-container'>
            <div className='job-bg'>
                <Image className='responsive-bg' src={responsivebg} alt="Background"></Image>
            </div>
            <Container className='job-main'>
                <Container className='job-content'>
                    <Container className='logo-progressbar10'>
                        <Container className='logo-arrow10'>
                            <Image src={logo2} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                    </Container>
                    <div style={{
                        marginTop: "auto",
                        fontSize: "24px",
                        fontWeight: "500",
                        lineHeight: "36px",
                        textAlign: "center",

                    }}>
                        <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_778_7064)">
                                <path d="M62.3307 13.3359H15.6641C13.0119 13.3359 10.4684 14.3895 8.59299 16.2649C6.71763 18.1402 5.66406 20.6838 5.66406 23.3359V56.6693C5.66406 59.3214 6.71763 61.865 8.59299 63.7403C10.4684 65.6157 13.0119 66.6693 15.6641 66.6693H62.3307C64.9829 66.6693 67.5264 65.6157 69.4018 63.7403C71.2772 61.865 72.3307 59.3214 72.3307 56.6693V23.3359C72.3307 20.6838 71.2772 18.1402 69.4018 16.2649C67.5264 14.3895 64.9829 13.3359 62.3307 13.3359ZM60.0974 20.0026L38.9974 35.8359L17.8974 20.0026H60.0974ZM62.3307 60.0026H15.6641C14.78 60.0026 13.9322 59.6514 13.307 59.0263C12.6819 58.4012 12.3307 57.5533 12.3307 56.6693V24.1693L36.9974 42.6693C37.5744 43.102 38.2762 43.3359 38.9974 43.3359C39.7186 43.3359 40.4204 43.102 40.9974 42.6693L65.6641 24.1693V56.6693C65.6641 57.5533 65.3129 58.4012 64.6878 59.0263C64.0626 59.6514 63.2148 60.0026 62.3307 60.0026Z" fill="url(#paint0_linear_778_7064)" />
                                <path d="M82.4854 59.515C77.7988 54.8283 70.2016 54.8283 65.515 59.515C60.8283 64.2016 60.8283 71.7988 65.515 76.4854C70.2016 81.172 77.7988 81.172 82.4854 76.4854C87.172 71.7988 87.171 64.2016 82.4854 59.515ZM80.5309 65.0329L73.2389 72.3258C73.0589 72.5058 72.8148 72.6069 72.5602 72.6069C72.3057 72.6069 72.0615 72.5058 71.8815 72.3258L67.4695 67.9128C67.3803 67.8237 67.3096 67.7179 67.2614 67.6014C67.2132 67.485 67.1883 67.3602 67.1883 67.2341C67.1883 66.9796 67.2895 66.7354 67.4695 66.5554C67.6495 66.3754 67.8936 66.2743 68.1482 66.2743C68.4027 66.2743 68.6469 66.3754 68.8269 66.5554L72.5602 70.2888L79.1735 63.6745C79.2627 63.5854 79.3686 63.5147 79.4851 63.4665C79.6016 63.4183 79.7264 63.3935 79.8525 63.3935C79.9786 63.3936 80.1035 63.4185 80.2199 63.4668C80.3364 63.5151 80.4422 63.5858 80.5314 63.675C80.6205 63.7642 80.6912 63.8701 80.7394 63.9866C80.7876 64.1031 80.8124 64.228 80.8124 64.3541C80.8123 64.4801 80.7874 64.605 80.7391 64.7215C80.6909 64.8379 80.6201 64.9438 80.5309 65.0329Z" fill="url(#paint1_linear_778_7064)" />
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear_778_7064" x1="41.681" y1="11.1137" x2="41.681" y2="72.2248" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FC8C66" />
                                    <stop offset="1" stopColor="#F76A7B" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_778_7064" x1="74.9661" y1="55" x2="74.9661" y2="82.5004" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FC8C66" />
                                    <stop offset="1" stopColor="#F76A7B" />
                                </linearGradient>
                                <clipPath id="clip0_778_7064">
                                    <rect width="86" height="86" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <p style={{
                            fontSize: "24px",
                            fontWeight: "500",
                            lineHeight: "36px",
                            textAlign: "center",
                        }}>You are almost there</p>
                        <p style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            lineHeight: "20px",
                            textAlign: "center",
                            marginTop: "1rem",
                        }}>Almost there! Please verify your email address. We've sent a note to {email}.</p>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems :"center",
                        justifyContent : "center",
                        width: "100%",
                        gap: "5rem",
                        marginTop: "auto",
                        marginBottom: "2rem",
                    }}>
                        {/* <Button variant="primary" onClick={checkVerification} style={{
                            width: "100%",
                            marginTop: "1rem",
                            background: "linear-gradient(180deg, #FC8C66 -4.17%, #F76A7B 110.42%)",
                            border: "none",
                            borderRadius: "9999px",
                            padding: "0.75rem",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                        }}>
                            Submit
                        </Button> */}
                        <button   onClick={checkVerification} type="submit" className='global-next-btn'>
                                Next
                            </button>
                    </div>
                </Container>
            </Container>
        </div >
    );
};