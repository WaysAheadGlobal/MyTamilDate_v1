import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import logo from "../assets/images/MTDlogo.png";
import logo2 from "../assets/images/logo2.png";
import responsivebg from "../assets/images/responsive-bg.png";
import './job-title.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from '../hooks/useCookies';
import { API_URL } from '../api';

export default function AccountPending() {
    const { getCookie } = useCookies();
    const { token } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}user/verify/${token}`);

                const result = await response.json();
                if (response.ok) {
                    navigate("/pending")
                } else {
                    console.error('Error fetching user data:', result.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
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
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                    }}>
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 31.9996C0 46.9561 12.1043 59.13 26.9913 59.13C32.487 59.13 37.7739 57.4604 42.2957 54.3996C43.5478 53.4952 43.8957 51.8257 42.9913 50.5039C42.087 49.2517 40.4174 48.9039 39.0957 49.8083C35.5478 52.243 31.3043 53.5648 26.9913 53.5648C15.1652 53.5648 5.56522 43.8952 5.56522 31.9996C5.56522 20.1039 15.1652 10.4344 26.9913 10.4344C38.5391 10.4344 48 19.6865 48.4174 31.2344L41.9478 24.6952C40.8348 23.5822 39.0956 23.5822 37.9826 24.6952C36.8696 25.8083 36.8696 27.5474 37.9826 28.6604L48.6261 39.3039C49.1826 39.8604 49.8783 40.1387 50.5739 40.1387C51.3391 40.1387 52.0348 39.8604 52.5217 39.3039L63.1652 28.5909C64.2783 27.4778 64.2783 25.7387 63.1652 24.6257C62.0522 23.5126 60.313 23.5126 59.2 24.6257L53.913 29.9822C52.9391 15.9996 41.2522 4.86914 26.9913 4.86914C12.1043 4.86914 0 17.0431 0 31.9996ZM27.1304 16.2083C28.6609 16.2083 29.913 17.4604 29.913 18.9909V31.9996C29.913 32.7648 29.5652 33.4604 29.0087 33.9474L23.0261 39.93C22.4696 40.4865 21.7739 40.7648 21.0087 40.7648C20.313 40.7648 19.5478 40.4865 19.0609 39.93C17.9478 38.817 18.0174 37.0778 19.1304 35.9648L24.3478 30.817V18.9909C24.3478 17.4604 25.6 16.2083 27.1304 16.2083Z" fill="black" />
                        </svg>

                        <p style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            lineHeight: "36px",
                            textAlign: "center",
                        }}>Pending Approval</p>
                        <p style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            lineHeight: "20px",
                            textAlign: "center",
                            fontFamily: "Inter, sans-serif",
                        }}>
                            We're reviewing your account and will notify you via e-mail at {email}. In the meantime, you can update your profile information.
                        </p>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginTop: "auto",
                        marginBottom: "2rem",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <p>Chat and help support</p>
                        <p style={{
                            background: "linear-gradient(180deg, #FC8C66 -4.17%, #F76A7B 110.42%)",
                            backgroundClip: "text",
                            color: "transparent",
                            fontWeight: "bold",
                        }}>hello@mytamildate.com</p>
                    </div>
                </Container>
            </Container>
        </div>
    );
};