import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import logo from "../assets/images/MTDlogo.png";
import responsivebg from "../assets/images/responsive-bg.png";
import './job-title.css';
import notApproved from "../assets/images/not-approved.png";
import { API_URL } from '../api';
import { useCookies } from '../hooks/useCookies';

export default function AccountNotApproved() {
    const { getCookie } = useCookies();
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/customer/users/latestrejection`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`
                },
            });

            const data = await response.json();
            setData(data);
            console.log(data);
        })()
    }, [])

    return (
        <div className='job-container'>
            <div className='job-bg'>
                <Image className='responsive-bg' src={responsivebg} alt="Background"></Image>
            </div>
            <Container className='job-main'>
                <Container className='job-content'>
                    <Container className='logo-progressbar10'>
                        <Container className='logo-arrow10'>
                            <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                    </Container>
                    <div style={{
                        
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                    }}>
                        <img src={notApproved} alt="not-approved" />
                        <p style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            lineHeight: "36px",
                            textAlign: "center",
                            marginTop : "-50px"
                        }}>We can't approve your profile just yet!</p>
                        
                        <p style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "20px",
                            textAlign: "center",
                            fontFamily: "Inter, sans-serif",
                            color: "#6c6c6c"
                        }}>
                            Sorry! Your profile approval request has been denied by the administrator. We are unable to approve your profile at this time as it lacks necessary information. Please update the required details for approval. An email has been sent to you regarding this.
                        </p>
                    </div>

                    {data && (
                            <p style={{
                                marginTop: "1em",
                                marginBottom: "1rem",
                                fontSize :"14px",
                                fontWeight : "600",
                                textAlign :"center",
                                border : "1px solid red",
                                padding : "12px",
                                borderRadius : "16px"
                            }}>
                                {data.reason}
                            </p>
                        )}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginTop: "auto",
                        marginBottom: "2rem",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}>
                        <p
                            style={{
                                fontFamily: "Inter, sans-serif",
                                color: "#4e1173"
                            }}
                        >Almost there!</p>
                        
                        <p style={{
                            marginTop: "1em"
                        }}>
                            Your profile is under review, but we need a bit more information.
                        </p>
                    </div>
                </Container>
            </Container>
        </div>
    )
}
